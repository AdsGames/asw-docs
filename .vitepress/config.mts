import { defineConfig } from "vitepress";
import llmstxt, {
  copyOrDownloadAsMarkdownButtons,
} from "vitepress-plugin-llms";

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
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Examples", link: "/examples" },
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
        text: "Introduction",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Examples", link: "/examples" },
        ],
      },
      {
        text: "Core",
        items: [
          { text: "Core", link: "/modules/core" },
          { text: "Types", link: "/modules/types" },
          { text: "Color", link: "/modules/color" },
          { text: "Display", link: "/modules/display" },
          { text: "Config", link: "/modules/config" },
        ],
      },
      {
        text: "Graphics",
        items: [
          { text: "Draw", link: "/modules/draw" },
          { text: "Sprite Sheet", link: "/modules/sprite-sheet" },
          { text: "Camera", link: "/modules/camera" },
          { text: "Particles", link: "/modules/particles" },
          { text: "Easing", link: "/modules/easing" },
          { text: "Lighting", link: "/modules/lighting" },
        ],
      },
      {
        text: "Input",
        items: [
          { text: "Input", link: "/modules/input" },
          { text: "Actions", link: "/modules/action" },
        ],
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
          { text: "Dialog", link: "/modules/dialog" },
          { text: "Log", link: "/modules/log" },
          { text: "Util", link: "/modules/util" },
        ],
      },
    ],

    outline: [2, 3],

    editLink: {
      pattern: "https://github.com/adsgames/asw-docs/edit/main/md/:path",
      text: "Edit this page on GitHub",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/adsgames/asw" }],
  },
  vite: {
    plugins: [llmstxt()],
  },
  markdown: {
    config(md) {
      md.use(copyOrDownloadAsMarkdownButtons);
    },
  },
});
