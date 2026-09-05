"use client";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254753728292?text=Hello%20AfyaDesk%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20medical%20virtual%20assistants"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
        <path d="M19.05 4.94A9.91 9.91 0 0 0 12.04 2C6.58 2 2.14 6.45 2.14 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.26-1.38a9.86 9.86 0 0 0 4.77 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.0Zm-7.01 15.24h-.01a8.17 8.17 0 0 1-4.17-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.43c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.26 8.28Zm6.78-6.18c-.37-.19-2.2-1.09-2.54-1.21-.34-.12-.59-.19-.84.19-.24.37-.97 1.21-1.19 1.46-.22.25-.44.28-.81.09-.37-.19-1.57-.58-2.99-1.84-1.11-.99-1.86-2.21-2.07-2.58-.22-.37-.02-.57.16-.76.16-.16.37-.44.56-.66.19-.22.25-.37.37-.62.12-.25.06-.46-.03-.66-.09-.19-.84-2.02-1.15-2.77-.3-.73-.61-.63-.84-.64l-.72-.01c-.25 0-.66.09-1 .46-.34.37-1.29 1.26-1.29 3.08s1.32 3.58 1.51 3.82c.19.25 2.61 3.98 6.3 5.58.88.38 1.57.61 2.11.78.89.28 1.69.24 2.33.15.71-.11 2.2-.9 2.51-1.77.31-.87.31-1.62.22-1.77-.1-.15-.34-.25-.71-.44Z" />
      </svg>
    </a>
  );
}

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E6EEF6] p-3 flex gap-3 md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <a
        href="https://wa.me/254753728292"
        target="_blank"
        className="flex-1 h-11 rounded-full bg-white border border-[#E6EEF6] text-[#0B1F33] font-semibold text-sm flex items-center justify-center"
      >
        WhatsApp
      </a>
      <a
        href="tel:+254753728292"
        className="flex-1 h-11 rounded-full bg-[#0F8B8D] text-white font-semibold text-sm flex items-center justify-center"
      >
        Call +254 753 728 292
      </a>
    </div>
  );
}
