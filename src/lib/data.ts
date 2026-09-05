// Static data for services, testimonials, FAQs, blog - used when DB not available or as fallback

export const services = [
  {
    slug: "medical-virtual-assistants",
    title: "Medical Virtual Assistants",
    description:
      "Trained administrative professionals who keep your practice running smoothly — from scheduling to patient coordination.",
    icon: "Stethoscope",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Appointment scheduling & calendar management",
      "Patient communication & follow-ups",
      "Referral coordination",
      "Medical office administration",
      "Administrative support & workflows",
    ],
    color: "teal",
  },
  {
    slug: "medical-receptionist",
    title: "Medical Receptionist",
    description:
      "Never miss a patient call again. Professional front-desk support that answers, books, and follows up.",
    icon: "Phone",
    coverImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Phone answering & patient inquiries",
      "Appointment booking & reminders",
      "Patient follow-ups",
      "Front-desk overflow support",
    ],
    color: "blue",
  },
  {
    slug: "medical-transcription",
    title: "Medical Transcription",
    description:
      "Accurate clinical documentation — from dictations to referral letters — delivered securely and on time.",
    icon: "FileText",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Clinical transcription",
      "Doctor dictation transcription",
      "Consultation notes & referral letters",
      "Medical documentation",
    ],
    color: "navy",
  },
  {
    slug: "medical-billing",
    title: "Medical Billing & Claims Support",
    description:
      "End billing delays. We handle claims prep, documentation and follow-ups — including SHA and private insurers.",
    icon: "Receipt",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Claims preparation & follow-up",
      "Insurance documentation",
      "Billing administration",
      "NHIF/SHA & private insurance support",
    ],
    color: "teal",
  },
  {
    slug: "patient-support",
    title: "Patient Support",
    description:
      "Human, empathetic patient coordination — onboarding, education admin and care continuity.",
    icon: "HeartHandshake",
    coverImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Patient onboarding",
      "Follow-up calls & appointment reminders",
      "Care coordination support",
      "Patient education administration",
    ],
    color: "blue",
  },
  {
    slug: "medical-data-administration",
    title: "Medical Data & Administration",
    description:
      "Clean, secure data handling for EMRs, records, reporting and everyday admin.",
    icon: "Database",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    features: [
      "EMR administration",
      "Data entry & records organization",
      "Document management",
      "Reporting & workflows",
    ],
    color: "navy",
  },
  {
    slug: "telehealth-support",
    title: "Telehealth Support",
    description:
      "Virtual-care coordination for telemedicine — onboarding, scheduling and follow-up done right.",
    icon: "Video",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Telemedicine appointment coordination",
      "Patient onboarding for virtual consults",
      "Virtual consultation support",
      "Follow-up coordination",
    ],
    color: "teal",
  },
];

export const testimonials = [
  {
    name: "Dr. Wanjiku Mwangi",
    role: "Director",
    org: "Parklands Medical Centre, Nairobi",
    content:
      "AfyaDesk transformed our front desk. Our virtual receptionist handles 80+ calls daily, appointment no-shows dropped by 40%. Professional and reliable.",
    rating: 5,
  },
  {
    name: "Dr. James Ochieng",
    role: "Founder",
    org: "Lakeview Dental Clinic, Kisumu",
    content:
      "We were drowning in documentation. AfyaDesk's transcription support saves our dentists 10+ hours a week. Accuracy is exceptional.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Operations Lead",
    org: "TeleHealth UK",
    content:
      "Outsourcing to Kenya via AfyaDesk was seamless. Excellent English, healthcare-aware, and cost-effective. Time-zone alignment is perfect.",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "Do virtual assistants provide clinical care or diagnosis?",
    a: "No. AfyaDesk provides administrative and support services only. Our assistants do not diagnose, prescribe, make clinical decisions, or replace licensed healthcare professionals. All clinical work remains with your qualified staff.",
  },
  {
    q: "How do you handle patient data confidentiality?",
    a: "We design workflows around applicable Kenyan data-protection requirements and client security policies — including least-privilege access, secure communication, confidentiality training, and access controls. We adapt to your specific security requirements.",
  },
  {
    q: "What systems do your assistants work with?",
    a: "Our assistants are trained to integrate with your existing tools — EMRs, practice management systems, calendars (Google/Outlook), VoIP/phone systems, and messaging platforms. We adapt to your workflow, not the other way around.",
  },
  {
    q: "Can I start part-time and scale?",
    a: "Absolutely. Choose part-time, full-time or a custom team. Many clients start with 20 hours/week and scale as volume grows. You can increase or decrease support with 14 days' notice.",
  },
  {
    q: "How quickly can I get matched?",
    a: "After your free consultation, we typically match you within 5–7 business days. This includes understanding your workflow, identifying suitable talent, and onboarding.",
  },
  {
    q: "Do you support international clients?",
    a: "Yes. We serve international healthcare organizations across the UK, USA, Australia and East Africa. We offer flexible scheduling to cover your time zone and ensure professional English communication.",
  },
];

export const blogPosts = [
  {
    slug: "what-is-medical-virtual-assistant",
    title: "What Is a Medical Virtual Assistant?",
    excerpt:
      "A complete guide for Kenyan clinics and hospitals: roles, tasks, ROI and how to get started with AfyaDesk.",
    date: "2026-02-10",
    author: "AfyaDesk Team",
    tags: ["Medical VA", "Healthcare Ops"],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "reduce-administrative-work-kenyan-clinics",
    title: "How Kenyan Clinics Can Reduce Administrative Work by 40%",
    excerpt:
      "Practical workflows to cut appointment overload, documentation backlog and missed calls — without hiring a large in-house team.",
    date: "2026-02-18",
    author: "AfyaDesk Team",
    tags: ["Clinic Management", "Kenya"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "virtual-assistant-vs-traditional-receptionist",
    title: "Medical Virtual Assistants vs Traditional Receptionists",
    excerpt:
      "Cost, coverage, scalability and reliability compared — and when a hybrid model works best.",
    date: "2026-03-01",
    author: "AfyaDesk Team",
    tags: ["Comparison", "Staffing"],
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "telemedicine-virtual-support",
    title: "How Telemedicine Practices Can Use Virtual Support to Scale",
    excerpt:
      "From onboarding to follow-ups: building a virtual care coordination engine for telehealth growth.",
    date: "2026-03-12",
    author: "AfyaDesk Team",
    tags: ["Telehealth", "Growth"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "future-healthcare-outsourcing-kenya",
    title: "The Future of Healthcare Outsourcing in Kenya",
    excerpt:
      "Why Kenya is emerging as a healthcare BPO hub — talent, English proficiency, tech ecosystem and cost advantage.",
    date: "2026-03-20",
    author: "AfyaDesk Team",
    tags: ["Outsourcing", "Kenya"],
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "improve-patient-appointment-management",
    title: "How to Improve Patient Appointment Management",
    excerpt: "6 proven systems to reduce no-shows, fill gaps and improve patient experience.",
    date: "2026-04-02",
    author: "AfyaDesk Team",
    tags: ["Patient Experience", "Ops"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "administrative-support-growing-clinics",
    title: "Medical Administrative Support for Growing Clinics",
    excerpt:
      "When to outsource, what to delegate first and how to measure success in your first 90 days.",
    date: "2026-04-15",
    author: "AfyaDesk Team",
    tags: ["Growth", "Administration"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  },
];

export const pricingPlans = [
  {
    name: "Part-Time Support",
    hours: "Up to 20 hrs / week",
    description: "For smaller practices testing virtual support.",
    features: ["Dedicated VA", "Flexible hours", "Core admin coverage", "Weekly check-in"],
    cta: "Request a Quote",
  },
  {
    name: "Full-Time Assistant",
    featured: true,
    hours: "40 hrs / week",
    description: "Most popular — one dedicated professional embedded in your team.",
    features: [
      "Dedicated full-time VA",
      "Full workflow integration",
      "Priority matching (<7 days)",
      "Performance reporting",
    ],
    cta: "Request a Quote",
  },
  {
    name: "Custom Team",
    hours: "Multiple VAs",
    description: "For hospitals, health startups and scaling orgs.",
    features: ["Team of 2–10+ VAs", "Team lead included", "Custom SLA", "Scalable on demand"],
    cta: "Request Custom Quote",
  },
];

export const industries = [
  { name: "Hospitals", desc: "Overflow, billing, records & coordination" },
  { name: "Clinics", desc: "Full front-desk & admin coverage" },
  { name: "Doctors", desc: "Scribe, schedule, inbox & billing help" },
  { name: "Dentists", desc: "Reception, recalls & transcription" },
  { name: "Laboratories", desc: "Results coordination & data entry" },
  { name: "Pharmacies", desc: "Orders, inquiries & documentation" },
  { name: "Telehealth", desc: "Virtual coordination at scale" },
  { name: "Health Startups", desc: "Ops, support & EMR admin" },
  { name: "Specialists", desc: "Referrals, transcription, follow-ups" },
  { name: "Insurers", desc: "Claims support & documentation" },
];
