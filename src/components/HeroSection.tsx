export function HeroSection() {
  const scrollToArchitecture = () => {
    document
      .getElementById("architecture")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-6 pt-20 text-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="mb-6 text-sm font-medium tracking-widest text-blue-400 uppercase">
          The Universal Intelligence Platform
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          One Intelligence.
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Every Device. Every Business.
          </span>
          <br />
          Every Person. Every AI.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
          The Universal Intelligence Platform™ — an intelligence layer above every
          operating system, connecting them all into one ecosystem.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#waitlist"
            className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            Get Early Access
          </a>
          <button
            onClick={scrollToArchitecture}
            className="rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 h-32 w-full bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  );
}
