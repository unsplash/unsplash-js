import { defineConfig } from "tsdown";

export default defineConfig({
  platform: "neutral",
  target: "es2020",
  entry: "./src/index.ts",
});
