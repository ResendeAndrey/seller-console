import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: "e2e/support/index.ts",
    baseUrl: "http://localhost:3000",
    specPattern: "e2e/**/*.cy.{js,ts,jsx,tsx}"
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite"
    }
  }
});
