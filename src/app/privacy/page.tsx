import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
export const metadata = { title: "Privacy Policy | AfyaDesk" };
export default function PrivacyPage() {
  return (
    <div>
      <BreadcrumbHero eyebrow="Legal" title="Privacy Policy" description="How we collect, use and protect your information." breadcrumb={[{ label: "Privacy", href: "/privacy" }]} compact />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-sm text-[#8A9BB0]">Last updated: September 2026</p>
        <div className="mt-6 prose prose-sm max-w-none text-[#172033] leading-7">
          <p>AfyaDesk (“we”, “us”) respects your privacy. This policy describes how we collect, use and protect information.</p>
          <h3>Information we collect</h3>
          <ul>
            <li>Contact and inquiry data you provide (name, email, phone, organization, message).</li>
            <li>Application data for careers.</li>
            <li>Usage data via cookies and analytics.</li>
          </ul>
          <h3>How we use it</h3>
          <ul>
            <li>To respond to inquiries, provide services and manage applications.</li>
            <li>To improve our website and communications.</li>
          </ul>
          <h3>Legal basis & retention</h3>
          <p>We process data on the basis of consent, contract or legitimate interest and retain it only as long as necessary.</p>
          <h3>Kenya Data Protection Act</h3>
          <p>We design workflows around applicable Kenyan data-protection requirements and respect data subject rights. Contact us to exercise rights of access, correction or deletion.</p>
          <h3>Contact</h3>
          <p>Email: hello@afyadesk.co.ke</p>
        </div>
      </div>
    </div>
  );
}
