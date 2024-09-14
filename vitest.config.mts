import { resolve } from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    open: true
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/__tests__/setup/test.setup.ts",
    coverage: {
      provider: "v8",
      exclude: [
        "**/.eslintrc.json",
        "vitest.config.mts",
        "next.config.mjs",
        ".next",
        "dist",
        "**/*.test.{js,jsx,ts,tsx}"
      ]
    },
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
});
