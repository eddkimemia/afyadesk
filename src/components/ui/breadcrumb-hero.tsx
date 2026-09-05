import Link from "next/link";
import Image from "next/image";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href: string }[];
  featuredImage?: string | null;
  showStacked?: boolean;
  children?: React.ReactNode; // actions
  compact?: boolean;
};

// curated medical images (Kenyan/African-friendly, professional)
const STACK_IMAGES = [
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
];

export function BreadcrumbHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  featuredImage,
  showStacked = true,
  children,
  compact = false,
}: Props) {
  const bgImage = featuredImage || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80";

  return (
    <div className="relative overflow-hidden bg-[#0B1F33] text-white">
      {/* gradient + medical background image */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          className="object-cover opacity-[0.18]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F33] via-[#0B1F33]/90 to-[#0F8B8D]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_15%_20%,rgba(15,139,141,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_85%_0%,rgba(37,99,235,0.18),transparent_60%)]" />
      </div>

      <div className={`relative mx-auto max-w-7xl px-6 ${compact ? "py-8 md:py-10" : "py-10 md:py-14 lg:py-16"}`}>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            {breadcrumb && breadcrumb.length > 0 && (
              <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-3" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                {breadcrumb.map((b) => (
                  <span key={b.href} className="flex items-center gap-1.5">
                    <span className="opacity-40">/</span>
                    <Link href={b.href} className="hover:text-white">
                      {b.label}
                    </Link>
                  </span>
                ))}
              </nav>
            )}
            {eyebrow && (
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-teal-300/90">{eyebrow}</p>
            )}
            <h1 className="mt-2 text-[28px] md:text-4xl font-bold tracking-tight leading-tight">{title}</h1>
            {description && <p className="mt-3 text-white/70 max-w-2xl leading-7 text-[15px] md:text-base">{description}</p>}
            {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
          </div>

          {showStacked && (
            <div className="hidden lg:block relative h-[240px]">
              {/* stacked photos - premium overlapping cards */}
              <div className="absolute right-0 top-0 w-[68%] h-[190px] rounded-[20px] overflow-hidden border border-white/15 shadow-2xl rotate-[1.5deg]">
                <Image src={STACK_IMAGES[0]} alt="Kenyan medical team" fill className="object-cover" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/40 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-xs font-semibold bg-white/95 text-[#0B1F33] rounded-full px-3 py-1.5 text-center">
                  Kenyan talent • Healthcare-trained
                </div>
              </div>
              <div className="absolute right-[34%] top-[86px] w-[52%] h-[150px] rounded-[20px] overflow-hidden border-2 border-white shadow-xl -rotate-[2deg]">
                <Image src={STACK_IMAGES[1]} alt="Doctor consulting patient" fill className="object-cover" sizes="300px" />
              </div>
              <div className="absolute right-[6%] bottom-0 w-[40%] h-[110px] rounded-2xl overflow-hidden border-2 border-white/90 shadow-lg rotate-[2deg]">
                <Image src={STACK_IMAGES[2]} alt="Medical documentation" fill className="object-cover" sizes="200px" />
                <div className="absolute inset-0 bg-[#0F8B8D]/10" />
              </div>
              {/* floating badge */}
              <div className="absolute left-[8%] bottom-[18px] rounded-2xl bg-white text-[#0B1F33] px-4 py-3 shadow-xl border border-[#E6EEF6] max-w-[200px]">
                <div className="text-xs font-bold tracking-wide text-[#0F8B8D] uppercase">Secure & Confidential</div>
                <div className="text-xs leading-4 text-[#5B6B80] mt-0.5">NDA, least-privilege access, encrypted comms</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
