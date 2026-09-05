import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
export const metadata = { title: "Terms of Service | AfyaDesk" };
export default function TermsPage() {
  return (
    <div>
      <BreadcrumbHero eyebrow="Legal" title="Terms of Service" description="Terms for using AfyaDesk website and services." breadcrumb={[{ label: "Terms", href: "/terms" }]} compact />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="prose prose-sm max-w-none text-[#172033] leading-7">
          <p>By using AfyaDesk website and services you agree to these terms.</p>
          <h3>Services</h3>
          <p>AfyaDesk provides non-clinical administrative support. We do not provide medical diagnosis, prescribing, clinical decision-making or emergency care.</p>
          <h3>Client responsibilities</h3>
          <p>Clients remain responsible for clinical oversight, compliance and instructions given to support staff.</p>
          <h3>Acceptable use</h3>
          <p>Do not misuse the site or attempt to access data unlawfully.</p>
          <h3>Limitation of liability</h3>
          <p>Services are provided on an “as is” basis to the extent permitted by law.</p>
          <h3>Contact</h3>
          <p>hello@afyadesk.co.ke</p>
        </div>
      </div>
    </div>
  );
}
