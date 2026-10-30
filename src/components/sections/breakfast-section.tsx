"use client";

import React from "react";
import Image from "next/image";
import { Coffee } from "lucide-react";
import { motion } from "framer-motion";

export function BreakfastSection() {
  const highlights = [
    {
      title: "Café Excepcional",
      desc: "Classificado como excepcional pelos hóspedes no Booking: buffet completo e opções continentais com ingredientes frescos da roça.",
    },
    {
      title: "Sem Despertador",
      desc: "Servido com calma até mais tarde para você poder acordar no ritmo natural do seu corpo sem nenhuma pressa.",
    },
    {
      title: "Fornadas da Roça",
      desc: "Bolos caseiros de fubá, cenoura com chocolate e milho saindo quentinhos do forno todas as manhãs.",
    },
    {
      title: "Sabor da Serra",
      desc: "Pães artesanais, queijos curados da região, frutas frescas e aquele café no bule coado acolhendo sua manhã ao som das águas.",
    },
  ];

  return (
    <section id="cafe" className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Text & Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C29D59]/40 text-[#E6C994] text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs">
                <Coffee className="w-3.5 h-3.5 text-[#C29D59]" />
                <span>Café Excepcional no Booking</span>
              </div>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#C29D59]/20 text-[#E6C994] border border-[#C29D59]/40">
                Buffet & Continental Incluso
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              O despertar com o perfume acolhedor do{" "}
              <span className="italic font-normal text-[#E6C994]">café da roça.</span>
            </h2>

            <p className="text-zinc-300 text-[15px] sm:text-lg font-light leading-relaxed max-w-[60ch]">
              Acreditamos que a melhor parte de viajar a dois é acordar sem hora marcada. Nosso café colonial é um ritual de acolhimento: uma mesa farta e colorida com receitas caseiras de família, bolos quentinhos que perfumam o ambiente e o privilégio de comer com calma ouvindo o canto dos passarinhos da serra.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-gradient-to-b from-[#0A140F]/90 to-[#050B07]/90 border border-[#C29D59]/30 shadow-xl hover:border-[#C29D59]/60 transition-all backdrop-blur-xl"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-white block mb-1.5">
                    {h.title}
                  </span>
                  <span className="text-sm text-zinc-300 font-light leading-relaxed block">
                    {h.desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: High-Res Mouthwatering Photography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden aspect-[4/3] sm:aspect-[4/5] min-h-[420px] sm:min-h-[520px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-2 border-white/20 group bg-black/40">
              <Image
                src="/recanto/cafe-roca-buffet.jpg"
                alt="Buffet completo de café da manhã colonial na Pousada Recanto dos Pássaros no Sana"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E6C994] block mb-1">
                  Mesa Farta & Afeto
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold drop-shadow-sm">
                  Comece o dia sem pressa e com os sabores da serra
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
