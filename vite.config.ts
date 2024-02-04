import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

function antDesignIconsFix() {
  return {
    name: "@ant-design-icons-fix",
    transform(code, id) {
      if (id.includes("@ant-design/icons/lib/dist.js"))
        return code.replace(", dist as default", "");
      return code;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    // Build Chrome Extension
    crx({ manifest }),
  ],
  build: {
    rollupOptions: {
      plugins: [antDesignIconsFix()],
    },
  },
});
