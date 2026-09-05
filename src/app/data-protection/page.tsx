import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
export const metadata = { title: "Data Protection | AfyaDesk" };
export default function DataProtectionPage() {
  return (
    <div>
      <BreadcrumbHero eyebrow="Security" title="Data Protection" description="Healthcare data deserves serious protection." breadcrumb={[{ label: "Data Protection", href: "/data-protection" }]} compact />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="prose prose-sm max-w-none text-[#172033] leading-7">
          <p>We design our workflows around applicable Kenyan data-protection requirements and client security policies.</p>
          <h3>Our practices</h3>
          <ul>
            <li>Confidentiality agreements and ethics training for staff</li>
            <li>Least-privilege, role-based access</li>
            <li>Secure communication channels</li>
            <li>Data handling, retention and secure disposal procedures</li>
            <li>Client-specific security requirements respected</li>
          </ul>
          <p className="text-sm text-[#5B6B80]">We do not make unsupported claims such as “HIPAA certified” or “GDPR certified.” We operate with disciplined procedures and align with your framework.</p>
        </div>
      </div>
    </div>
  );
}
