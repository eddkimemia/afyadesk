import { redirect } from "next/navigation";
import { getPortalSession } from "@/lib/portal";

export default async function CoursePortalPage() {
  const sess = await getPortalSession();
  if (!sess) redirect("/portal/login");
  redirect("/portal");
}
