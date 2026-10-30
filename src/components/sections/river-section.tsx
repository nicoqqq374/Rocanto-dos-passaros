"use client";

import React from "react";
import Image from "next/image";
import { Waves, Check, ArrowRight, Droplets } from "lucide-react";
import { useBooking } from "@/context/booking-context";
import { motion } from "framer-motion";

export function RiverSection() {
  const { openBooking } = useBooking();

  return (
    <section id="rio" className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent text-white relative overflow-hidden border-y border-white/10">
      {/* Subtle warm golden ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(194,157,89,0.14)_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[680px] h-[680px] bg-[radial-gradient(circle,rgba(27,59,43,0.2)_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase of the River */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Main Visual Frame: The River */}
            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden aspect-[4/3] sm:aspect-[4/5] min-h-[380px] sm:min-h-[500px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/20 group bg-[#07100A] w-full">
              <Image
                src="/recanto/rio-descanso-esteira.jpg"
                alt="Rio cristalino correndo dentro da Pousada Recanto dos Pássaros no Sana"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-black/60 text-[#E6C994] uppercase tracking-wider backdrop-blur-md shadow-md flex items-center gap-1.5 border border-[#C29D59]/40">
                  <Droplets className="w-3.5 h-3.5 text-[#C29D59]" />
                  <span>Exclusividade do Recanto</span>
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-left">
                <h3 className="font-serif text-xl sm:text-3xl font-bold text-white drop-shadow-sm">
                  O rio que corre dentro da pousada
                </h3>
                <p className="text-zinc-200 text-xs sm:text-sm font-light mt-1">
                  Águas puras e cristalinas que nascem na serra e serpenteiam o nosso jardim.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Copy & Emotional Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-6 space-y-5 sm:space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 border border-[#C29D59]/40 text-[#E6C994] text-xs font-semibold uppercase tracking-wider backdrop-blur-xl shadow-lg">
              <Waves className="w-3.5 h-3.5 text-[#C29D59]" />
              <span>Águas Cristalinas no Quintal</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
              A terapia das águas correntes que{" "}
              <span className="italic font-normal text-[#E6C994]">lava as tensões da cidade.</span>
            </h2>

            <p className="text-zinc-200 text-[15px] sm:text-lg font-light leading-relaxed max-w-[62ch]">
              Não precisamos de quadros na parede: a própria Mata Atlântica e as águas correntes são a nossa obra viva. Um trecho exclusivo de rio límpido e calmo passa a poucos passos do seu chalé, criando piscinas naturais perfeitas para um banho revigorante a qualquer hora do dia.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#0A140F]/80 border border-[#C29D59]/25 backdrop-blur-xl shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-[#C29D59]/15 border border-[#C29D59]/30 text-[#E6C994] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-4 h-4 text-[#C29D59]" />
                </div>
                <div>
                  <strong className="text-white font-serif font-bold block text-base">Banho de rio privativo e revigorante</strong>
                  <span className="text-zinc-300 text-sm font-light leading-relaxed block mt-0.5 max-w-[58ch]">Água límpida e fresca de nascente para mergulhar de mãos dadas ou brincar com seu pet nos dias de sol.</span>
                </div>
              </li>

              <li className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#0A140F]/80 border border-[#C29D59]/25 backdrop-blur-xl shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-[#C29D59]/15 border border-[#C29D59]/30 text-[#E6C994] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-4 h-4 text-[#C29D59]" />
                </div>
                <div>
                  <strong className="text-white font-serif font-bold block text-base">Decks de contemplação sob a sombra</strong>
                  <span className="text-zinc-300 text-sm font-light leading-relaxed block mt-0.5 max-w-[58ch]">Espreguiçadeiras sob a copa das árvores para ler sem pressa, ouvir os passarinhos e brindar com uma taça de vinho ao entardecer.</span>
                </div>
              </li>

              <li className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#0A140F]/80 border border-[#C29D59]/25 backdrop-blur-xl shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-[#C29D59]/15 border border-[#C29D59]/30 text-[#E6C994] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-4 h-4 text-[#C29D59]" />
                </div>
                <div>
                  <strong className="text-white font-serif font-bold block text-base">Piscinas naturais e remansos de água pura</strong>
                  <span className="text-zinc-300 text-sm font-light leading-relaxed block mt-0.5 max-w-[58ch]">Poços de pedra formados pela correnteza ideais para se refrescar com privacidade e tranquilidade.</span>
                </div>
              </li>
            </ul>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => openBooking()}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C29D59] hover:bg-[#D4AF67] active:bg-[#B8924E] text-[#050B07] font-bold text-sm shadow-[0_0_25px_rgba(194,157,89,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Garantir Chalé com Vista para a Natureza</span>
                <ArrowRight className="w-4 h-4 text-[#050B07] shrink-0" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
