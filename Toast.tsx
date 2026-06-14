import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
  duration?: number;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50 space-y-3 max-w-sm">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastMessage;
  onRemove: () => void;
}) {
  useEffect(() => {
    const duration = toast.duration || 3000;
    const timer = setTimeout(onRemove, duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const bgColor = {
    success: "bg-green-500/20 border-green-500/30",
    error: "bg-red-500/20 border-red-500/30",
    info: "bg-blue-500/20 border-blue-500/30",
  }[toast.type];

  const textColor = {
    success: "text-green-400",
    error: "text-red-400",
    info: "text-blue-400",
  }[toast.type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }[toast.type];

  return (
    <div
      className={`${bgColor} border rounded-lg p-4 flex items-start gap-3 animate-in slide-in-from-right-full duration-300`}
    >
      <Icon className={`w-5 h-5 ${textColor} flex-shrink-0 mt-0.5`} />
      <p className="flex-1 text-sm">{toast.message}</p>
      <button
        onClick={onRemove}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
