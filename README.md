# GravaMais Produções — Landing Page

Landing page da GravaMais, produtora de vídeo e performance.
React + Vite + Tailwind + Framer Motion.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o build
```

## ⚠️ Antes de publicar

Abra `src/data/site.js` e preencha o bloco `CONFIG` — hoje ele está com
**placeholders**:

```js
export const CONFIG = {
  whatsapp: '5500000000000',   // ← número real, só dígitos, com DDI+DDD
  instagram: '...',            // ← perfil real
  email: '...',                // ← e-mail real
  cidade: '...',               // ← cidade real
};
```

O número de WhatsApp alimenta **todos** os CTAs da página (header, hero, botão
flutuante, CTA final e rodapé). Com o placeholder, nenhum deles converte.

Confira também os números da seção "Quem somos" (`SOBRE.numeros`): hoje estão
`+10 marcas` e `+100 vídeos` — valores que estimei a partir do material que
você enviou, não medidos. Ajuste para os reais.

## Onde mexer

| Quero mudar… | Vá em… |
|---|---|
| Textos, vídeos, serviços, processo | `src/data/site.js` |
| Cores, fontes, espaçamento, motion | `src/styles/tokens.css` |
| Regras do design system | `design-system/MASTER.md` |
| Uma seção específica | `src/components/<Secao>.jsx` |

Todo o conteúdo da página vive em `src/data/site.js`. Para trocar uma headline
ou adicionar um vídeo, **não é preciso abrir componente nenhum**.

### Adicionar um vídeo ao portfólio

Em `src/data/site.js`, acrescente ao array certo — `VIDEOS_FILME` (16:9) ou
`VIDEOS_SOCIAL` (9:16). O `id` é o trecho final da URL do YouTube:

```js
{ id: 'EE77tufHNRI', titulo: '...', cliente: '...', tipo: '...' }
```

Os vídeos usam uma fachada: a página mostra só a thumbnail, e o iframe do
YouTube só é montado quando o usuário clica. É o que mantém a LP leve mesmo com
8 vídeos embutidos.

## Assets

Ficam em `public/`: `logo/`, `portfolio/` (15 fotos), `clientes/` (10 logos),
`equipe/`, `bastidores/`. Total: 2,4 MB.

As logotipos foram aparadas — o original era 1080×1080 com a marca pequena no
meio de um mar de transparência, e no header apareceria ilegível.
