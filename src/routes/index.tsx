import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArchitectureSection } from "~/components/ArchitectureSection";
import { Footer } from "~/components/Footer";
import { HeroSection } from "~/components/HeroSection";
import { ImagineSection } from "~/components/ImagineSection";
import { NavBar } from "~/components/NavBar";
import { PlatformPillars } from "~/components/PlatformPillars";
import { VisionQuote } from "~/components/VisionQuote";
import { WaitlistSection } from "~/components/WaitlistSection";
import { trackPageView } from "~/server/analytics";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="min-h-dvh bg-[#050505] text-white">
      <NavBar />
      <HeroSection />
      <ArchitectureSection />
      <PlatformPillars />
      <ImagineSection />
      <VisionQuote />
      <WaitlistSection />
      <Footer />
    </div>
  );
}
