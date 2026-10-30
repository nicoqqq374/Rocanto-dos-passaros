"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

import { ROOMS_DATA, type Room } from "@/data/rooms";
import { mapSaaSRooms, ROOMS_API_URL } from "@/lib/saas-rooms";

interface BookingContextType {
  isOpen: boolean;
  rooms: Room[];
  isLoadingRooms: boolean;
  isLiveSaaS: boolean;
  refreshRooms: () => Promise<void>;
  selectedRoomId: string | null;
  selectedRoomName: string | null;
  checkInDate: string | null;
  checkOutDate: string | null;
  guestsCount: string | null;
  openBooking: (
    roomId?: string,
    roomName?: string,
    checkIn?: string,
    checkOut?: string,
    guests?: string
  ) => void;
  closeBooking: () => void;
  setFilters: (filters: {
    roomId?: string | null;
    roomName?: string | null;
    checkIn?: string | null;
    checkOut?: string | null;
    guests?: string | null;
  }) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>(ROOMS_DATA);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isLiveSaaS, setIsLiveSaaS] = useState(false);
  const requestRef = useRef<AbortController | null>(null);

  const refreshRooms = useCallback(async () => {
    if (requestRef.current) return;
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(ROOMS_API_URL, { cache: "no-store", signal: controller.signal });
      if (!response.ok) throw new Error(`Rooms API: ${response.status}`);
      const mapped = mapSaaSRooms(await response.json());
      if (!controller.signal.aborted) {
        setRooms(mapped);
        setIsLiveSaaS(true);
      }
    } catch (error) {
      if (requestRef.current === controller) {
        setIsLiveSaaS(false);
        console.warn("Não foi possível atualizar as acomodações; mantendo o último catálogo.", error);
      }
    } finally {
      clearTimeout(timeout);
      if (requestRef.current === controller) {
        requestRef.current = null;
        setIsLoadingRooms(false);
      }
    }
  }, []);

  useEffect(() => {
    void refreshRooms();
    const refreshVisible = () => {
      if (document.visibilityState === "visible") void refreshRooms();
    };
    const interval = setInterval(refreshVisible, 30000);
    window.addEventListener("focus", refreshVisible);
    window.addEventListener("online", refreshVisible);
    document.addEventListener("visibilitychange", refreshVisible);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", refreshVisible);
      window.removeEventListener("online", refreshVisible);
      document.removeEventListener("visibilitychange", refreshVisible);
      const pending = requestRef.current;
      requestRef.current = null;
      pending?.abort();
    };
  }, [refreshRooms]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedRoomName, setSelectedRoomName] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);
  const [guestsCount, setGuestsCount] = useState<string | null>(null);

  const openBooking = (
    roomId?: string,
    roomName?: string,
    checkIn?: string,
    checkOut?: string,
    guests?: string
  ) => {
    const room = rooms.find((item) => item.id === roomId);
    setSelectedRoomId(room?.id || null);
    setSelectedRoomName(room?.name || (!roomId ? roomName : null) || null);
    setCheckInDate(checkIn || null);
    setCheckOutDate(checkOut || null);
    setGuestsCount(guests || null);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  const setFilters = useCallback((filters: {
    roomId?: string | null;
    roomName?: string | null;
    checkIn?: string | null;
    checkOut?: string | null;
    guests?: string | null;
  }) => {
    if (filters.roomId !== undefined) {
      if (filters.roomId === "all" || filters.roomId === null) {
        setSelectedRoomId(null);
        setSelectedRoomName(null);
      } else {
        const room = rooms.find((item) => item.id === filters.roomId);
        setSelectedRoomId(room?.id || filters.roomId);
        setSelectedRoomName(filters.roomName || room?.name || null);
      }
    }
    if (filters.checkIn !== undefined) setCheckInDate(filters.checkIn);
    if (filters.checkOut !== undefined) setCheckOutDate(filters.checkOut);
    if (filters.guests !== undefined) setGuestsCount(filters.guests);
  }, [rooms]);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        rooms,
        isLoadingRooms,
        isLiveSaaS,
        refreshRooms,
        selectedRoomId: rooms.find((room) => room.id === selectedRoomId)?.id ?? null,
        selectedRoomName: selectedRoomId ? rooms.find((room) => room.id === selectedRoomId)?.name ?? null : selectedRoomName,
        checkInDate,
        checkOutDate,
        guestsCount,
        openBooking,
        closeBooking,
        setFilters,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
