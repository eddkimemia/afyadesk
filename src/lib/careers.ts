export type Career = {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  department: string;
  type: "Full-time" | "Part-time" | "Full-time / Part-time" | "Part-time / Full-time";
  location: string;
  rate: string; // e.g. "$12 – $18 / hr"
  rateNote: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  coverImage: string;
};

export const careers: Career[] = [
  {
    slug: "medical-virtual-assistant",
    title: "Medical Virtual Assistant",
    shortDesc: "Scheduling, patient coordination & admin workflows for clinics.",
    longDesc:
      "As a Medical Virtual Assistant you’ll be the operational backbone for our partner clinics and hospitals — managing calendars, coordinating patients, and keeping practice workflows smooth. You’ll work remotely under supervision of licensed professionals (non-clinical role only).",
    department: "Virtual Assistance",
    type: "Full-time / Part-time",
    location: "Remote • Kenya",
    rate: "$12 – $18 / hr",
    rateNote: "Based on experience • Paid monthly via M-Pesa / bank",
    responsibilities: [
      "Appointment scheduling & calendar management (Google Calendar / Outlook)",
      "Patient communication, reminders & follow-ups",
      "Referral coordination and inbox management",
      "Medical office administration & workflow support",
      "EMR / practice management data entry",
    ],
    requirements: [
      "1+ years admin experience (healthcare preferred)",
      "Strong English + Swahili communication, professional phone manner",
      "Comfortable with EMRs, Google Workspace, Zoom/Meet",
      "Reliable internet, quiet workspace, backup power plan",
      "High confidentiality & attention to detail",
    ],
    benefits: ["Training on healthcare workflows", "Growth to Team Lead", "Flexible remote", "Health-support community"],
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "medical-receptionist",
    title: "Medical Receptionist",
    shortDesc: "Front-desk overflow — calls, booking & patient inquiries.",
    longDesc:
      "Answer patient calls, handle inquiries and book appointments with empathy and speed. You’ll be the first voice patients hear — professional, calm and healthcare-aware.",
    department: "Patient Services",
    type: "Full-time / Part-time",
    location: "Remote • Kenya",
    rate: "$11 – $16 / hr",
    rateNote: "Shift allowances for UK/US coverage",
    responsibilities: [
      "Answer inbound calls & patient inquiries",
      "Appointment booking, rescheduling & reminders",
      "Patient follow-ups & no-show reduction",
      "Front-desk overflow for busy practices",
      "Accurate call logging & handover notes",
    ],
    requirements: [
      "Excellent English, clear phone voice",
      "Customer-service or reception experience",
      "Ability to work flexible shifts (incl. evening for international clients)",
      "Fast typing & calendar tools",
    ],
    benefits: ["Voice & communication coaching", "Performance bonuses", "Shift flexibility"],
    coverImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "medical-transcriptionist",
    title: "Medical Transcriptionist",
    shortDesc: "Clinical notes, dictations & referral letters — accurate & secure.",
    longDesc:
      "Turn doctor dictations into accurate, structured documentation. Precision matters — you’ll deliver consultation notes and referral letters securely and on time.",
    department: "Documentation",
    type: "Full-time",
    location: "Remote • Kenya",
    rate: "$14 – $19 / hr",
    rateNote: "Per-audio-hour bonus available",
    responsibilities: [
      "Transcribe clinical dictations & consultation notes",
      "Format referral letters & medical documents",
      "Maintain terminology accuracy & confidentiality",
      "Quality-check and turnaround within SLA",
    ],
    requirements: [
      "Transcription experience or medical terminology knowledge",
      "90%+ accuracy, strong grammar",
      "Secure handling of sensitive data",
      "Headset + foot pedal helpful but not required",
    ],
    benefits: ["Medical terminology training", "QA feedback loop", "Accuracy incentives"],
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "healthcare-customer-support",
    title: "Healthcare Customer Support",
    shortDesc: "Patient onboarding, education admin & inquiry handling.",
    longDesc:
      "Support patients through onboarding and education admin — answering non-clinical inquiries with empathy while keeping care coordination smooth.",
    department: "Patient Support",
    type: "Part-time / Full-time",
    location: "Remote • Kenya",
    rate: "$10 – $15 / hr",
    rateNote: "Performance-based raise at 3 months",
    responsibilities: [
      "Patient onboarding & welcome calls",
      "Non-clinical inquiry handling (chat/email/phone)",
      "Patient education administration",
      "Escalation to clinical staff when needed",
    ],
    requirements: ["Empathy & patience", "Support/success experience", "Written English excellence", "Healthcare interest"],
    benefits: ["Soft-skills coaching", "Career path to VA", "Supportive team"],
    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "medical-administrative-assistant",
    title: "Medical Administrative Assistant",
    shortDesc: "EMR admin, data entry, records & reporting.",
    longDesc:
      "Keep records clean and workflows moving — from EMR administration to reporting. You’ll be the detail-driven operator every practice needs.",
    department: "Operations",
    type: "Full-time",
    location: "Remote • Kenya",
    rate: "$13 – $20 / hr",
    rateNote: "EMR-certified candidates +$2/hr",
    responsibilities: [
      "EMR administration & data entry",
      "Records organization & document management",
      "Reporting & administrative workflows",
      "Quality checks & data hygiene",
    ],
    requirements: ["Data-entry accuracy", "EMR or health-system familiarity a plus", "Excel/Sheets comfort", "Process-oriented"],
    benefits: ["EMR training", "Ops career track", "Tools stipend"],
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "medical-billing-assistant",
    title: "Medical Billing Assistant",
    shortDesc: "Claims prep, SHA/private insurer docs & follow-ups.",
    longDesc:
      "Help practices get paid on time — prepare claims, organize insurance documentation and follow up on submissions (including SHA/SHIF and private insurers). Non-clinical, admin only.",
    department: "Revenue",
    type: "Full-time",
    location: "Remote • Kenya",
    rate: "$15 – $20 / hr",
    rateNote: "Billing software experience valued",
    responsibilities: [
      "Claims preparation & submission support",
      "Insurance documentation organization",
      "Billing administration & reconciliation support",
      "Claims follow-up & status tracking",
    ],
    requirements: ["Billing/claims or strong admin + numbers aptitude", "Detail-oriented, audit-ready mindset", "Confidentiality", "SHA/SHIF knowledge a plus"],
    benefits: ["Billing mastery program", "Higher rate band", "Stable long-term clients"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
];
