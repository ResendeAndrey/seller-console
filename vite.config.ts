import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteTsconfigPaths()],
  server: {
    port: 3000
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reporter: ["text", "html"],
      exclude: [
        "src/app/app.tsx",
        "src/app/provider.tsx",
        "src/app/router.tsx",
        "src/api",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/routes/**/*"
      ],
      include: ["src/**/*.{js,ts,jsx,tsx}"]
    }
  }
});
