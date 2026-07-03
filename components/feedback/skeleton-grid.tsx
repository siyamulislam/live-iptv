export function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          className="h-52 animate-pulse rounded-2xl bg-white/[0.08]"
          key={index}
        />
      ))}
    </div>
  );
}
