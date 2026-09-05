import { Hero } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem";
import { SolutionSection } from "@/components/sections/solution";
import { ServicesSection } from "@/components/sections/services";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyAfyaDesk } from "@/components/sections/why-afyadesk";
import { HomeCourseSection } from "@/components/sections/home-course";
import { HomeCareersSection } from "@/components/sections/home-careers";
import { SecuritySection } from "@/components/sections/security";
import { KenyaSection } from "@/components/sections/kenya-intl";
import { PricingSection } from "@/components/sections/pricing";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq";
import { CTASection } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeCareersSection />
      <HomeCourseSection />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <HowItWorks />
      <WhyAfyaDesk />
      <SecuritySection />
      <KenyaSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
