import NavBar from "./NavBar";
import LandingSection from "./LandingSection";
import FeaturesSection from "./FeaturesSection";
import ReviewsSection from "./ReviewsSection";
import NumbersSection from "./NumbersSection";
import FooterSection from "./FooterSection";

export default function CombinedHome() {
  return (
    <main>
      <NavBar />
      <LandingSection />
      <FeaturesSection />
      <ReviewsSection />
      <NumbersSection />
      <FooterSection />
    </main>
  );
}
