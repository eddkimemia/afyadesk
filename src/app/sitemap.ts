import { services, blogPosts } from "@/lib/data";
import { careers } from "@/lib/careers";

export default function sitemap() {
  const base = "https://afyadesk.co.ke";
  const staticPages = ["", "/services", "/industries", "/about", "/careers", "/careers/apply", "/course", "/course/enroll", "/portal", "/portal/login", "/course/portal", "/contact", "/blog", "/privacy", "/terms", "/data-protection", "/cookies"];
  return [
    ...staticPages.map((p) => ({ url: `${base}${p}`, lastModified: new Date() })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date() })),
    ...blogPosts.map((b) => ({ url: `${base}/blog/${b.slug}`, lastModified: new Date(b.date) })),
    ...careers.map((c) => ({ url: `${base}/careers/${c.slug}`, lastModified: new Date() })),
  ];
}
