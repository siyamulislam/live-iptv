"use client";

import { ErrorState } from "@/components/feedback/error-state";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="px-4 py-10 md:px-8">
      <ErrorState
        title="Something interrupted the stream"
        description={error.message}
        actionLabel="Try again"
        onAction={reset}
      />
    </main>
  );
}
