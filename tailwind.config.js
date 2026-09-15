/** @type {import('tailwindcss').Config} */
// Tailwind consome APENAS os tokens semânticos (L2) de src/styles/tokens.css.
// Nenhum hex bruto deve aparecer nos componentes.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: 'rgb(var(--bg-deep-rgb) / <alpha-value>)',
          base: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          inverse: 'var(--bg-inverse)',
        },
        /* Estes usam canais RGB, não var() em hex — é o que permite os
           modificadores de opacidade (`bg-brand/60`, `text-fg-primary/25`).
           Com `var(--brand)` em hex, o Tailwind NÃO gera a classe com alpha:
           ela falha em silêncio e o elemento não pinta nada. */
        fg: {
          primary: 'rgb(var(--fg-primary-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--fg-secondary-rgb) / <alpha-value>)',
          muted: 'rgb(var(--fg-muted-rgb) / <alpha-value>)',
          subtle: 'var(--fg-subtle)',
          inverse: 'var(--fg-inverse)',
        },
        brand: {
          DEFAULT: 'rgb(var(--brand-rgb) / <alpha-value>)',
          hover: 'var(--brand-hover)',
          active: 'var(--brand-active)',
          subtle: 'var(--brand-subtle)',
          ink: 'rgb(var(--brand-ink-rgb) / <alpha-value>)',
        },
        'on-brand': 'rgb(var(--on-brand-rgb) / <alpha-value>)',
        // dourado da parede (cena dos fundadores) — usado com alpha
        gold: 'rgb(var(--gold-rgb) / <alpha-value>)',
        danger: 'var(--danger)',
        success: 'var(--success)',
        glass: {
          DEFAULT: 'var(--glass-bg)',
          strong: 'var(--glass-bg-strong)',
        },
      },
      borderColor: {
        subtle: 'var(--border-subtle)',
        base: 'var(--border-base)',
        strong: 'var(--border-strong)',
        glass: 'var(--glass-border)',
        // `brand` NÃO é redeclarado aqui de propósito: assim `border-brand`
        // herda a versão RGB de `colors.brand` e aceita alpha (border-brand/50).
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        '2xs': 'var(--text-2xs)',
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
        '7xl': 'var(--text-7xl)',
        '8xl': 'var(--text-8xl)',
      },
      // A escala `spacing` do Tailwind NÃO é sobrescrita, de propósito.
      // Ela já é 4pt-based e corresponde aos tokens --space-*. Sobrescrever
      // as chaves 1–11 sequestraria também as classes de dimensão: `h-11`
      // viraria 160px em vez de 44px. Os tokens --space-* seguem valendo
      // dentro das classes de componente (.section, .card, .btn) em index.css.
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      backdropBlur: {
        glass: 'var(--glass-blur)',
        'glass-strong': 'var(--glass-blur-strong)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        brand: 'var(--shadow-brand)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        in: 'var(--ease-in)',
        both: 'var(--ease-both)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
      },
      zIndex: {
        base: 'var(--z-base)',
        raised: 'var(--z-raised)',
        sticky: 'var(--z-sticky)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
