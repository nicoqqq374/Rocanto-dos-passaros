"use client";

import React, { useState, useRef } from "react";
import {
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  tag: string;
}

export function FaqSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const carouselRef = useRef<HTMLDivElement>(null);

  const faqs: FAQItem[] = [
    {
      category: "Horários Oficiais",
      tag: "Check-in 14h • Check-out 12h",
      question: "Quais são os horários oficiais de check-in e check-out?",
      answer:
        "Nosso check-in oficial acolhe você a partir das 14:00 (até as 20h/21h) para que você chegue com calma e desfrute da luz dourada da serra. O check-out acontece até as 12:00, garantindo uma manhã relaxante com café colonial sem pressa. Early check-in ou late check-out estão sujeitos à disponibilidade prévia com a recepção.",
    },
    {
      category: "Localização",
      tag: "Nota 9,4 para Casais",
      question: "Qual a distância até o centrinho histórico e cachoeiras do Sana?",
      answer:
        "Estamos na Estrada Principal do Sana (Vale de Boa Sorte), a apenas 2 km (cerca de 4 a 5 minutos de carro ou uma agradável caminhada) da praça central e do centrinho histórico do Sana, onde ficam os bistrôs acolhedores e a feirinha de artesanato local. Ficamos perto o suficiente para você curtir todos os passeios e isolados o bastante para o descanso absoluto ao som das águas do rio.",
    },
    {
      category: "Acomodações",
      tag: "Casais & Grupos",
      question: "Como são equipados os chalés e qual a capacidade das unidades?",
      answer:
        "Dispomos de chalés e suítes completas projetadas para diferentes tamanhos de grupos — de casais em clima de romance (nota 9,4 no Booking) até famílias com crianças e amigos (2 a 5+ hóspedes). Todas as unidades contam com varanda/pátio privativo com rede e vista (montanhas, jardim ou rio), TV de tela plana, ar-condicionado, banheiro privativo com água quente e amenidades de cortesia, frigobar e enxoval completo de cama e banho.",
    },
    {
      category: "Acomodações",
      tag: "Crianças & Camas",
      question: "Quais são as regras para estadias com crianças e há berços?",
      answer:
        "Crianças de qualquer idade são muito bem-vindas! Crianças a partir de 5 anos pagam como adultos neste alojamento. Para sua comodidade e planejamento, informamos que a pousada não dispõe de berços nem de camas extras supletórias — cada chalé já é configurado com camas confortáveis adequadas à sua capacidade máxima informada.",
    },
    {
      category: "Piscinas & Bar",
      tag: "Deck Solário & Bar no Local",
      question: "Como é a estrutura de banho, deck e do bar da pousada?",
      answer:
        "A pousada conta com um deck solário de madeira privativo à beira do rio com espreguiçadeiras e guarda-sol, além de piscinas naturais de pedra com águas puras de nascente. No jardim, nosso Bar da Pousada serve cervejas, coquetéis artesanais, sucos naturais e aperitivos saborosos para celebrar o entardecer nas montanhas.",
    },
    {
      category: "Rio & Natureza",
      tag: "Rio de Nascente no Quintal",
      question: "O rio passa mesmo dentro da propriedade e dá para tomar banho?",
      answer:
        "Sim! Águas puras e cristalinas de nascente cortam o terreno da pousada com poços naturais de pedra e remansos calmos a poucos passos do seu chalé. É uma verdadeira terapia natural para banhos revigorantes a qualquer hora do dia ou para relaxar nas espreguiçadeiras à beira d'água.",
    },
    {
      category: "Gastronomia",
      tag: "Café Excepcional Incluso",
      question: "Como funciona o café da manhã e o que está incluso?",
      answer:
        "Nosso café da manhã é avaliado como excepcional pelos hóspedes no Booking.com e está 100% incluso em todas as diárias. Servido em estilo buffet farto e continental: bolos caseiros saindo quentinhos do forno, pães artesanais, queijos da serra, frutas da estação e aquele perfume de café no bule coado na hora — servido com calma até mais tarde, sem despertador.",
    },
    {
      category: "Lazer & Jogos",
      tag: "Bilhar, Ping-Pong & Kids",
      question: "Quais atividades de lazer e jogos a pousada oferece?",
      answer:
        "Contamos com um acolhedor salão coberto com mesa oficial de bilhar/sinuca e ping-pong (tênis de mesa) para momentos descontraídos a dois ou em grupo. Para as famílias, temos um club infantil / parquinho ao ar livre em gramado seguro e cercado de verde, além de dicas completas para trilhas da região.",
    },
    {
      category: "Comodidades",
      tag: "Parking & Wi-Fi Grátis",
      question: "O estacionamento e o Wi-Fi são gratuitos?",
      answer:
        "Sim, dispomos de estacionamento privativo 100% gratuito dentro da propriedade, seguro e com vagas planas adaptadas para pessoas com mobilidade reduzida, além de Wi-Fi de alta velocidade gratuito disponível em todas as áreas e chalés.",
    },
    {
      category: "Mascotes & Pets",
      tag: "100% Pet Friendly VIP",
      question: "Meu pet é realmente bem-vindo em toda a pousada?",
      answer:
        "Com certeza! Aqui seu pet é hóspede de honra. Ele pode passear pelos amplos gramados seguros longe de carros, descansar na varanda do seu chalé e até se refrescar nos remansos calmos do rio cristalino. Solicitamos apenas o uso de guia nos caminhos sociais e o recolhimento dos resíduos para a harmonia coletiva.",
    },
    {
      category: "Pacto de Paz",
      tag: "Silêncio das 22h às 08h",
      question: "Qual é o horário de silêncio e a política sobre caixas de som?",
      answer:
        "Para resguardar o sono restaurador e a intimidade de todos os hóspedes, nosso horário de silêncio sagrado vigora das 22:00 às 08:00. Caixas de som não são permitidas nas áreas comuns nem nas varandas: aqui a trilha sonora oficial é a melodia das águas do rio e o canto dos pássaros da serra.",
    },
    {
      category: "Pacto de Paz",
      tag: "100% Sem Fumo",
      question: "É permitido fumar nas dependências ou dentro dos chalés?",
      answer:
        "Não. Todas as nossas acomodações e áreas sociais fechadas são estritamente para não fumantes. Essa norma protege a saúde dos hóspedes e garante que o aroma puro da serra permaneça intacto em todos os quartos.",
    },
    {
      category: "Day Use",
      tag: "Sob Consulta Prévia",
      question: "A pousada aceita visitantes para Day Use sem pernoitar?",
      answer:
        "Sim! Oferecemos opção de Day Use mediante confirmação prévia com nossa administração via WhatsApp. É a oportunidade ideal para passar o dia aproveitando o rio cristalino privativo, o deck solário com espreguiçadeiras, o salão de jogos (bilhar e ping-pong), o parquinho e a nossa exuberante área verde.",
    },
    {
      category: "Reservas Diretas",
      tag: "Melhor Tarifa Garantida",
      question: "Como funciona a reserva online no site oficial da pousada?",
      answer:
        "Você reserva em tempo real pelo nosso motor de reservas Simple Reservas integrado, com visualização de datas livres no calendário ao vivo, pagamento seguro via Pix com confirmação instantânea ou cartão de crédito, garantindo a melhor tarifa oficial direta sem intermediários.",
    },
  ];

  const categories = [
    { id: "all", label: "Todas as Dúvidas" },
    {
      id: "horarios",
      label: "Horários & Day Use",
      match: ["Horários Oficiais", "Pacto de Paz", "Day Use"],
    },
    {
      id: "chales",
      label: "Chalés & Estrutura",
      match: ["Acomodações", "Localização", "Comodidades"],
    },
    {
      id: "lazer",
      label: "Piscinas, Rio & Lazer",
      match: ["Piscinas & Bar", "Rio & Natureza", "Lazer & Jogos"],
    },
    {
      id: "cafe-pet",
      label: "Café & Pets VIP",
      match: ["Gastronomia", "Mascotes & Pets", "Reservas Diretas"],
    },
  ];

  const filteredFaqs =
    activeFilter === "all"
      ? faqs
      : faqs.filter((faq) => {
          const cat = categories.find((c) => c.id === activeFilter);
          return cat?.match?.includes(faq.category);
        });

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

  const WHATSAPP_URL =
    "https://wa.me/5522981054265?text=Ol%C3%A1%2C+tenho+uma+d%C3%BAvida+sobre+a+Pousada+Recanto+dos+P%C3%A1ssaros";

  return (
    <section
      id="faq"
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden"
    >
      {/* Warm ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[960px] h-[960px] bg-[radial-gradient(circle,rgba(194,157,89,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C29D59]/40 text-[#E6C994] text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4 shadow-xs backdrop-blur-md">
              <HelpCircle className="w-3.5 h-3.5 text-[#C29D59]" />
              <span>Dúvidas Frequentes Oficiais • Booking.com</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Tudo para você planejar sua{" "}
              <span className="italic font-normal text-[#E6C994]">
                estadia com serenidade.
              </span>
            </h2>
            <p className="mt-3 text-zinc-300 text-[15px] sm:text-base font-light leading-relaxed max-w-[60ch]">
              Respostas claras, carinhosas e transparentes baseadas nas dúvidas reais dos hóspedes: horários de check-in, deck solário e rio privativo, café excepcional incluso, bilhar, ping-pong, estacionamento gratuito e nosso refúgio pet no Sana.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={scrollPrev}
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-[#0A140F]/85 border border-[#C29D59]/40 hover:bg-[#C29D59] hover:text-[#050B07] text-[#E6C994] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="FAQ anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-[#0A140F]/85 border border-[#C29D59]/40 hover:bg-[#C29D59] hover:text-[#050B07] text-[#E6C994] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="Próximo FAQ"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs — Minimum 44px touch targets */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveFilter(cat.id);
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
                }
              }}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                activeFilter === cat.id
                  ? "bg-[#C29D59] text-[#050B07] font-bold shadow-lg shadow-[#C29D59]/20"
                  : "bg-[#0A140F]/80 text-zinc-300 hover:text-white border border-[#C29D59]/25 hover:border-[#C29D59]/60 backdrop-blur-md"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 sm:pb-6 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="w-[86vw] max-w-[380px] sm:w-[420px] sm:max-w-none shrink-0 snap-start p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.2rem] bg-gradient-to-b from-[#0A140F]/90 via-[#0A140F]/80 to-[#050B07]/90 border border-[#C29D59]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_rgba(194,157,89,0.18)] hover:border-[#C29D59]/60 hover:-translate-y-1 transition-all duration-400 flex flex-col justify-between text-left backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#E6C994]">
                    {faq.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#1B3B2B]/60 text-[11px] font-bold text-[#E6C994] border border-[#C29D59]/30 shadow-xs">
                    {faq.tag}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg sm:text-xl text-white mb-3 leading-snug">
                  {faq.question}
                </h3>

                <p className="text-zinc-300 text-sm sm:text-[15px] font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C29D59]" />
                  Dúvida resolvida
                </span>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-3.5 py-2 -mr-2 rounded-xl text-xs sm:text-sm font-semibold text-[#E6C994] hover:text-white hover:bg-white/10 transition-colors inline-flex items-center gap-1.5 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-[#E6C994]" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel Controls */}
        <div className="flex md:hidden items-center justify-between mt-3 px-1">
          <span className="text-xs text-zinc-300 font-medium">
            Deslize para ver mais ({filteredFaqs.length} dúvidas)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Dúvida anterior"
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#0A140F]/85 border border-[#C29D59]/40 flex items-center justify-center text-[#E6C994] hover:bg-[#C29D59] hover:text-[#050B07] active:scale-95 shadow-md cursor-pointer transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Próxima dúvida"
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
