"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface BookingWidgetProps {
  tenantSlug: string;
  baseUrl?: string;
  theme?: "dark" | "light";
  title?: string;
  className?: string;
  minHeight?: string | number;
  height?: string | number;
}

export function BookingWidget({
  tenantSlug,
  baseUrl = "https://simplereservasapp.darionicoq.workers.dev",
  theme = "dark",
  title = "Reserva Direta ao Vivo",
  className = "",
  minHeight,
  height = "860px",
}: BookingWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const src = `${baseUrl}/${tenantSlug}/embed?theme=${theme}`;
  const effectiveMinHeight = minHeight ?? height;

  return (
    <div className={`relative w-full overflow-hidden rounded-3xl bg-zinc-950/80 shadow-2xl ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-md transition-opacity duration-500">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-400" />
          <p className="mt-4 text-xs font-medium uppercase tracking-widest text-zinc-400">
            Carregando motor de reservas ao vivo...
          </p>
        </div>
      )}
      <iframe
        src={src}
        width="100%"
        height="100%"
        className="w-full border-none"
        style={{
          border: "none",
          borderRadius: "1.5rem",
          overflow: "hidden",
          width: "100%",
          minHeight: typeof effectiveMinHeight === "number" ? `${effectiveMinHeight}px` : effectiveMinHeight,
        }}
        title={title}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
