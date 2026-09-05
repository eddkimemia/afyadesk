export default function AdminFaqsPage(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#0B1F33]">FAQs</h1>
      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
        <p className="text-sm text-[#5B6B80]">Manage FAQs via DB (prisma.faq).</p>
        <div className="mt-4 text-xs bg-[#F8FAFC] border border-[#E6EEF6] rounded-xl p-4">DB model: question, answer, category, order, isActive</div>
      </div>
    </div>
  );
}
