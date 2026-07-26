import { createFileRoute } from "@tanstack/react-router";
import { ArchitectureSection } from "~/components/ArchitectureSection";
import { Footer } from "~/components/Footer";
import { HeroSection } from "~/components/HeroSection";
import { NavBar } from "~/components/NavBar";
import { PlatformPillars } from "~/components/PlatformPillars";
import { VisionQuote } from "~/components/VisionQuote";
import { WaitlistSection } from "~/components/WaitlistSection";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-dvh bg-[#050505] text-white">
      <NavBar />
      <HeroSection />
      <ArchitectureSection />
      <PlatformPillars />
      <VisionQuote />
      <WaitlistSection />
      <Footer />
    </div>
  );
}
