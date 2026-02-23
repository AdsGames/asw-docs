import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "md",
  title: "ASW Documentation",
  description: "A Simple Wrapper for SDL3",
  sitemap: {
    hostname: "https://asw.adsgames.net",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Modules", link: "/modules/core" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present A.D.S. Games",
    },

    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "Core",
        items: [
          { text: "Core", link: "/modules/core" },
          { text: "Types", link: "/modules/types" },
          { text: "Color", link: "/modules/color" },
          { text: "Display", link: "/modules/display" },
        ],
      },
      {
        text: "Graphics",
        items: [
          { text: "Draw", link: "/modules/draw" },
          { text: "Particles", link: "/modules/particles" },
          { text: "Easing", link: "/modules/easing" },
        ],
      },
      {
        text: "Input",
        items: [{ text: "Input", link: "/modules/input" }],
      },
      {
        text: "Audio",
        items: [{ text: "Sound", link: "/modules/sound" }],
      },
      {
        text: "Assets",
        items: [{ text: "Assets", link: "/modules/assets" }],
      },
      {
        text: "Game Framework",
        items: [
          { text: "Game Objects", link: "/modules/game" },
          { text: "Scene", link: "/modules/scene" },
        ],
      },
      {
        text: "UI",
        items: [{ text: "UI Widgets", link: "/modules/ui" }],
      },
      {
        text: "Utilities",
        items: [
          { text: "Geometry", link: "/modules/geometry" },
          { text: "Random", link: "/modules/random" },
          { text: "Log", link: "/modules/log" },
          { text: "Util", link: "/modules/util" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/adsgames/asw" }],
  },
});
