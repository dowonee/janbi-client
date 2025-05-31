import LandingHeader from "../components/intro/LandingHeader";
import ActionButtons from "../components/intro/ActionButtons";
import FeatureSection from "../components/intro/FeatureSection";

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main>
        <LandingHeader />
        <ActionButtons />
        <FeatureSection />
      </main>
    </div>
  );
}
