import { defineConfig } from "tsdown";

export default defineConfig({
  platform: "neutral",
  target: "es2020",
  format: ["esm", "cjs"],
  fixedExtension: true,
  entry: "./src/index.ts",
});
