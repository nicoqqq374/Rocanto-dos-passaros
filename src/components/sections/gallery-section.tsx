"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Camera,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface GalleryItem {
  id: number;
  category: string;
  src: string;
  alt: string;
  caption: string;
  tag: string;
  description: string;
}

export function GallerySection() {
  const [filter, setFilter] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const galleryImages: GalleryItem[] = [
    {
      id: 1,
      category: "natureza",
      src: "/recanto/piscina-natural-rio.jpg",
      alt: "Piscina natural com cascata e deck de madeira na Pousada Recanto dos Pássaros no Sana",
      caption: "Piscina Natural & Cascata",
      tag: "Água Pura",
      description:
        "Águas límpidas e cristalinas que formam uma piscina natural perfeita para banhos e relaxamento.",
    },
    {
      id: 2,
      category: "chales",
      src: "/recanto/hero-pousada-real.jpg",
      alt: "Área externa com quiosque, gramado e chalés na Pousada Recanto dos Pássaros no Sana",
      caption: "Jardins, Quiosque & Chalés",
      tag: "Natureza & Paz",
      description:
        "Espaço ao ar livre com quiosque para descanso, gramado e vista privilegiada para as montanhas.",
    },
    {
      id: 3,
      category: "experiencia",
      src: "/recanto/cafe-roca-buffet.jpg",
      alt: "Buffet farto de café da manhã colonial com quitutes da serra na Pousada Recanto dos Pássaros no Sana",
      caption: "Buffet Colonial da Roça",
      tag: "Incluso na Diária",
      description:
        "Desjejum colonial feito com carinho todos os dias: aipim quentinho, ovos mexidos, bolos, pão de queijo e café coado.",
    },
    {
      id: 4,
      category: "natureza",
      src: "/recanto/deck-solario-rio.jpg",
      alt: "Deck de madeira com espreguiçadeiras e guarda-sol à beira do rio na Pousada Recanto dos Pássaros no Sana",
      caption: "Deck Ensolarado & Solário no Rio",
      tag: "Sol & Rio",
      description:
        "Espaço para banho de sol e relaxamento debruçado sobre as águas calmas e cristalinas do rio.",
    },
    {
      id: 5,
      category: "experiencia",
      src: "/recanto/pet-friendly.jpg",
      alt: "Cães felizes brincando e descansando na natureza da pousada",
      caption: "100% Pet Friendly com Amor",
      tag: "Pets Bem-Vindos",
      description:
        "Aqui o seu pet é família. Muito espaço seguro para correr, farejar e brincar à vontade.",
    },
    {
      id: 6,
      category: "chales",
      src: "/recanto/chales-individuais-jardim.jpg",
      alt: "Chalés individuais com varanda e gramado privativo no Sana",
      caption: "Chalés Individuais e Privativos",
      tag: "Privacidade",
      description:
        "Chalés afastados uns dos outros, garantindo silêncio, privacidade e contato direto com a natureza.",
    },
    {
      id: 7,
      category: "chales",
      src: "/recanto/quarto-chale.jpg",
      alt: "Interior aconchegante do chalé com cama confortável e iluminação acolhedora",
      caption: "Interiores Aconchegantes",
      tag: "Descanso Pleno",
      description:
        "Roupas de cama limpas e cheirosas, ar-condicionado, frigobar e banho quente relaxante.",
    },
    {
      id: 8,
      category: "natureza",
      src: "/recanto/rio-descanso-esteira.jpg",
      alt: "Esteira com almofadas à beira do rio cristalino na Pousada Recanto dos Pássaros no Sana",
      caption: "Recanto Zen à Beira do Rio",
      tag: "Relaxamento",
      description:
        "Espaço zen com esteira e almofadas no gramado à beira d'água para relaxar ao som da correnteza.",
    },
    {
      id: 9,
      category: "experiencia",
      src: "/recanto/sinuca-jogos.jpg",
      alt: "Mesa de sinuca na varanda com vista para o jardim na Pousada Recanto dos Pássaros no Sana",
      caption: "Espaço de Lazer & Sinuca",
      tag: "Diversão & Jogos",
      description:
        "Mesa de bilhar na varanda arejada com vista panorâmica para o gramado e os chalés.",
    },
    {
      id: 10,
      category: "natureza",
      src: "/recanto/dayuse-quiosque-redes.jpg",
      alt: "Quiosque com cortinas brancas, gramado e redes no Recanto dos Pássaros no Sana",
      caption: "Quiosque Zen & Redes de Descanso",
      tag: "Day Use & Paz",
      description:
        "Espaço de contemplação ao ar livre com quiosque colonial, cortinas ao vento e redes para descanso pleno.",
    },
    {
      id: 11,
      category: "experiencia",
      src: "/recanto/bar-drinks-rio.jpg",
      alt: "Petiscos, frutas e drinks à beira do rio cristalino na Pousada Recanto dos Pássaros no Sana",
      caption: "Drinks & Petiscos à Beira do Rio",
      tag: "Sabor & Natureza",
      description:
        "Bebidas geladas, aperitivos artesanais e frutas frescas servidas à beira das águas correntes da pousada.",
    },
    {
      id: 12,
      category: "chales",
      src: "/recanto/estacionamento-chalets.jpg",
      alt: "Alameda de chalés com estacionamento amplo e arborizado na Pousada Recanto dos Pássaros no Sana",
      caption: "Alameda dos Chalés & Estacionamento",
      tag: "Acesso Fácil",
      description:
        "Amplo espaço plano com estacionamento privativo em frente aos chalés sob frondosas árvores nativas.",
    },
    {
      id: 13,
      category: "natureza",
      src: "/recanto/parquinho-infantil.jpg",
      alt: "Parquinho infantil com balanços e cama elástica no gramado cercado de verde na Pousada Recanto dos Pássaros no Sana",
      caption: "Parquinho Infantil & Lazer Kids",
      tag: "Família & Crianças",
      description:
        "Balanço de madeira com flores, cama elástica e gramado plano rodeado por árvores centenárias.",
    },
    {
      id: 14,
      category: "natureza",
      src: "/recanto/trilhas-cavalgadas-sana.jpg",
      alt: "Passeio a cavalo pelas trilhas da Mata Atlântica no distrito do Sana Macaé RJ",
      caption: "Cavalgadas & Ecoturismo",
      tag: "Trilhas do Sana",
      description:
        "Passeios a cavalo pelas trilhas da Mata Atlântica conectando você com a natureza intocada da serra.",
    },
    {
      id: 15,
      category: "experiencia",
      src: "/recanto/pet-love-jardim.jpg",
      alt: "Cantinho pet com almofada e letreiro LOVE no gramado da Pousada Recanto dos Pássaros no Sana",
      caption: "Cantinho Pet VIP com Amor",
      tag: "Pets Bem-Vindos",
      description:
        "Seu melhor amigo descansando com todo o carinho e conforto no jardim da pousada.",
    },
  ];

  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((item) => item.category === filter);

  const filterPills = [
    { id: "all", label: "Todas as Fotos" },
    { id: "chales", label: "Chalés & Redes" },
    { id: "natureza", label: "Rio & Piscina" },
    { id: "experiencia", label: "Café & Pets" },
  ];

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setActiveIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollLeft = container.scrollLeft;
      const cards = Array.from(container.children) as HTMLElement[];
      let closestIdx = 0;
      let minDiff = Infinity;
      cards.forEach((card, i) => {
        const diff = Math.abs(card.offsetLeft - container.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      });
      setActiveIndex(closestIdx);
    }
  };

  const scrollToIndex = (idx: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cards = Array.from(container.children) as HTMLElement[];
      if (cards[idx]) {
        const card = cards[idx];
        const scrollOffset = card.offsetLeft - container.offsetLeft;
        container.scrollTo({
          left: scrollOffset,
          behavior: "smooth",
        });
        setActiveIndex(idx);
      }
    }
  };

  const scrollPrev = () => {
    scrollToIndex(Math.max(0, activeIndex - 1));
  };

  const scrollNext = () => {
    scrollToIndex(Math.min(filteredImages.length - 1, activeIndex + 1));
  };

  useEffect(() => {
    if (lightboxIndex !== null) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1
          );
        }
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) =>
            prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0
          );
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [lightboxIndex, filteredImages.length]);

  return (
    <section
      id="galeria"
      className="relative pt-16 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C29D59]/40 text-[#E6C994] text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4 shadow-sm backdrop-blur-md">
            <Camera className="w-3.5 h-3.5 text-[#C29D59]" />
            <span>Galeria de Imagens</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Momentos reais da <span className="italic font-normal text-[#E6C994]">vida no refúgio</span>
          </h2>

          <p className="mt-3 text-zinc-300 text-[15px] sm:text-base font-light leading-relaxed max-w-[58ch] mx-auto">
            Do rio cristalino no quintal ao café da manhã quentinho na varanda. Deslize para vivenciar o descanso na Pousada Recanto dos Pássaros.
          </p>
        </div>

        {/* Filter Pills — Minimum 44px touch height */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {filterPills.map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => handleFilterChange(pill.id)}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-95 ${
                filter === pill.id
                  ? "bg-[#C29D59] text-[#050B07] shadow-lg shadow-[#C29D59]/20 font-bold"
                  : "bg-[#0A140F]/80 text-zinc-300 hover:text-white border border-[#C29D59]/25 hover:border-[#C29D59]/60 backdrop-blur-md"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Visual Gallery Carousel */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {filteredImages.map((img, idx) => (
            <article
              key={img.id}
              role="button"
              tabIndex={0}
              aria-label={`Ampliar foto: ${img.caption}`}
              onClick={() => setLightboxIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxIndex(idx);
                }
              }}
              className="relative w-[84vw] max-w-[340px] sm:w-[380px] lg:w-[420px] h-[440px] sm:h-[500px] lg:h-[540px] shrink-0 rounded-[2rem] sm:rounded-[2.2rem] overflow-hidden cursor-pointer group border border-[#C29D59]/30 bg-[#0A140F] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_50px_rgba(194,157,89,0.2)] hover:border-[#C29D59]/60 active:scale-[0.99] snap-center select-none flex flex-col justify-between p-6 sm:p-7"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 380px, 420px"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.85] group-hover:brightness-95"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

              {/* Card Top: Numbering + Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#E6C994] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {String(idx + 1).padStart(2, "0")} /{" "}
                  {String(filteredImages.length).padStart(2, "0")}
                </span>

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#0A140F]/90 backdrop-blur-md text-[11px] font-bold text-[#E6C994] border border-[#C29D59]/40 shadow-sm uppercase tracking-wider">
                  <span>{img.tag}</span>
                </span>
              </div>

              {/* Card Bottom */}
              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-end justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-serif text-lg sm:text-2xl font-bold text-white group-hover:text-[#E6C994] transition-colors leading-snug">
                      {img.caption}
                    </h3>
                    <p className="text-zinc-300 text-sm font-light leading-relaxed line-clamp-2 mt-1">
                      {img.description}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-full bg-white/20 group-hover:bg-[#C29D59] text-white group-hover:text-[#050B07] backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Navigation Controller — Ergonomic 44x44px buttons */}
        <div className="flex items-center justify-between mt-6 px-1 pt-1 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-medium">
            <span className="font-mono font-bold text-[#E6C994] bg-[#0A140F]/90 px-2.5 py-1 rounded-full border border-[#C29D59]/30">
              {String(activeIndex + 1).padStart(2, "0")} / {String(filteredImages.length).padStart(2, "0")}
            </span>
            <span className="hidden sm:inline">Deslize ou use as setas para explorar</span>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            {filteredImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                className="p-2 cursor-pointer flex items-center justify-center"
                aria-label={`Ver foto ${i + 1}`}
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "w-6 bg-[#C29D59]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={activeIndex === 0}
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#0A140F]/85 border border-[#C29D59]/40 flex items-center justify-center text-[#E6C994] hover:bg-[#C29D59] hover:text-[#050B07] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all cursor-pointer shadow-md"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={activeIndex === filteredImages.length - 1}
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#0A140F]/85 border border-[#C29D59]/40 flex items-center justify-center text-[#E6C994] hover:bg-[#C29D59] hover:text-[#050B07] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all cursor-pointer shadow-md"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {mounted &&
        lightboxIndex !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Visualizador de fotos em tela cheia"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 overflow-hidden overscroll-contain"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90dvh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-[#C29D59] flex items-center justify-center transition-all cursor-pointer active:scale-95 self-end mb-3"
                aria-label="Fechar galeria"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full h-[58dvh] sm:h-[72dvh] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="mt-4 text-center text-white px-2">
                <span className="text-xs font-bold text-[#C29D59] uppercase tracking-wider block mb-1">
                  {filteredImages[lightboxIndex].tag}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold">
                  {filteredImages[lightboxIndex].caption}
                </h4>
                <p className="text-zinc-300 text-sm mt-1 max-w-[55ch] mx-auto font-light">
                  {filteredImages[lightboxIndex].description}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1
                  )
                }
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-black/70 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-black/70 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
