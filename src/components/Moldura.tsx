import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A moldura da casa: um fio desenhado, deslocado da foto em vez de colado nela.
 * A imagem fica por cima e o fio aparece em cima e à esquerda, como gravura montada.
 *
 * Nasceu no hero e virou sistema — é assim que uma peça é apresentada no site
 * inteiro. Dentro de um `.group`, o fio se aproxima da foto no hover.
 */
export default function Moldura({
  src,
  alt,
  sizes,
  proporcao = "aspect-4/5 md:aspect-3/4",
  prioridade = false,
  esmaecida = false,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  /** Classes de proporção. No mobile a retrato 3:4 fica alta demais, por isso o padrão abre em 4:5. */
  proporcao?: string;
  prioridade?: boolean;
  esmaecida?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-3 -translate-y-3 border border-rosa-classico/60 transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 md:-translate-x-4 md:-translate-y-4 md:group-hover:-translate-x-2 md:group-hover:-translate-y-2"
      />
      <div className={`relative overflow-hidden ${proporcao}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={prioridade}
          loading={prioridade ? "eager" : "lazy"}
          className={`object-cover ${esmaecida ? "opacity-60" : ""}`}
        />
        {children}
      </div>
    </div>
  );
}
