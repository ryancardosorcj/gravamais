import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';

/* Número que corre de zero até o valor quando entra na tela.

   O texto é renderizado a partir de um MotionValue, não de estado: assim os
   ~90 quadros da animação atualizam o nó de texto direto, sem disparar um
   render do React por quadro. Com três contadores na mesma fileira a
   diferença deixa de ser acadêmica.

   `once: true` — o número corre uma vez. Reanimar a cada passada transforma
   um dado em enfeite, e quem rola de volta só quer reler o valor.

   Com movimento reduzido o valor final aparece direto: a informação é o
   número, não a corrida até ele. */
export default function Contador({ valor, prefixo = '', sufixo = '', className, style }) {
  const ref = useRef(null);
  const visivel = useInView(ref, { once: true, margin: '-80px' });
  const reduz = useReducedMotion();

  const atual = useMotionValue(reduz ? valor : 0);
  const texto = useTransform(
    atual,
    (v) => `${prefixo}${Math.round(v).toLocaleString('pt-BR')}${sufixo}`,
  );

  useEffect(() => {
    if (!visivel || reduz) return;
    const corrida = animate(atual, valor, {
      duration: 1.7,
      // expo.out, a mesma curva dos tokens: dispara rápido e assenta no fim,
      // que é o que dá a leitura de contador desacelerando no valor certo.
      ease: [0.16, 1, 0.3, 1],
    });
    return () => corrida.stop();
  }, [visivel, reduz, valor, atual]);

  return (
    <motion.span ref={ref} className={className} style={style}>
      {texto}
    </motion.span>
  );
}
