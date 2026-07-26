export function VisionQuote() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      {/* Subtle glow behind quote */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-[600px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-8 text-6xl font-serif text-blue-500/30">&ldquo;</div>
        <blockquote className="text-2xl font-medium leading-relaxed tracking-tight text-white sm:text-3xl lg:text-4xl">
          What TCP/IP became for the internet,
          <br />
          <span className="text-blue-400">
            Nexus One will become for intelligence.
          </span>
        </blockquote>
        <div className="mt-8 h-px w-16 bg-blue-500/30 mx-auto" />
      </div>
    </section>
  );
}
