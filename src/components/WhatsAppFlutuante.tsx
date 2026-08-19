"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { linkGeral } from "@/lib/whatsapp";

/**
 * Aparece depois de 400px de rolagem. Some nas páginas de produto no mobile,
 * onde o CTA já está fixo no rodapé da viewport e os dois brigariam pelo mesmo canto.
 */
export default function WhatsAppFlutuante() {
  const [visivel, setVisivel] = useState(false);
  const caminho = usePathname();
  const emProduto = caminho?.startsWith("/produto/") ?? false;

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 400);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  if (!visivel) return null;

  return (
    <a
      href={linkGeral()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_6px_20px_rgba(61,7,21,0.28)] transition-transform duration-200 hover:scale-105 ${
        emProduto ? "hidden md:flex" : "flex"
      }`}
      style={{ background: "#25D366" }}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
        <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.85 9.85 0 0 0 4.7 1.2h.01c5.44 0 9.87-4.43 9.87-9.87 0-2.64-1.03-5.12-2.9-6.98A9.8 9.8 0 0 0 12.05 2Zm0 18.06h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.35c0-4.52 3.68-8.2 8.2-8.2 2.2 0 4.26.86 5.81 2.4a8.16 8.16 0 0 1 2.4 5.81c0 4.52-3.68 8.2-8.2 8.2Z" />
      </svg>
    </a>
  );
}
