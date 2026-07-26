export function NavBar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-bold tracking-tight text-white">
          NEXUS ONE<span className="align-top text-[0.5em] text-blue-500">™</span>
        </a>
        <a
          href="#waitlist"
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          Get Early Access
        </a>
      </div>
    </nav>
  );
}
