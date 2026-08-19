import type { ReactNode } from "react";

type Variante = "primario" | "contorno" | "claro";

const ESTILO: Record<Variante, string> = {
  primario: "bg-vinho text-perola hover:bg-vinho-profundo",
  contorno: "border border-vinho text-vinho hover:bg-vinho hover:text-perola",
  claro: "border border-perola text-perola hover:bg-perola hover:text-vinho-profundo",
};

const BASE =
  "eyebrow inline-flex items-center justify-center gap-2 rounded-[6px] px-6 py-3.5 text-[12px] transition-colors duration-200";

export default function BotaoWhatsApp({
  href,
  variante = "primario",
  className = "",
  children,
}: {
  href: string;
  variante?: Variante;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE} ${ESTILO[variante]} ${className}`}
    >
      {children}
    </a>
  );
}
