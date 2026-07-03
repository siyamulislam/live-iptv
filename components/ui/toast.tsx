"use client";

import { X } from "lucide-react";
import { create } from "zustand";
import { Button } from "@/components/ui/button";

type Toast = {
  id: string;
  message: string;
};

type ToastState = {
  toasts: Toast[];
  push: (message: string) => void;
  remove: (id: string) => void;
};

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  push: (message) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, message }] }));
    window.setTimeout(
      () =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id)
        })),
      3000
    );
  },
  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
}));

export function Toaster() {
  const { toasts, remove } = useToast();

  return (
    <div
      className="fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          className="glass flex items-center justify-between rounded-2xl px-4 py-3 text-sm"
          key={toast.id}
        >
          <span>{toast.message}</span>
          <Button
            aria-label="Dismiss notification"
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => remove(toast.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
