"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({
  title,
  description,
  actionLabel,
  onAction
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <section className="glass mx-auto max-w-xl rounded-2xl p-8 text-center">
      <AlertTriangle className="mx-auto h-10 w-10 text-danger" />
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm text-zinc-400">{description}</p>
      ) : null}
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </section>
  );
}
