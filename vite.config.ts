import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/day-brief-card.ts"),
      name: "DayBriefCard",
      formats: ["es"],
      fileName: () => "day-brief.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
