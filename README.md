# Dantas ManutenCel — Landing Page

Landing page premium para assistência técnica de celulares com atendimento domiciliar.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- Framer Motion (motion/react)
- Zustand
- Lucide React

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## Deploy (Vercel)

1. Push pro GitHub
2. Conectar repositório no Vercel
3. **Nenhuma variável de ambiente necessária** — a landing page é estática
4. Build command: `npm run build` | Output directory: `dist`

## Imagens

Coloque suas imagens `.jpg` / `.png` / `.webp` na pasta `/public/images/` e referencie no código assim:

```tsx
<img src="/images/foto-tecnico.jpg" alt="Técnico em atendimento" />
```

As imagens na pasta `/public` são servidas diretamente na raiz do site.
