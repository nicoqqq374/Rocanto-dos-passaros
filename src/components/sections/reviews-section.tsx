"use client";

import React, { useState, useRef } from "react";
import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

export function ReviewsSection() {
  const [filter, setFilter] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setActiveIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.85));
      setActiveIndex(Math.min(Math.max(index, 0), filteredReviews.length - 1));
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth * 0.85;
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth * 0.85;
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const BOOKING_REVIEWS_URL =
    "https://www.booking.com/hotel/br/suites-recanto-sana-macae.es.html";

  const reviews = [
    {
      id: "1",
      name: "Marcelo e Larissa",
      date: "Avaliação no Booking.com · Nota 10",
      rating: 5,
      category: "casal",
      room: "Chalet de 1 Dormitório",
      badge: "Casal Verificado",
      comment:
        "Passamos um final de semana inesquecível. O som do rio ao fundo traz uma paz que a gente não encontra em lugar nenhum. O café da manhã é espetacular, cheio de quitutes caseiros e muito carinho. O chalé é espaçoso, limpo e super acolhedor.",
      highlight: "Silêncio absoluto e o som do rio nos fundos",
    },
    {
      id: "2",
      name: "Camila R. & Pipoca",
      date: "Avaliação no Booking.com · Nota 10",
      rating: 5,
      category: "pet",
      room: "Chalé com Varanda",
      badge: "Viajou com Pet",
      comment:
        "A melhor experiência pet friendly que já tivemos na serra! O Pipoca correu no gramado, nadou no rio cristalino da pousada e foi tratado como um hóspede de honra por toda a equipe. Viajar sem culpa e com essa estrutura não tem preço.",
      highlight: "O pet nadou no rio e amou o gramado",
    },
    {
      id: "3",
      name: "Eduardo F.",
      date: "Avaliação no Booking.com · Nota 10",
      rating: 5,
      category: "relax",
      room: "Suíte Casal Master",
      badge: "Viagem de Descanso",
      comment:
        "Lugar perfeito para desacelerar da correria do Rio. A pousada tem um rio com piscinas naturais dentro do terreno que parece um pedacinho exclusivo do paraíso. Cama confortável, água quentinha no banho e atendimento impecável.",
      highlight: "Piscina natural privativa dentro da pousada",
    },
    {
      id: "4",
      name: "Juliana & Roberto",
      date: "Avaliação no Booking.com · Nota 9.5",
      rating: 5,
      category: "casal",
      room: "Chalet de 1 Dormitório",
      badge: "Casal Verificado",
      comment:
        "Voltamos renovados! O café da manhã servido com calma, o visual das montanhas da serra e a rede na varanda para ler ouvindo os pássaros. Com certeza virou nosso refúgio oficial no Sana.",
      highlight: "Café da roça caprichado e rede com vista",
    },
    {
      id: "5",
      name: "Patrícia M.",
      date: "Avaliação no Booking.com · Nota 10",
      rating: 5,
      category: "pet",
      room: "Chalé Família & Pet",
      badge: "Hóspede Frequente",
      comment:
        "Tudo impecável. Os anfitriões são atenciosos demais e nos fizeram sentir em casa desde o primeiro minuto. Muito verde, segurança total para os pets e tranquilidade absoluta à noite.",
      highlight: "Acolhimento caloroso e segurança para pets",
    },
    {
      id: "6",
      name: "Thiago & Amanda",
      date: "Avaliação no Booking.com · Nota 10",
      rating: 5,
      category: "relax",
      room: "Chalet de 1 Dormitório",
      badge: "Escapada de Fim de Semana",
      comment:
        "Nota 10 com louvor! O Sana é mágico, mas ter o rio correndo no quintal da pousada elevou a viagem a outro patamar. Dormir com a brisa da serra e acordar com cheirinho de bolo quentinho é maravilhoso.",
      highlight: "Desconexão total e sono restaurador",
    },
  ];

  const filteredReviews =
    filter === "all" ? reviews : reviews.filter((r) => r.category === filter);

  return (
    <section
      id="avaliacoes"
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden"
    >
      {/* Warm ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[880px] h-[880px] bg-[radial-gradient(circle,rgba(194,157,89,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C29D59]/40 text-[#E6C994] text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4 shadow-sm backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-[#C29D59] text-[#C29D59]" />
            <span>Nota 9.1 Fantástica no Booking.com (+400 avaliações)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Histórias reais de quem{" "}
            <span className="italic font-normal text-[#E6C994]">viveu o Recanto</span>
          </h2>
          <p className="mt-3 text-zinc-300 text-[15px] sm:text-base font-light leading-relaxed max-w-[58ch] mx-auto">
            Mais de 400 avaliações de casais e famílias que encontraram descanso verdadeiro, café acolhedor e a melodia do rio no Sana.
          </p>
        </div>

        {/* Booking.com Official Verification Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-[#0A140F]/90 via-[#0A140F]/80 to-[#050B07]/90 border border-[#C29D59]/35 max-w-4xl mx-auto mb-10 sm:mb-14 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="flex items-center gap-5 sm:gap-6 text-center sm:text-left flex-col sm:flex-row">
            {/* Booking Score Boxes */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#003580] text-white flex flex-col items-center justify-center shrink-0 shadow-lg p-2 border border-white/20">
                <span className="text-2xl sm:text-3xl font-extrabold leading-none">
                  9.1
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider mt-1">
                  Fantástica
                </span>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1B3B2B] text-white flex flex-col items-center justify-center shrink-0 shadow-lg p-2 border border-[#C29D59]/40">
                <span className="text-2xl sm:text-3xl font-extrabold leading-none text-[#E6C994]">
                  9.4
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider mt-1 text-center">
                  Para Casais
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Booking.com
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1B3B2B]/60 text-[#E6C994] border border-[#C29D59]/30 font-bold">
                  Avaliações Verificadas
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-900/40 text-amber-200 border border-amber-600/40 font-bold">
                  Café Excepcional
                </span>
              </div>
              <p className="text-[#E6C994] font-medium text-sm mt-1">
                &ldquo;Aos casais encanta a localização — Avaliação 9,4 para viagens a dois.&rdquo;
              </p>
              <p className="text-zinc-300 text-xs mt-0.5 font-light">
                Piscina com borda infinita • Café Buffet/Continental • Estacionamento privativo grátis • Wi-Fi • Bilhar & Ping-Pong
              </p>
            </div>
          </div>

          <a
            href={BOOKING_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C29D59] hover:bg-[#D4AF67] text-[#050B07] text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 shrink-0"
          >
            <span>Ver no Booking</span>
            <ExternalLink className="w-4 h-4 text-[#050B07]" />
          </a>
        </div>

        {/* Category Filters — 44px minimum touch height */}
        <div className="flex items-center justify-start sm:justify-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: "all", label: "Todas as Avaliações" },
            { id: "casal", label: "Casais a Dois" },
            { id: "pet", label: "Com Pets" },
            { id: "relax", label: "Descanso & Rio" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleFilterChange(tab.id)}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                filter === tab.id
                  ? "bg-[#C29D59] text-[#050B07] font-bold shadow-lg shadow-[#C29D59]/20"
                  : "bg-[#0A140F]/80 text-zinc-300 hover:text-white border border-[#C29D59]/25 hover:border-[#C29D59]/60 backdrop-blur-md"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Carousel / Grid of Reviews */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="w-[86vw] max-w-[360px] sm:w-[360px] md:w-auto md:max-w-none shrink-0 snap-center rounded-[2rem] sm:rounded-[2.2rem] bg-gradient-to-b from-[#0A140F]/90 via-[#0A140F]/80 to-[#050B07]/90 border border-[#C29D59]/30 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_rgba(194,157,89,0.18)] hover:border-[#C29D59]/60 hover:-translate-y-1 transition-all duration-400 flex flex-col justify-between backdrop-blur-xl text-left"
            >
              <div>
                {/* Rating stars & badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#C29D59] text-[#C29D59]"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1B3B2B]/60 text-[#E6C994] border border-[#C29D59]/30">
                    {rev.badge}
                  </span>
                </div>

                {/* Highlight */}
                <div className="mb-3 px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm font-serif italic text-[#E6C994]">
                  &ldquo;{rev.highlight}&rdquo;
                </div>

                {/* Comment body */}
                <p className="text-zinc-300 text-sm sm:text-[15px] font-light leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-2">
                <div>
                  <span className="font-serif font-bold text-sm sm:text-base text-white block">
                    {rev.name}
                  </span>
                  <span className="text-xs text-zinc-400 font-light block">
                    {rev.date}
                  </span>
                </div>
                <span className="text-[11px] text-[#E6C994] font-bold text-right">
                  {rev.room}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel Controls */}
        <div className="flex md:hidden items-center justify-between mt-4 px-1">
          <span className="text-xs text-zinc-300 font-medium">
            Avaliação {activeIndex + 1} de {filteredReviews.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Avaliação anterior"
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#0A140F]/85 border border-[#C29D59]/40 flex items-center justify-center text-[#E6C994] hover:bg-[#C29D59] hover:text-[#050B07] active:scale-95 shadow-md cursor-pointer transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Próxima avaliação"
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#0A140F]/85 border border-[#C29D59]/40 flex items-center justify-center text-[#E6C994] hover:bg-[#C29D59] hover:text-[#050B07] active:scale-95 shadow-md cursor-pointer transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
