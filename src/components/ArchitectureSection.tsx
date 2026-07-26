const osItems = [
  { name: "Windows", symbol: "⊞" },
  { name: "macOS", symbol: "" },
  { name: "Linux", symbol: "🐧" },
  { name: "Android", symbol: "🤖" },
  { name: "iOS", symbol: "" },
];

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="relative px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-5xl">
          Above Every OS.
          <br />
          <span className="text-blue-400">Connecting Everything.</span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-lg leading-relaxed text-gray-400">
          For 50 years, operating systems managed computers. Nexus One manages
          intelligence — sitting above Windows, macOS, Linux, Android, iOS,
          cloud, IoT, robots, and every connected device. It doesn&apos;t replace
          them. It connects them all.
        </p>

        {/* Architecture diagram */}
        <div className="relative mx-auto max-w-2xl">
          {/* NEXUS ONE layer */}
          <div className="relative mx-auto mb-4 w-fit rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-600/20 to-blue-900/10 px-10 py-5 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
            <span className="text-xl font-bold tracking-tight text-white">
              NEXUS ONE<span className="align-top text-[0.5em] text-blue-400">™</span>
            </span>
            <p className="mt-1 text-xs text-blue-300/70">
              The Universal Intelligence Layer
            </p>
          </div>

          {/* Connector */}
          <div className="mx-auto mb-4 flex w-px flex-col items-center gap-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-2 w-0.5 bg-blue-500/40"
                style={{ opacity: 1 - i * 0.12 }}
              />
            ))}
          </div>

          {/* OS layer */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {osItems.map((os) => (
              <div
                key={os.name}
                className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.06]"
              >
                <span className="text-lg">{os.symbol}</span>
                {os.name}
              </div>
            ))}
          </div>

          {/* Bottom label */}
          <p className="mt-6 text-xs font-medium tracking-widest text-gray-600 uppercase">
            Operating Systems &amp; Devices
          </p>
        </div>
      </div>
    </section>
  );
}
