import React from "react";
import Link from "next/link";
import { Compass, MessageCircle, ArrowLeft, Home, Sparkles, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página Não Encontrada | Pousada Recanto dos Pássaros",
  description: "A página solicitada não foi encontrada. Retorne ao site oficial da Pousada Recanto dos Pássaros.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#14221A] flex flex-col justify-between overflow-hidden selection:bg-[#1B3B2B] selection:text-white">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#C29D59]/10 rounded-full blur-[170px]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-2xl bg-[#1B3B2B] flex items-center justify-center text-white font-serif font-bold text-xl shadow-md border border-[#C29D59]/30">
            R
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-tight text-[#14221A] block leading-none">
              Recanto dos Pássaros
            </span>
            <span className="text-[10px] text-[#C29D59] uppercase tracking-widest font-semibold block mt-1">
              Pousada & Chalés • Sana RJ
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#F3EEE6] border border-[#14221A]/10 text-xs font-semibold text-[#14221A] transition-all shadow-sm"
        >
          <Home className="w-3.5 h-3.5 text-[#1B3B2B]" />
          <span>Início</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 py-12 text-center my-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3B2B]/8 text-[#1B3B2B] text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
          <Compass className="w-4 h-4 text-[#C29D59]" />
          <span>404 • Desvio na Trilha</span>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#14221A] leading-tight">
          Esta trilha não levou a <span className="italic font-normal text-[#1B3B2B]">lugar nenhum</span>
        </h1>

        <p className="mt-4 text-[#536459] text-sm sm:text-base font-light leading-relaxed max-w-lg mx-auto">
          O endereço que você tentou acessar não existe ou foi alterado. Mas o rio de águas límpidas, o café da roça e o sossego da montanha continuam esperando por você.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1B3B2B] hover:bg-[#142E20] text-white font-semibold text-sm transition-all shadow-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Página Principal</span>
          </Link>

          <a
            href="https://wa.me/5522981054265?text=Ol%C3%A1%2C%20estava%20navegando%20no%20site%20da%20Pousada%20Recanto%20dos%20P%C3%A1ssaros%20e%20preciso%20de%20ajuda."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F3EEE6] border border-[#14221A]/10 text-[#14221A] font-semibold text-sm transition-all shadow-sm active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-[#1B3B2B]" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Quick Links Navigation */}
        <div className="mt-12 pt-8 border-t border-[#14221A]/8">
          <span className="text-xs uppercase tracking-wider text-[#536459] font-medium block mb-3">
            Destinos procurados no Recanto dos Pássaros:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: "Chalés & Redes", href: "/#chales" },
              { label: "O Rio & Piscinas", href: "/#rio" },
              { label: "Café Colonial", href: "/#cafe" },
              { label: "Pet Friendly", href: "/#pet-friendly" },
              { label: "Galeria de Fotos", href: "/#galeria" },
              { label: "Como Chegar", href: "/#localizacao" },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F3EEE6] border border-[#14221A]/8 text-xs text-[#536459] hover:text-[#14221A] transition-all shadow-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-[#536459] border-t border-[#14221A]/8">
        <span>Pousada Recanto dos Pássaros • Estrada Principal do Sana, s/n (Boa Sorte) • Sana, Macaé - RJ</span>
      </footer>
    </div>
  );
}
