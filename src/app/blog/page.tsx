import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/data";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";

export const metadata = { title: "Blog — Healthcare Operations & Virtual Support" };

export default function BlogPage() {
  return (
    <div>
      <BreadcrumbHero
        eyebrow="Insights"
        title="Insights for healthcare teams"
        description="Practical guides on virtual assistants, clinic operations, telehealth and outsourcing in Kenya."
        breadcrumb={[{ label: "Blog", href: "/blog" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogPosts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="rounded-[20px] bg-white border border-[#E6EEF6] overflow-hidden hover:shadow-md transition group flex flex-col"
          >
            <div className="relative h-48 overflow-hidden bg-[#F8FAFC]">
              <Image
                src={p.coverImage || p.image}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition duration-500"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/30 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="text-[11px] font-semibold bg-white/95 backdrop-blur px-2 py-1 rounded-full text-[#0B1F33]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="text-xs text-[#8A9BB0]">
                {p.date} • {p.author}
              </div>
              <h2 className="mt-1 font-semibold text-[#0B1F33] group-hover:text-[#0F8B8D] leading-tight">{p.title}</h2>
              <p className="mt-2 text-sm text-[#5B6B80] leading-6 line-clamp-2 flex-1">{p.excerpt}</p>
              <span className="mt-3 inline-flex text-sm font-semibold text-[#0F8B8D]">Read more →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* stacked featured preview */}
      <div className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-[24px] bg-[#0B1F33] text-white p-6 grid md:grid-cols-3 gap-4 items-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="relative md:col-span-2">
            <h3 className="font-bold text-lg">Want new posts in your inbox?</h3>
            <p className="text-sm text-white/70">Healthcare ops, virtual support playbooks and Kenya market insights — no spam.</p>
          </div>
          <div className="relative flex gap-2">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <span key={i} className="h-10 w-10 rounded-full border-2 border-[#0B1F33] overflow-hidden relative bg-white">
                  <Image
                    src={`https://images.unsplash.com/photo-${i === 1 ? "1559757148-5c350d0d3c56" : i === 2 ? "1586776802477-3680284edb4e" : "1576091160550-2173dba999ef"}?auto=format&fit=crop&w=100&q=80`}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </span>
              ))}
            </div>
            <Link href="/contact" className="ml-auto inline-flex h-10 px-5 items-center rounded-full bg-white text-[#0B1F33] text-sm font-semibold">
              Subscribe via contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
