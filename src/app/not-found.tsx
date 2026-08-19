import Link from "next/link";

import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import { linkGeral } from "@/lib/whatsapp";

export default function NaoEncontrado() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 py-28 md:px-8 md:py-40">
      <p className="eyebrow text-[11px] text-vinho/80">Erro 404</p>
      <h1 className="display mt-4 max-w-[18ch] text-[38px] text-vinho md:text-[52px]">
        Essa página não existe.
      </h1>
      <p className="medida-texto mt-6 text-[16px] text-tinta/85">
        Talvez a peça tenha saído de linha ou o link esteja incompleto. O catálogo inteiro
        continua no ar.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/catalogo"
          className="eyebrow inline-flex items-center rounded-[6px] bg-vinho px-6 py-3.5 text-[12px] text-perola transition-colors duration-200 hover:bg-vinho-profundo"
        >
          Ver catálogo
        </Link>
        <BotaoWhatsApp href={linkGeral()} variante="contorno">
          Falar no WhatsApp
        </BotaoWhatsApp>
      </div>
    </div>
  );
}
