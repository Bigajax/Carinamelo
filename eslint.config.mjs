import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Regra inegociável do projeto: o catálogo tem uma porta de entrada só.
    // Quando a v2 trocar o corpo de lib/catalogo.ts por Supabase, nenhuma tela muda.
    files: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/data/produtos",
              message:
                "Use @/lib/catalogo. Nenhuma página ou componente importa produtos.ts direto.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Assets e utilitários fora do app.
    "scripts/**",
    "_raw-fb/**",
  ]),
]);

export default eslintConfig;
