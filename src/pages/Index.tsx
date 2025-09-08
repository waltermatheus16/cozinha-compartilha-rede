import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoShowcase } from "@/components/sections/LogoShowcase";
import { AboutSection } from "@/components/sections/AboutSection";
import ComseaPosts from "@/components/sections/ComseaPosts";
import { KitchensPreview } from "@/components/sections/KitchensPreview";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <LogoShowcase />
      <AboutSection />
      <ComseaPosts />
      <KitchensPreview />
      <Footer />
    </div>
  );
};

export default Index;
