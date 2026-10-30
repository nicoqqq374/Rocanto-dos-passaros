export interface Room {
  id: string;
  name: string;
  type: 'suite' | 'cabana' | 'compartilhado' | 'camping';
  typeName: string;
  price: number;
  capacity: number;
  features: string[];
  description: string;
  images: string[];
  badge?: string;
}

export const ROOMS_DATA: Room[] = [
  {
    id: '1ead0d2f-85cd-4d34-a674-bec9fb698153',
    name: 'Chalé Conforto Casal',
    type: 'cabana',
    typeName: 'Chalé Romântico',
    price: 300,
    capacity: 2,
    badge: 'Nota 9,4 Casais',
    features: [
      'Varanda com Rede & Vista para Montanhas',
      'Banheiro Privativo com Amenidades de Cortesia',
      'Ar-Condicionado & TV de Tela Plana',
      'Roupas de Cama e Banho Macias Inclusas',
      'Frigobar Abastecível & Wi-Fi Grátis',
      'Café da Manhã Excepcional Incluso (Buffet)',
      'Estacionamento Privativo Gratuito',
      '100% Pet Friendly'
    ],
    description: 'Projetado com carinho para casais que buscam intimidade e sossego. Varanda privativa com rede voltada para as montanhas da serra, cama de casal confortável com enxoval completo, TV de tela plana, ar-condicionado, banheiro privativo com amenidades gratuitas e o privilégio de acordar com o café excepcional incluso.',
    images: [
      '/recanto/chales-individuais-jardim.jpg',
      '/recanto/quarto-chale.jpg',
      '/recanto/hero-pousada-real.jpg'
    ]
  },
  {
    id: '361b8cbf-0882-40af-8622-4a166372d172',
    name: 'Chalet de 1 Dormitório',
    type: 'suite',
    typeName: 'Chalé Completo',
    price: 350,
    capacity: 4,
    badge: 'Mais Desejado',
    features: [
      'Pátio / Varanda Privativa com Vista para o Jardim',
      'Banheiro Privativo Completo com Amenidades',
      'Ar-Condicionado & TV de Tela Plana',
      'Cama Queen Size + Camas Extras',
      'Roupas de Cama e Toalhas Inclusas',
      'Frigobar & Wi-Fi Grátis',
      'Café Excepcional Incluso & Parking Grátis',
      'Pet Friendly'
    ],
    description: 'Chalé independente e amplo com capacidade para até 4 pessoas. Varanda/pátio privativo com rede e vista aberta para o jardim da pousada, ar-condicionado, TV de tela plana, banheiro privativo, enxoval completo e acesso direto ao deck solário e às piscinas naturais do rio.',
    images: [
      '/recanto/hero-pousada-real.jpg',
      '/recanto/quarto-chale.jpg',
      '/recanto/chales-individuais-jardim.jpg',
      '/recanto/estacionamento-chalets.jpg'
    ]
  },
  {
    id: 'recanto-master-rio',
    name: 'Chalé Master Beira Rio',
    type: 'suite',
    typeName: 'Chalé Master',
    price: 420,
    capacity: 3,
    badge: 'Frente ao Rio',
    features: [
      'Varanda com Deck & Vista Direta para o Rio',
      'Área de Estar Aconchegante',
      'Banheiro Privativo Espaçoso com Amenidades',
      'Ar-Condicionado Split & TV de Tela Plana',
      'Cama King Size com Enxoval Premium',
      'Frigobar, Wi-Fi & Estacionamento Gratuito',
      'Café da Manhã Excepcional Incluso',
      'Pet Friendly VIP'
    ],
    description: 'A experiência máxima de relaxamento: varanda privativa debruçada sobre o rio cristalino da pousada e zona de estar acolhedora. Durma e acorde com o som terapêutico da água corrente e aprecie o visual da mata com privacidade absoluta.',
    images: [
      '/recanto/piscina-natural-rio.jpg',
      '/recanto/deck-solario-rio.jpg',
      '/recanto/quarto-chale.jpg'
    ]
  },
  {
    id: 'recanto-suite-familia',
    name: 'Suíte Família & Grupos',
    type: 'suite',
    typeName: 'Suíte para Grupos',
    price: 390,
    capacity: 5,
    badge: 'Grupos & Famílias',
    features: [
      '2 Ambientes com Zona de Estar e Varanda',
      'Vista Panorâmica para Jardins e Montanha',
      'Banheiro Privativo com Ducha e Amenidades',
      'Ar-Condicionado & TV de Tela Plana',
      'Cama Casal + Camas Extras (Roupas & Toalhas)',
      'Wi-Fi Rápido & Parking Adaptado Grátis',
      'Café da Manhã Incluso & Pet Friendly'
    ],
    description: 'Acomodação espaçosa pensada para acolher com conforto diferentes tamanhos de grupos e famílias com seus pets. Varanda ampla com vista para a serra, ar-condicionado, TV de tela plana, área de estar e acesso plano às áreas de lazer, rio privativo, parquinho e jogos.',
    images: [
      '/recanto/quarto-chale.jpg',
      '/recanto/estacionamento-chalets.jpg',
      '/recanto/parquinho-infantil.jpg'
    ]
  }
];
