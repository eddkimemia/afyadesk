export default function PortalLayout({ children }: { children: React.ReactNode }) {
  // Use site's nav/footer via ConditionalShell; portal dashboard provides its own inner header
  return <div className="min-h-screen bg-[#F8FAFC] flex flex-col">{children}</div>;
}
