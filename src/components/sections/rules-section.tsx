"use client";

import React from "react";
import Image from "next/image";
import {
  VolumeX,
  Heart,
  Waves,
  ShieldCheck,
  Clock,
  Baby,
  CigaretteOff,
  CreditCard,
  UserCheck,
} from "lucide-react";

export function RulesSection() {
  const sereneValues = [
    {
      icon: VolumeX,
      title: "Horário de Silêncio Sagrado",
      tag: "22:00 às 08:00",
      image: "/recanto/noite-silencio-chale.jpg",
      imagePosition: "object-[center_65%]",
      description:
        "Para garantir o descanso profundo e o sono restaurador de todos os casais e famílias, minimizamos qualquer ruído das 22h às 08h. Caixas de som não são permitidas nas áreas comuns nem nas varandas.",
    },
    {
      icon: CigaretteOff,
      title: "Ambiente Livre de Fumo",
      tag: "Ar Puro da Serra",
      image: "/recanto/chales-individuais-jardim.jpg",
      description:
        "Todas as nossas acomodações e espaços fechados são 100% não fumantes. Aqui o luxo é respirar o oxigênio puro da Mata Atlântica e o aroma acolhedor da natureza.",
    },
    {
      icon: Heart,
      title: "Mascotes & Convivência Pet",
      tag: "100% Bem-vindos",
      image: "/recanto/pet-fofo.jpg",
      description:
        "Aceitamos pets com carinho sincero. Solicitamos apenas o uso de guia nos caminhos sociais e o recolhimento dos resíduos para manter os gramados sempre impecáveis e seguros.",
    },
    {
      icon: Waves,
      title: "Preservação das Águas",
      tag: "Rio Mineral",
      image: "/recanto/rio-descanso-esteira.jpg",
      description:
        "O rio de nascente que cruza a pousada é um patrimônio vivo. Desfrute dos banhos com respeito à fauna local, sem deixar resíduos nem utilizar produtos poluentes nas pedras.",
    },
  ];

  const officialPolicies = [
    {
      icon: Clock,
      label: "Entrada & Saída",
      value: "Check-in: 14:00 às 20:00",
      subvalue: "Check-out: 08:00 às 12:00",
      badge: "Horários Oficiais",
    },
    {
      icon: Baby,
      label: "Estadia com Crianças",
      value: "Crianças de qualquer idade são bem-vindas",
      subvalue:
        "A partir de 5 anos pagam como adulto. Não há berços nem camas supletorias.",
      badge: "Famílias",
    },
    {
      icon: UserCheck,
      label: "Idade Mínima",
      value: "Check-in a partir de 18 anos",
      subvalue: "Menores acompanhados pelos pais ou responsáveis legais.",
      badge: "Documentação",
    },
    {
      icon: CigaretteOff,
      label: "Não Fumantes",
      value: "Proibido fumar nos chalés",
      subvalue:
        "Quartos 100% livres de fumo para preservar o frescor da serra.",
      badge: "100% Sem Fumo",
    },
    {
      icon: Heart,
      label: "Pets & Mascotes",
      value: "Animais são bem-vindos",
      subvalue:
        "Podem se aplicar taxas/suplementos para higienização especial.",
      badge: "Pet Friendly",
    },
    {
      icon: CreditCard,
      label: "Formas de Pagamento",
      value: "Pix Instantâneo (Tarifa Direta)",
      subvalue:
        "Cartões: Visa, MasterCard, Elo, Hipercard, Amex, Diners e Dinheiro.",
      badge: "Flexível & Seguro",
    },
  ];

  return (
    <section
      id="regras"
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[960px] h-[960px] bg-[radial-gradient(circle,rgba(194,157,89,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-[#C29D59]/40 text-[#E6C994] text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-xs">
            <span>Pacto de Serenidade & Normas Oficiais</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Transparência total para uma estadia de{" "}
            <span className="italic font-normal text-[#E6C994]">
              paz absoluta.
            </span>
          </h2>

          <p className="text-zinc-300 text-[15px] sm:text-lg font-light leading-relaxed max-w-[60ch] mx-auto">
            Diretrizes acolhedoras e normas oficiais que garantem harmonia, respeito à intimidade dos casais e preservação da natureza no Sana.
          </p>
        </div>

        {/* 4 Serene Value Cards with Visual Imagery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {sereneValues.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <div
                key={idx}
                className="rounded-[2rem] sm:rounded-[2.2rem] bg-gradient-to-b from-[#0A140F]/85 via-[#0A140F]/75 to-[#050B07]/85 border border-[#C29D59]/30 hover:border-[#C29D59]/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_rgba(194,157,89,0.2)] hover:-translate-y-1 transition-all duration-400 flex flex-col justify-between backdrop-blur-xl text-left overflow-hidden group"
              >
                {/* Photo Frame on top */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-black/40">
                  <Image
                    src={rule.image}
                    alt={rule.title}
                    fill
                    className={`object-cover ${rule.imagePosition || "object-center"} group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A140F] via-black/25 to-black/35" />

                  {/* Floating Tag over image */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#E6C994] shadow-sm">
                      <Icon className="w-4 h-4 text-[#C29D59]" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-[#E6C994] border border-[#C29D59]/40 shadow-xs uppercase tracking-wider">
                      {rule.tag}
                    </span>
                  </div>
                </div>

                {/* Content below */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-white group-hover:text-[#E6C994] transition-colors mb-2 leading-snug">
                      {rule.title}
                    </h3>
                    <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
                      {rule.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Booking.com Policy Bento Grid */}
        <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-[#0A140F]/90 via-[#0A140F]/85 to-[#050B07]/90 border border-[#C29D59]/35 p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 text-left">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-[#C29D59]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Normas Oficiais de Hospedagem
                </h3>
              </div>
              <p className="text-sm text-zinc-300 font-light">
                Políticas registradas e verificadas no Booking.com para sua total segurança e planejamento.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1B3B2B] text-[#E6C994] border border-[#C29D59]/40 shadow-sm self-start sm:self-center">
              Políticas Oficiais Verificadas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left">
            {officialPolicies.map((pol, i) => {
              const Icon = pol.icon;
              return (
                <div
                  key={i}
                  className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/10 shadow-xs hover:border-[#C29D59]/40 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#C29D59]/15 flex items-center justify-center text-[#E6C994] shrink-0">
                        <Icon className="w-4 h-4 text-[#C29D59]" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E6C994]">
                        {pol.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider shrink-0">
                      {pol.badge}
                    </span>
                  </div>

                  <div>
                    <p className="font-semibold text-sm sm:text-base text-white">
                      {pol.value}
                    </p>
                    <p className="text-sm text-zinc-300 font-light mt-1 leading-relaxed">
                      {pol.subvalue}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
