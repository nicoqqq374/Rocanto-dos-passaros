"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Calendar, Home, Users, Search, ChevronDown, Check } from "lucide-react";
import { useBooking } from "@/context/booking-context";
import { DateRangeModal, formatReadableDate } from "./date-range-modal";

export function QuickBookingBar() {
  const { openBooking, rooms } = useBooking();

  // Dates initialization
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultCheckIn = tomorrow.toISOString().split("T")[0];

  const inThreeDays = new Date();
  inThreeDays.setDate(inThreeDays.getDate() + 3);
  const defaultCheckOut = inThreeDays.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState<string>(defaultCheckIn);
  const [checkOut, setCheckOut] = useState<string>(defaultCheckOut);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("all");
  const [guests, setGuests] = useState<string>("2");

  // Date Range Modal state
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [dateModalTarget, setDateModalTarget] = useState<"checkIn" | "checkOut">("checkIn");

  const handleOpenDateModal = (target: "checkIn" | "checkOut") => {
    setDateModalTarget(target);
    setIsDateModalOpen(true);
  };

  const handleSelectDates = (newIn: string, newOut: string) => {
    setCheckIn(newIn);
    setCheckOut(newOut);
  };

  // Dropdown open states
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);

  const roomDropdownRef = useRef<HTMLDivElement>(null);
  const guestsDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        roomDropdownRef.current &&
        !roomDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRoomDropdownOpen(false);
      }
      if (
        guestsDropdownRef.current &&
        !guestsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsGuestsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roomId = selectedRoom?.id;
    const roomName = selectedRoom ? selectedRoom.name : undefined;
    openBooking(roomId, roomName, checkIn, checkOut, guests);
  };

  return (
    <div className="w-full max-w-5xl mx-auto z-30 relative">
      <form
        onSubmit={handleSubmit}
        className="p-2 sm:p-3 rounded-2xl sm:rounded-3xl lg:rounded-full bg-[#050B07]/85 backdrop-blur-2xl border border-[#C29D59]/40 shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(194,157,89,0.15)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 transition-all duration-300 hover:border-[#C29D59]/70"
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 flex-1">
          {/* 1. ENTRADA */}
          <button
            type="button"
            onClick={() => handleOpenDateModal("checkIn")}
            className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 rounded-xl lg:rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:scale-[0.98] border border-white/10 hover:border-[#C29D59]/45 transition-all cursor-pointer group min-h-[52px] text-left w-full shadow-2xs"
          >
            <Calendar className="w-4 h-4 text-[#C29D59] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6C994]">
                Entrada
              </span>
              <span className="text-xs sm:text-sm font-bold text-white truncate">
                {formatReadableDate(checkIn)}
              </span>
            </div>
          </button>

          {/* 2. SAÍDA */}
          <button
            type="button"
            onClick={() => handleOpenDateModal("checkOut")}
            className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 rounded-xl lg:rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:scale-[0.98] border border-white/10 hover:border-[#C29D59]/45 transition-all cursor-pointer group min-h-[52px] text-left w-full shadow-2xs"
          >
            <Calendar className="w-4 h-4 text-[#C29D59] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6C994]">
                Saída
              </span>
              <span className="text-xs sm:text-sm font-bold text-white truncate">
                {formatReadableDate(checkOut)}
              </span>
            </div>
          </button>

          {/* 3. ACOMODAÇÃO (Custom Visual Dropdown with Room Thumbnails) */}
          <div ref={roomDropdownRef} className="relative col-span-2 sm:col-span-1">
            <button
              type="button"
              aria-expanded={isRoomDropdownOpen}
              aria-haspopup="listbox"
              onClick={() => {
                setIsRoomDropdownOpen(!isRoomDropdownOpen);
                setIsGuestsDropdownOpen(false);
              }}
              className="w-full h-full flex items-center justify-between gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-xl lg:rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:scale-[0.98] border border-white/10 hover:border-[#C29D59]/45 transition-all text-left group cursor-pointer min-h-[52px] shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Home className="w-4 h-4 text-[#C29D59] shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6C994]">
                    Acomodação
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {selectedRoom ? selectedRoom.name : "Todas as Acomodações"}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                  isRoomDropdownOpen ? "rotate-180 text-[#C29D59]" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu with Photo Thumbnails */}
            {isRoomDropdownOpen && (
              <div
                role="listbox"
                aria-label="Selecionar acomodação"
                className="absolute top-full left-0 right-0 sm:right-auto mt-2 w-full sm:w-80 rounded-2xl bg-[#0D1812] border border-[#C29D59]/40 p-2 shadow-[0_25px_55px_rgba(0,0,0,0.6)] z-50 max-h-80 overflow-y-auto overscroll-contain animate-fade-in text-white"
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={selectedRoomId === "all"}
                  onClick={() => {
                    setSelectedRoomId("all");
                    setIsRoomDropdownOpen(false);
                  }}
                  className={`w-full min-h-[46px] flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold transition-all mb-1 cursor-pointer active:scale-[0.99] ${
                    selectedRoomId === "all"
                      ? "bg-[#1B3B2B] text-white font-bold border border-[#C29D59]/40 shadow-xs"
                      : "text-zinc-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>Todas as Acomodações</span>
                  {selectedRoomId === "all" && <Check className="w-4 h-4 text-[#C29D59]" />}
                </button>

                {rooms.map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    role="option"
                    aria-selected={selectedRoomId === room.id}
                    onClick={() => {
                      setSelectedRoomId(room.id);
                      setIsRoomDropdownOpen(false);
                    }}
                    className={`w-full min-h-[54px] flex items-center gap-3 p-2 rounded-xl text-left transition-all mb-1 cursor-pointer active:scale-[0.99] ${
                      selectedRoomId === room.id
                        ? "bg-[#1B3B2B] text-white border border-[#C29D59]/40 shadow-xs"
                        : "text-zinc-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-[#07100A] border border-white/10">
                      <Image
                        src={room.images[0]}
                        alt={room.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>

                    {/* Room Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-white truncate">
                          {room.name}
                        </span>
                        {selectedRoomId === room.id && (
                          <Check className="w-3.5 h-3.5 text-[#C29D59] shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                        <span className="text-[#E6C994] font-semibold">
                          R$ {room.price}/n
                        </span>
                        <span>•</span>
                        <span>{room.capacity} {room.capacity > 1 ? "hóspedes" : "hóspede"}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. HÓSPEDES */}
          <div ref={guestsDropdownRef} className="relative col-span-2 sm:col-span-1">
            <button
              type="button"
              aria-expanded={isGuestsDropdownOpen}
              aria-haspopup="listbox"
              onClick={() => {
                setIsGuestsDropdownOpen(!isGuestsDropdownOpen);
                setIsRoomDropdownOpen(false);
              }}
              className="w-full h-full flex items-center justify-between gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-xl lg:rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:scale-[0.98] border border-white/10 hover:border-[#C29D59]/45 transition-all text-left group cursor-pointer min-h-[52px] shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Users className="w-4 h-4 text-[#C29D59] shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6C994]">
                    Hóspedes
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {guests} {parseInt(guests) > 1 ? "pessoas" : "pessoa"}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                  isGuestsDropdownOpen ? "rotate-180 text-[#C29D59]" : ""
                }`}
              />
            </button>

            {/* Guests Dropdown Menu */}
            {isGuestsDropdownOpen && (
              <div
                role="listbox"
                aria-label="Selecionar quantidade de hóspedes"
                className="absolute top-full left-0 right-0 sm:right-auto mt-2 w-full sm:w-48 rounded-2xl bg-[#0D1812] border border-[#C29D59]/40 p-2 shadow-[0_25px_55px_rgba(0,0,0,0.6)] z-50 animate-fade-in text-white"
              >
                {["1", "2", "3", "4", "5+"].map((count) => (
                  <button
                    key={count}
                    type="button"
                    role="option"
                    aria-selected={guests === count}
                    onClick={() => {
                      setGuests(count);
                      setIsGuestsDropdownOpen(false);
                    }}
                    className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all mb-0.5 cursor-pointer active:scale-[0.99] ${
                      guests === count
                        ? "bg-[#1B3B2B] text-white border border-[#C29D59]/40 font-bold"
                        : "text-zinc-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{count} {count === "1" ? "pessoa" : "pessoas"}</span>
                    {guests === count && <Check className="w-3.5 h-3.5 text-[#C29D59]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 5. Submit Button in Champagne Gold */}
        <div className="shrink-0 pt-1 lg:pt-0">
          <button
            type="submit"
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl lg:rounded-full bg-[#C29D59] hover:bg-[#D4AF67] active:bg-[#B8924E] text-[#050B07] font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(194,157,89,0.4)] hover:shadow-[0_0_35px_rgba(194,157,89,0.6)] transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-[0.98] min-h-[52px] group"
          >
            <Search className="w-4 h-4 text-[#050B07] stroke-[2.5] shrink-0 group-hover:scale-110 transition-transform" />
            <span>Ver Tarifas →</span>
          </button>
        </div>
      </form>

      {/* 2026 Warm Luxury Date Range Picker Modal */}
      <DateRangeModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        checkIn={checkIn}
        checkOut={checkOut}
        onSelectDates={handleSelectDates}
        initialTarget={dateModalTarget}
      />
    </div>
  );
}
