"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Check, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Room } from "@/data/rooms";
import { useBooking } from "@/context/booking-context";

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
}

export function RoomDetailModal({ room, onClose }: RoomDetailModalProps) {
  const { openBooking } = useBooking();
  const [mounted, setMounted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Touch swipe refs declared at top level
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (room) {
      setSelectedImageIndex(0);
    }
  }, [room?.id]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && room) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [room, onClose]);

  const handleBookNow = () => {
    if (!room) return;
    onClose();
    openBooking(room.id, room.name);
  };

  const images = (room?.images && room.images.length > 0)
    ? room.images.filter((img) => typeof img === "string" && img.length > 0)
    : ["/recanto/hero-pousada-real.jpg"];

  const currentImageIndex = Math.min(selectedImageIndex, images.length - 1);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    if (e.targetTouches && e.targetTouches[0]) {
      touchStartX.current = e.targetTouches[0].clientX;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches && e.targetTouches[0]) {
      touchEndX.current = e.targetTouches[0].clientX;
    }
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  // SSR check
  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {room && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden overscroll-contain">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#14221A]/65 backdrop-blur-md transition-opacity cursor-pointer overscroll-contain"
            aria-hidden="true"
          />

          {/* Modal Window in Warm Luxury Palette */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-detail-title"
            initial={{ scale: 0.96, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="relative z-10 w-full max-w-3xl max-h-[92dvh] bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#F4EFE6] border-t sm:border border-[#C29D59]/35 rounded-t-[2.2rem] sm:rounded-3xl shadow-[0_25px_60px_rgba(20,34,26,0.25)] flex flex-col overflow-hidden overscroll-contain text-[#14221A]"
          >
            {/* Mobile Drag Indicator */}
            <div className="w-full flex sm:hidden justify-center pt-3 pb-1" aria-hidden="true">
              <div className="w-12 h-1 rounded-full bg-[#14221A]/20" />
            </div>

            {/* Header */}
            <div className="px-5 sm:px-6 py-3 sm:py-4 border-b border-[#14221A]/8 flex items-center justify-between bg-white/85 sticky top-0 z-20 backdrop-blur-md">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#1B3B2B]/8 border border-[#1B3B2B]/15 flex items-center justify-center text-[#C29D59] shrink-0">
                  <Shield className="w-4 h-4 text-[#C29D59]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#9A7836] block truncate">
                    {room.typeName || "Acomodação"}
                  </span>
                  <h3 id="room-detail-title" className="font-serif text-base sm:text-xl font-bold text-[#14221A] leading-tight truncate">
                    {room.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-black/5 hover:bg-black/10 active:bg-black/15 text-[#536459] hover:text-[#14221A] flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0 ml-2"
                aria-label="Fechar detalhes"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-5 sm:space-y-6">
              {/* Main Image Viewer with Swipe on Touch (touch-pan-y preserves vertical scroll) */}
              <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="relative h-60 sm:h-84 w-full rounded-2xl overflow-hidden bg-[#EBE4D5] border border-[#14221A]/10 group select-none cursor-grab active:cursor-grabbing shadow-inner touch-pan-y"
              >
                <img
                  src={images[currentImageIndex] || images[0]}
                  alt={`${room.name} foto ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Badges on Top */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 pointer-events-none">
                  {room.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C29D59] text-white shadow-md">
                      {room.badge}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#1B3B2B] shadow-md backdrop-blur-md">
                    {room.capacity} {room.capacity > 1 ? "hóspedes" : "hóspede"}
                  </span>
                </div>

                {/* Left/Right Arrows (>= 44x44px Touch Targets) */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-white/85 hover:bg-white text-[#14221A] backdrop-blur-md border border-[#14221A]/10 shadow-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-white/85 hover:bg-white text-[#14221A] backdrop-blur-md border border-[#14221A]/10 shadow-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                      aria-label="Próxima foto"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Counter Pill */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-black/65 text-white backdrop-blur-md pointer-events-none">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer active:scale-95 ${
                        currentImageIndex === idx ? "border-[#1B3B2B] scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Selecionar miniatura ${idx + 1}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A7836] mb-1.5">
                  Sobre a Acomodação
                </h4>
                <p className="text-[#48584E] text-sm sm:text-base leading-relaxed font-normal max-w-[65ch]">
                  {room.description}
                </p>
              </div>

              {/* Features & Amenities Grid */}
              {Array.isArray(room.features) && room.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A7836] mb-2.5">
                    Comodidades & Diferenciais
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {room.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#C29D59]/20 text-xs sm:text-sm text-[#3D4F44] shadow-2xs"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#1B3B2B]/10 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-[#1B3B2B]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Serenity reminder */}
              <div className="p-4 rounded-2xl bg-white/80 border border-[#C29D59]/25 flex items-start gap-3 text-xs sm:text-sm text-[#48584E]">
                <Shield className="w-4 h-4 text-[#1B3B2B] shrink-0 mt-0.5" />
                <p>
                  Ambiente sereno com política de silêncio das 22h às 08h, piscina com borda infinita, café da manhã colonial artesanal incluso e acolhimento 100% Pet Friendly.
                </p>
              </div>
            </div>

            {/* Sticky Bottom Action Bar inside Modal */}
            <div className="p-4 sm:p-5 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-[#14221A]/8 bg-white/95 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-20 backdrop-blur-md">
              <div className="w-full sm:w-auto flex items-center justify-between sm:block">
                {room.price > 0 ? (
                  <div>
                    <span className="text-[10px] text-[#5E7165] uppercase tracking-wider block font-semibold">Tarifa Direta Oficial</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-[#1B3B2B] font-bold">R$</span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#14221A] tracking-tight">{room.price}</span>
                      <span className="text-xs text-[#536459]">/noite</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-[10px] text-[#5E7165] uppercase tracking-wider block font-semibold">Tarifa</span>
                    <span className="text-lg font-bold text-[#14221A]">Sob Consulta</span>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-[#FAF7F2] bg-[#1B3B2B] hover:bg-[#142E20] active:bg-[#0F2318] shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-[#C29D59] shrink-0" />
                  <span>Reservar Agora</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
