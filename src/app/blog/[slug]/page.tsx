import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

const contentMap: Record<string, string> = {
  "what-is-medical-virtual-assistant": `
A Medical Virtual Assistant (MVA) is a trained administrative professional who supports healthcare providers remotely.

**What they do**
- Appointment scheduling & calendar management
- Patient communication, reminders & follow-ups
- Referral coordination & inbox handling
- Documentation support & EMR admin
- Billing documentation & claims follow-up

**What they don't do**
MVAs are non-clinical. They don't diagnose, prescribe or make clinical decisions.

**ROI for Kenyan clinics**
Clinics using MVAs report 30-40% less admin time, fewer missed calls and faster documentation turnaround — allowing doctors to see more patients.

**Getting started with AfyaDesk**
1. Free consultation to map your workflow
2. Matched Kenyan talent in 5-7 days
3. Secure onboarding into your tools
4. Ongoing QA and scaling as needed.
  `,
  default: `
This article covers practical strategies for healthcare teams to reduce administrative overload using virtual support.

Key takeaways:
- Audit your top 5 time-consuming admin tasks
- Delegate non-clinical work first (scheduling, reception, data entry)
- Standardize workflows before scaling
- Measure no-shows, response times and documentation turnaround

AfyaDesk helps you implement these changes with trained Kenyan professionals who embed in your tools and operate under your policies.
  `,
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | AfyaDesk Blog`,
    description: post.excerpt,
    openGraph: { images: [post.coverImage || post.image] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const body = contentMap[post.slug] || contentMap.default;

  return (
    <div>
      <BreadcrumbHero
        eyebrow="Blog"
        title={post.title}
        description={post.excerpt}
        featuredImage={post.coverImage || post.image}
        breadcrumb={[
          { label: "Blog", href: "/blog" },
          { label: post.title.slice(0, 30) + "…", href: `/blog/${post.slug}` },
        ]}
      >
        <span className="text-xs bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
          {post.date} • {post.author} • 5 min read
        </span>
        <span className="flex gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="text-xs bg-white text-[#0B1F33] px-2.5 py-1 rounded-full font-semibold">
              {t}
            </span>
          ))}
        </span>
      </BreadcrumbHero>

      <div className="mx-auto max-w-3xl px-6 py-8">
        {/* featured image - large, stack style */}
        <div className="relative h-64 md:h-[360px] rounded-[20px] overflow-hidden border border-[#E6EEF6] bg-[#F8FAFC]">
          <Image
            src={post.coverImage || post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="800px"
          />
        </div>

        {/* stacked secondary images row - decorative */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=400&q=80",
            post.coverImage,
          ].map((src, i) => (
            <div key={i} className="relative h-28 rounded-2xl overflow-hidden border border-[#E6EEF6]">
              <Image src={src || post.image} alt="" fill className="object-cover" sizes="200px" />
            </div>
          ))}
        </div>

        <article className="prose prose-sm max-w-none mt-6 text-[#172033] whitespace-pre-line leading-7">{body}</article>

        <div className="mt-8 rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="font-bold text-[#0B1F33]">Want help implementing this?</h3>
            <p className="text-sm text-[#5B6B80]">Talk to AfyaDesk — we&apos;ll map your workflow in a free consultation.</p>
          </div>
          <Link href="/contact">
            <Button>Book a Free Consultation</Button>
          </Link>
        </div>

        <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900">
          Disclaimer: Administrative guidance only. Not medical advice. Clinical decisions remain with licensed professionals.
        </div>
      </div>
    </div>
  );
}
