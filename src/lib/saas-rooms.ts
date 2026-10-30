import type { Room } from "@/data/rooms";

export const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || "recanto-dos-passaros";
export const SAAS_ORIGIN = (process.env.NEXT_PUBLIC_SAAS_URL || "https://simplereservasapp.darionicoq.workers.dev").replace(/[/]$/, "");
export const BOOKING_EMBED_URL = `${SAAS_ORIGIN}/${encodeURIComponent(TENANT_SLUG)}/embed`;
export const ROOMS_API_URL = `${SAAS_ORIGIN}/api/public/${encodeURIComponent(TENANT_SLUG)}/units`;

const strings = (value: unknown): string[] => Array.isArray(value)
  ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
  : [];

function photoUrl(value: string): string | null {
  if (/^data:image\/(?:jpeg|png|webp|gif|avif);base64,[a-z0-9+/=\s]+$/i.test(value)) return value;
  try {
    const url = new URL(value, SAAS_ORIGIN);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

function number(value: unknown, fallback: number): number {
  if (value === null || value === undefined || value === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

// Validate the complete response before replacing the last successful catalog.
export function mapSaaSRooms(payload: unknown): Room[] {
  if (!payload || typeof payload !== "object" || !("units" in payload) || !Array.isArray(payload.units)) {
    throw new Error("Invalid rooms response");
  }
  const ids = new Set<string>();
  return payload.units.map((value: unknown): Room => {
    if (!value || typeof value !== "object") throw new Error("Invalid room");
    const unit = value as Record<string, unknown>;
    if (typeof unit.id !== "string" || !unit.id || ids.has(unit.id) || typeof unit.name !== "string") {
      throw new Error("Invalid room identity");
    }
    ids.add(unit.id);
    const type: Room["type"] = unit.type === "cabana" || unit.type === "compartilhado" || unit.type === "camping"
      ? unit.type : "suite";
    const labels = { suite: "Suíte", cabana: "Cabana", compartilhado: "Compartilhado", camping: "Camping" };
    const photos = strings(unit.photos).map(photoUrl).filter((url): url is string => url !== null);
    const imageUrl = typeof unit.imageUrl === "string" ? photoUrl(unit.imageUrl) : null;
    return {
      id: unit.id,
      name: unit.name,
      type,
      typeName: typeof unit.typeName === "string" ? unit.typeName : labels[type],
      price: number(unit.basePrice ?? unit.nightlyPrice ?? unit.price, 0),
      capacity: Math.max(1, Math.floor(number(unit.capacity, 2))),
      badge: typeof unit.badge === "string" ? unit.badge : "",
      features: strings(Array.isArray(unit.amenities) ? unit.amenities : unit.features),
      description: typeof unit.description === "string" ? unit.description : "",
      images: photos.length ? photos : imageUrl ? [imageUrl] : ["/recanto/hero-pousada-real.jpg"],
    };
  });
}
