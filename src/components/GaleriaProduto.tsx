"use client";

import Image from "next/image";
import { useState } from "react";

export default function GaleriaProduto({
  imagens,
  alt,
  nome,
}: {
  imagens: string[];
  alt: string;
  nome: string;
}) {
  const [atual, setAtual] = useState(0);

  return (
    <div>
      <div className="relative aspect-4/5 overflow-hidden rounded-[4px] bg-rosa-nevoa">
        <Image
          src={imagens[atual]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {imagens.length > 1 && (
        <div className="mt-3 flex gap-3">
          {imagens.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Ver foto ${i + 1} de ${nome}`}
              aria-current={i === atual}
              className={`relative aspect-4/5 w-20 overflow-hidden rounded-[4px] border transition-colors duration-200 ${
                i === atual ? "border-vinho" : "border-rosa-classico"
              }`}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
