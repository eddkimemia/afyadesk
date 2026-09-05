import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";

export const metadata = { title: "Contact — Book a Free Consultation" };

export default function ContactPage() {
  return (
    <div>
      <BreadcrumbHero
        eyebrow="Contact"
        title="Let’s build your healthcare support team"
        description="Tell us about your practice and workload. We’ll map your workflow and recommend the right support model. Kenya | Serving Healthcare Organizations Globally"
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 rounded-[24px] bg-white border border-[#E6EEF6] p-6 md:p-7 shadow-sm">
          <h2 className="font-bold text-[#0B1F33]">Request a Consultation</h2>
          <p className="text-sm text-[#5B6B80]">Avg response within 1 business day.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-[20px] bg-[#F8FAFC] border border-[#E6EEF6] p-6">
            <h3 className="font-semibold text-[#0B1F33]">Contact</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-[#0F8B8D] shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1F33]">Email</div>
                  <div className="text-[#5B6B80]">hello@afyadesk.co.ke</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-[#0F8B8D] shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1F33]">Phone / WhatsApp</div>
                  <div className="text-[#5B6B80]">+254 700 000 000</div>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-[#0F8B8D] shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1F33]">Location</div>
                  <div className="text-[#5B6B80]">Nairobi, Kenya • Remote-first, serving globally</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-[#0F8B8D] shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1F33]">Hours</div>
                  <div className="text-[#5B6B80]">Mon–Fri 08:00–18:00 EAT • Flexible coverage by arrangement</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] bg-[#0B1F33] text-white p-6">
            <h3 className="font-bold">What happens next?</h3>
            <ol className="mt-3 space-y-2 text-sm text-white/70 list-decimal list-inside">
              <li>We review your inquiry within 1 business day.</li>
              <li>Free 30-min consultation to map workflow & needs.</li>
              <li>We match talent in 5–7 business days.</li>
              <li>Onboard and start — scale anytime.</li>
            </ol>
          </div>

          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
            <span className="font-semibold">Scope:</span> Administrative & support services only. No diagnosis, prescribing or emergency care.
          </div>
        </div>
      </div>
    </div>
  );
}
