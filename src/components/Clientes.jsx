import { CLIENTES } from '../data/site';

/* Parede de marcas — grade limpa, como na referência, só que invertida:
   os logos vieram em BRANCO com fundo recortado, então pedem seção escura.

   Não há mais card, borda nem recorte: `object-contain` deixa cada marca
   respirar dentro da célula. O equilíbrio óptico foi resolvido no asset, não
   no CSS — cada arquivo foi normalizado pela raiz da área e centralizado numa
   tela 3:1, senão as marcas largas (Starrett, Apotica) engoliriam as
   compactas (OPT, Toyota).

   Sem grayscale: já são monocromáticos de origem. */
export default function Clientes() {
  return (
    <section aria-label={CLIENTES.titulo} data-tone="dark" className="py-20 md:py-24">
      <div className="container-ds">
        <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-fg-muted">
          {CLIENTES.titulo}
        </p>

        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 md:gap-x-12 lg:grid-cols-4">
          {CLIENTES.logos.map(({ src, nome }) => (
            <li key={src} className="flex justify-center">
              <img
                src={src}
                alt={nome}
                loading="lazy"
                decoding="async"
                width="600"
                height="200"
                className="h-12 w-full object-contain opacity-75 transition-opacity duration-slow ease-out hover:opacity-100 md:h-14"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
