// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
    output: "server",

    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [react(), icon()],

    adapter: vercel({
        webAnalytics: {
            enabled: true,
        },
    }),
});
