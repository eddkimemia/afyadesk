import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("Admin123!", 10);
  await prisma.user.upsert({
    where: { email: "admin@afyadesk.co.ke" },
    update: {},
    create: { name: "AfyaDesk Admin", email: "admin@afyadesk.co.ke", password: hash, role: "ADMIN" },
  });

  const services = [
    { slug: "medical-virtual-assistants", title: "Medical Virtual Assistants", description: "Trained administrative professionals for scheduling, patient coordination and office admin.", icon: "Stethoscope", order: 1 },
    { slug: "medical-receptionist", title: "Medical Receptionist", description: "Phone answering, patient inquiries, booking and follow-ups.", icon: "Phone", order: 2 },
    { slug: "medical-transcription", title: "Medical Transcription", description: "Clinical transcription and documentation.", icon: "FileText", order: 3 },
    { slug: "medical-billing", title: "Medical Billing & Claims Support", description: "Claims prep and billing admin including SHA/private insurers.", icon: "Receipt", order: 4 },
    { slug: "patient-support", title: "Patient Support", description: "Onboarding, follow-ups, care coordination.", icon: "HeartHandshake", order: 5 },
    { slug: "medical-data-administration", title: "Medical Data & Administration", description: "EMR admin, data entry, records and reporting.", icon: "Database", order: 6 },
    { slug: "telehealth-support", title: "Telehealth Support", description: "Virtual care coordination for telemedicine.", icon: "Video", order: 7 },
  ];

  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: {}, create: s as any });
  }

  await prisma.testimonial.createMany({
    data: [
      { name: "Dr. Wanjiku Mwangi", role: "Director", organization: "Parklands Medical Centre, Nairobi", content: "AfyaDesk transformed our front desk. Professional and reliable.", rating: 5 },
      { name: "Dr. James Ochieng", role: "Founder", organization: "Lakeview Dental Clinic, Kisumu", content: "Transcription support saves 10+ hours weekly.", rating: 5 },
      { name: "Sarah Mitchell", role: "Operations Lead", organization: "TeleHealth UK", content: "Seamless outsourcing from Kenya.", rating: 5 },
    ],
    skipDuplicates: true,
  });

  console.log("Seed done");
}

main().finally(() => prisma.$disconnect());
