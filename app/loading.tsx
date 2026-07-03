import { SkeletonGrid } from "@/components/feedback/skeleton-grid";

export default function Loading() {
  return (
    <main className="px-4 py-6 md:px-8">
      <SkeletonGrid />
    </main>
  );
}
