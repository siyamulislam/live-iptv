import Link from "next/link";

export function TaxonomyCard({
  title,
  subtitle,
  href
}: {
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <Link
      className="glass block rounded-2xl p-5 transition hover:-translate-y-1 hover:bg-white/10"
      href={href}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
    </Link>
  );
}
