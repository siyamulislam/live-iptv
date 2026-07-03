import Link from "next/link";
import { Tv } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="glass rounded-2xl p-8 text-center">
      <Tv className="mx-auto h-10 w-10 text-accent" />
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">{description}</p>
      <Button asChild className="mt-6">
        <Link href="/live">Explore channels</Link>
      </Button>
    </section>
  );
}
