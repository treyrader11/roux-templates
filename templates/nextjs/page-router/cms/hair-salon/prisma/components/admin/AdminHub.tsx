import AdminLayout from "@/components/admin/AdminLayout";
import SectionCard from "@/components/admin/SectionCard";

interface AdminHubProps {
  title: string;
  description?: string;
  sections: { name: string; description: string; href: string }[];
}

export default function AdminHub({ title, description, sections }: AdminHubProps) {
  return (
    <AdminLayout backHref="/admin" backLabel="Dashboard">
      <h1 className="font-display text-3xl text-foreground">{title}</h1>
      {description && <p className="mt-2 text-muted-foreground">{description}</p>}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <SectionCard key={s.href} {...s} />
        ))}
      </div>
    </AdminLayout>
  );
}
