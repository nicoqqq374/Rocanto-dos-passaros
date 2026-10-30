"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Waves, Coffee, Heart, SunMedium, Trees, Check } from "lucide-react";
import { motion } from "framer-motion";

export function ExperienceSection() {
  const [activeMobileCard, setActiveMobileCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.86));
      setActiveMobileCard(index);
    }
  };

  return (
    <section id="rio-e-lazer" className="relative pt-6 sm:pt-14 pb-14 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Ambient Lighting Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm"
          >
            <span>A Vida no Recanto dos Pássaros</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Onde o tempo desacelera e a <span className="italic text-emerald-400">natureza abraça</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-zinc-300 text-sm sm:text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            Um refúgio desenhado para quem valoriza silêncio de verdade, águas correntes, café quentinho na mesa e momentos leves ao lado de quem ama — incluindo seu pet.
          </motion.p>
        </div>

        {/* Bento Grid Experience (Desktop) / Touch Slider (Mobile) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-12 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {/* Card 1: HERO BENTO (Col 1-7, Row 1-2) — O Rio Privado */}
          <div className="w-[88vw] sm:w-[420px] md:w-auto shrink-0 snap-center md:col-span-7 md:row-span-2 relative rounded-3xl overflow-hidden bg-zinc-900/60 border border-white/12 hover:border-emerald-400/40 p-6 sm:p-9 backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(16,185,129,0.2)] flex flex-col justify-between group min-h-[400px] sm:min-h-[480px]">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/recanto/rio-privado.jpg"
                alt="Rio de águas cristalinas na Pousada Recanto dos Pássaros no Sana"
                fill
                className="object-cover object-center filter brightness-[0.6] group-hover:scale-105 group-hover:brightness-[0.7] transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/80 text-zinc-950 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5" />
                Diferencial Exclusivo
              </span>
            </div>

            <div className="relative z-10 space-y-3">
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Rio Cristalino no Quintal & Piscinas Naturais
              </h3>
              <p className="text-zinc-200 text-xs sm:text-sm font-light leading-relaxed">
                Águas limpas que nascem nas nascentes da serra e cortam nossa propriedade. Desfrute de um banho revigorante a qualquer hora do dia sem precisar sair da pousada.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-black/40 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <Check className="w-3 h-3" /> Acesso direto e privativo
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-black/40 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <Check className="w-3 h-3" /> Água limpa de nascente
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: (Col 8-12) — Café da Manhã */}
          <div id="cafe" className="w-[88vw] sm:w-[420px] md:w-auto shrink-0 snap-center md:col-span-5 relative rounded-3xl overflow-hidden bg-zinc-900/60 border border-white/12 hover:border-amber-400/40 p-6 sm:p-7 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl flex flex-col justify-between group min-h-[260px]">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/recanto/cafe-manha.jpg"
                alt="Café da manhã farto colonial na Pousada Recanto dos Pássaros"
                fill
                className="object-cover object-center filter brightness-[0.55] group-hover:scale-105 group-hover:brightness-[0.65] transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-zinc-950 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5" />
                Incluso na Diária
              </span>
            </div>

            <div className="relative z-10 space-y-2 mt-16 sm:mt-20">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Café da Roça Artesanal & Farto
              </h3>
              <p className="text-zinc-200 text-xs sm:text-sm font-light leading-relaxed">
                Bolos artesanais saídos do forno, pães caseiros, frutas da estação, geleias e café coado com vista para a mata. Um amanhecer sem pressa.
              </p>
            </div>
          </div>

          {/* Card 3: (Col 8-12) — Pet Friendly */}
          <div id="pet-friendly" className="w-[88vw] sm:w-[420px] md:w-auto shrink-0 snap-center md:col-span-5 relative rounded-3xl overflow-hidden bg-zinc-900/60 border border-white/12 hover:border-emerald-400/40 p-6 sm:p-7 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl flex flex-col justify-between group min-h-[260px]">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/recanto/pet-friendly.jpg"
                alt="Hospedagem Pet Friendly na Pousada Recanto dos Pássaros"
                fill
                className="object-cover object-center filter brightness-[0.55] group-hover:scale-105 group-hover:brightness-[0.65] transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-zinc-950 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                100% Pet Friendly
              </span>
            </div>

            <div className="relative z-10 space-y-2 mt-16 sm:mt-20">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Seu Pet é Nosso Hóspede de Honra
              </h3>
              <p className="text-zinc-200 text-xs sm:text-sm font-light leading-relaxed">
                Aqui você não precisa deixar seu companheiro para trás. Gramados amplos para passear, rio rasinho para brincar e acolhimento afetuoso de verdade.
              </p>
            </div>
          </div>

          {/* Card 4: (Col 1-6) — Chalés & Redes */}
          <div className="w-[88vw] sm:w-[420px] md:w-auto shrink-0 snap-center md:col-span-6 relative rounded-3xl overflow-hidden bg-zinc-900/60 border border-white/12 hover:border-emerald-400/40 p-6 sm:p-8 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl flex flex-col justify-between group min-h-[280px]">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/recanto/casal-rede.jpg"
                alt="Varanda com rede e vista para as montanhas"
                fill
                className="object-cover object-center filter brightness-[0.55] group-hover:scale-105 group-hover:brightness-[0.65] transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/20">
                Conforto & Intimidade
              </span>
            </div>

            <div className="relative z-10 space-y-2 mt-20">
              <h3 className="font-serif text-2xl font-bold text-white">
                Varandas Privativas com Rede de Descanso
              </h3>
              <p className="text-zinc-200 text-xs sm:text-sm font-light leading-relaxed">
                Cada chalé oferece seu próprio cantinho para deitar na rede, ler um livro ou simplesmente fechar os olhos escutando o canto das dezenas de pássaros nativos.
              </p>
            </div>
          </div>

          {/* Card 5: (Col 7-12) — Piscina Panorâmica */}
          <div className="w-[88vw] sm:w-[420px] md:w-auto shrink-0 snap-center md:col-span-6 relative rounded-3xl overflow-hidden bg-zinc-900/60 border border-white/12 hover:border-emerald-400/40 p-6 sm:p-8 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl flex flex-col justify-between group min-h-[280px]">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/recanto/piscina-serra.jpg"
                alt="Piscina com vista panorâmica para as montanhas de Sana"
                fill
                className="object-cover object-center filter brightness-[0.55] group-hover:scale-105 group-hover:brightness-[0.65] transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/20">
                Sol & Montanha
              </span>
            </div>

            <div className="relative z-10 space-y-2 mt-20">
              <h3 className="font-serif text-2xl font-bold text-white">
                Piscina Panorâmica com Sol o Dia Todo
              </h3>
              <p className="text-zinc-200 text-xs sm:text-sm font-light leading-relaxed">
                Espaço perfeito com espreguiçadeiras e vista deslumbrante para o horizonte verde do Sana. Para renovar as energias entre um mergulho no rio e um cochilo na sombra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
