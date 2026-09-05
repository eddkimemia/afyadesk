import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0B1F33] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="AfyaDesk"
                width={340}
                height={93}
                className="h-[50px] md:h-[64px] w-auto object-contain rounded-xl bg-white p-2"
              />
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/70 max-w-sm">
              Kenya&apos;s healthcare virtual support platform — connecting hospitals, clinics and health startups
              with trained remote medical support professionals.
            </p>
            <p className="mt-4 text-xs font-semibold tracking-wide text-white/60">
              Kenya | Serving Healthcare Organizations Globally
            </p>
            <div className="mt-6 rounded-2xl bg-white/10 border border-white/10 p-4 max-w-sm">
              <p className="text-xs leading-5 text-white/70">
                <span className="font-semibold text-white">Disclaimer:</span> AfyaDesk provides administrative
                and support services only. We do not provide diagnosis, prescribing, clinical decision-making or
                emergency medical care. All clinical responsibilities remain with licensed healthcare professionals.
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-9 w-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white hover:text-[#0B1F33] text-white transition">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white hover:text-[#0B1F33] text-white transition">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white hover:text-[#0B1F33] text-white transition">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="h-9 w-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white hover:text-[#0B1F33] text-white transition">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden><path d="M18.9 3H21.7L14.6 11.1L22.9 21H16.9L12.2 14.9L6.8 21H4L11.9 12.3L3.8 3H9.9L14.1 8.6L18.9 3Z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Navigate</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {[
                ["Home", "/"],
                ["Services", "/services"],
                ["Industries", "/industries"],
                ["About", "/about"],
                ["Careers", "/careers"],
                ["Apply", "/careers/apply"],
                ["Course", "/course"],
                ["Blog", "/blog"],
                ["Contact", "/contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="hover:text-white">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {[
                "Medical Virtual Assistants",
                "Medical Reception",
                "Medical Transcription",
                "Medical Billing Support",
                "Patient Support",
                "Telehealth Support",
              ].map((s) => (
                <li key={s}>
                  <Link href="/services" className="hover:text-white">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {[
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
                ["Data Protection", "/data-protection"],
                ["Cookie Policy", "/cookies"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="hover:text-white">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-xs text-white/60">Need support?</p>
              <a href="mailto:hello@afyadesk.co.ke" className="text-sm font-semibold hover:text-white">
                hello@afyadesk.co.ke
              </a>
              <a href="tel:+254753728292" className="text-sm font-semibold hover:text-white">
                +254 753 728 292
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 justify-between text-xs text-white/50">
          <span>© {new Date().getFullYear()} AfyaDesk. All rights reserved. Made for healthcare in Kenya.</span>
          <span>Medical administrative support • Non-clinical services only</span>
        </div>
      </div>
    </footer>
  );
}
