import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
export const metadata = { title: "Cookie Policy | AfyaDesk" };
export default function CookiesPage() {
  return (
    <div>
      <BreadcrumbHero eyebrow="Legal" title="Cookie Policy" description="How we use cookies on AfyaDesk." breadcrumb={[{ label: "Cookies", href: "/cookies" }]} compact />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="prose prose-sm max-w-none text-[#172033] leading-7">
          <p>We use cookies to improve site functionality and analytics.</p>
          <h3>Types</h3>
          <ul>
            <li>Essential — required for site operation</li>
            <li>Analytics — help us understand usage</li>
            <li>Preferences — remember settings</li>
          </ul>
          <p>You can control cookies via your browser settings. Blocking essential cookies may affect functionality.</p>
        </div>
      </div>
    </div>
  );
}
