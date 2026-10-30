"use client";

import { useBooking } from "@/context/booking-context";

export function LodgingSchema({ data }: { data: Record<string, unknown> }) {
  const { rooms } = useBooking();
  const prices = rooms.map((room) => room.price).filter((price) => price > 0);
  const schema = {
    ...data,
    numberOfRooms: rooms.length,
    ...(prices.length ? { priceRange: `R$ ${Math.min(...prices)} - R$ ${Math.max(...prices)}` } : {}),
    image: [...(Array.isArray(data.image) ? data.image : []), ...rooms.flatMap((room) => room.images)],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo de Acomodações Recanto dos Pássaros",
      itemListElement: rooms.map((room) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "HotelRoom",
          name: room.name,
          description: room.description,
          image: room.images,
          occupancy: { "@type": "QuantitativeValue", value: room.capacity },
        },
        ...(room.price > 0 ? { priceSpecification: {
          "@type": "PriceSpecification", price: room.price, priceCurrency: "BRL",
        } } : {}),
      })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
  }} />;
}
