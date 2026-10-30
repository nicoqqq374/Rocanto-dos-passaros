This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Publicação oficial

Cloudflare Workers com assets estáticos, usando o Wrangler local e wrangler.toml.
Worker existente: landing-sana-view-final-09-2026. Usar npm run build antes de publicar.
Preservar os domínios e as rotas atuais; não publicar a cópia anterior.

## Sincronização do catálogo — 25/10/2026

Esta é a cópia correspondente ao site oficial sanaviewhostel.com.br.
Pasta canônica: C:\Users\AGENTICA SOLUCIONES\Desktop\NOVA-clientes-landings\landing-sanaview-oficial.
A cópia anterior foi separada em C:\Users\AGENTICA SOLUCIONES\Desktop\NOVA-clientes-landings\landing-sanaview-anterior; não usá-la para editar ou publicar.

BookingProvider centraliza as acomodações: catálogo, filtros, barras, modais e
JSON-LD compartilham os dados. Atualiza ao abrir, a cada 30 segundos com a aba
visível, ao recuperar foco e conexão. Falhas mantêm o último catálogo disponível;
antes da primeira resposta válida usa-se src/data/rooms.ts como fallback.

API: https://reservas.sanaviewhostel.com.br/api/public/sana-view/units.
Configuração pública em .env.example: NEXT_PUBLIC_SAAS_URL e NEXT_PUBLIC_TENANT_SLUG.
Fotos raster em base64 são aceitas; conteúdo válido da API tem prioridade.
O catálogo mostra tarifas base. O total depende das datas e condições no motor.

O motor /sana-view/embed e a API sem cache já estão ativos no domínio de reservas.
O usuário autorizou commit e publicação desta landing em 25/10/2026.
