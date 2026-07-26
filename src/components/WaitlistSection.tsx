import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const WAITLIST_PATH = "/home/team/shared/waitlist.json";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMAIL_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
          <tr>
            <td style="padding:40px 32px;border:1px solid rgba(255,255,255,0.08);border-radius:16px;background-color:rgba(255,255,255,0.02);">
              <p style="margin:0 0 8px;font-size:13px;font-weight:500;letter-spacing:3px;color:#60a5fa;text-transform:uppercase;">Nexus One</p>
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:700;color:#ffffff;line-height:1.3;">You're on the list.</h1>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#9ca3af;">Welcome to the future of intelligence. You're now on the Nexus One waitlist — we'll keep you updated as we build the Universal Intelligence Platform.</p>
              <hr style="margin:0 0 24px;border:none;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:14px;color:#6b7280;">— The Nexus One Team</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#4b5563;">NEXUS ONE™ — The Universal Intelligence Platform</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const getWaitlistCount = createServerFn({ method: "GET" }).handler(async () => {
  const file = Bun.file(WAITLIST_PATH);
  const exists = await file.exists();
  if (!exists) return { count: 0 };
  const text = await file.text();
  const lines = text.trim().split("\n").filter((l) => l.trim().length > 0);
  return { count: lines.length };
});

const submitEmail = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (
      typeof input === "object" &&
      input !== null &&
      "email" in input &&
      typeof (input as { email: unknown }).email === "string"
    ) {
      const email = (input as { email: string }).email.trim();
      if (!email || !EMAIL_RE.test(email)) {
        throw new Error("Please enter a valid email address.");
      }
      return { email };
    }
    throw new Error("Please enter a valid email address.");
  })
  .handler(async ({ data }) => {
    const { email } = data;
    const timestamp = new Date().toISOString();

    const file = Bun.file(WAITLIST_PATH);
    const exists = await file.exists();

    // Build the JSONL row
    const row = JSON.stringify({ email, timestamp }) + "\n";

    if (exists) {
      // Append to existing file
      const existing = await file.text();
      await Bun.write(WAITLIST_PATH, existing + row);
    } else {
      // Create new file
      await Bun.write(WAITLIST_PATH, row);
    }

    // Send confirmation email via Resend (non-blocking — don't fail on error)
    try {
      await resend.emails.send({
        from: "Nexus One <onboarding@resend.dev>",
        to: email,
        subject: "You're on the Nexus One waitlist",
        html: EMAIL_HTML,
      });
    } catch (emailErr) {
      // Email send failed — log but don't surface to the user.
      // The email is already stored in waitlist.json.
      console.error("Resend send failed:", emailErr);
    }

    return { success: true } as const;
  });

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    getWaitlistCount().then((r) => setCount(r.count)).catch(() => setCount(null));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);
    try {
      await submitEmail({ data: { email: email.trim() } });
      setCount((c) => (c !== null ? c + 1 : 1));
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative px-6 py-24 sm:py-32">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Be First.
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-400">
          {count !== null && count > 0
            ? `Join ${count} others on the waitlist.`
            : "Be among the first to get access."}
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 px-8 py-6">
            <p className="text-lg font-semibold text-green-400">
              You&apos;re on the list.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;ll be in touch when Nexus One is ready for you.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
            >
              Add another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-3.5 text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-50"
            >
              {loading ? "Joining..." : "Get Early Access"}
            </button>
          </form>
        )}

        {!submitted && (
          <p className="mt-3 text-xs text-gray-500">
            No spam. One update when we launch.
          </p>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-400">{error}</p>
        )}
      </div>
    </section>
  );
}
