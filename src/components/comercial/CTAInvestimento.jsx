import { Eye } from 'lucide-react';
import { CTA_INVESTIMENTO } from '../../data/comercial';
import { Eyebrow, TitleBlock, Reveal, Button } from '../ui';

/* 05/Investimento na parceria — fecha o bloco claro (leva `caixa-pe`) e abre
   caminho para os planos, que já existem e não mudam: o CTA só rola até
   `#planos`, onde PlanosDetalhe.jsx já está montado. */
export default function CTAInvestimento() {
  return (
    <section data-tone="light" className="caixa-pe section relative overflow-hidden">
      <div className="container-ds">
        <Reveal>
          <div
            data-tone="dark"
            className="mx-auto max-w-4xl rounded-2xl border border-white/10 px-8 py-14 text-center shadow-lg md:px-16 md:py-20"
          >
            <Eyebrow>{CTA_INVESTIMENTO.eyebrow}</Eyebrow>
            <TitleBlock
              linhas={CTA_INVESTIMENTO.titulo}
              destaque={null}
              className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl"
            />
            <div className="mt-9 flex justify-center">
              <Button href={CTA_INVESTIMENTO.ctaHref} size="lg" className="gap-2.5">
                {CTA_INVESTIMENTO.cta}
                <Eye size={18} aria-hidden />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
