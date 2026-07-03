import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4">
      <section className="glass max-w-xl rounded-2xl p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold">Channel not found</h1>
        <p className="mt-3 text-sm text-zinc-400">
          The page may have moved, or this stream is currently unavailable.
        </p>
        <Button asChild className="mt-6">
          <Link href="/live">Browse live TV</Link>
        </Button>
      </section>
    </main>
  );
}
