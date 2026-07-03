import Link from "next/link";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-zinc-400">
      {items.map((item, index) => (
        <span className="flex items-center gap-2" key={`${item.label}-${index}`}>
          {item.href ? (
            <Link className="hover:text-white" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
          {index < items.length - 1 ? <span>/</span> : null}
        </span>
      ))}
    </nav>
  );
}
