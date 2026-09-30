<script setup lang="ts">
// A playable ASW example. Shows a screenshot until the reader presses Play,
// then loads the example (about 3.5 MB) from /play/<name>/, which
// scripts/fetch-examples.mjs downloads from the ASW release.
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { withBase } from "vitepress";
import { activeExample } from "./activeExample";

const props = defineProps<{
  /** Example folder name, for example "particles" */
  name: string;
  /** Short title for labels, defaults to the name */
  title?: string;
}>();

const label = computed(() => props.title ?? props.name.charAt(0).toUpperCase() + props.name.slice(1));
const page = computed(() => withBase(`/play/${props.name}/index.html`));
const poster = computed(() => withBase(`/play/${props.name}/screenshot.png`));

const id = Symbol(props.name);
const playing = computed(() => activeExample.value === id);
const root = ref<HTMLElement>();
const frame = ref<HTMLIFrameElement>();
const posterFailed = ref(false);

// The game page hides its own loading label in an iframe and posts its
// status here instead, as { type: "asw:status", text } and { type: "asw:ready" }
const status = ref("");

function onMessage(event: MessageEvent) {
  if (!frame.value || event.source !== frame.value.contentWindow) {
    return;
  }
  if (event.data?.type === "asw:status") {
    status.value = String(event.data.text ?? "");
  } else if (event.data?.type === "asw:ready") {
    status.value = "";
  }
}

onMounted(() => window.addEventListener("message", onMessage));
onBeforeUnmount(() => window.removeEventListener("message", onMessage));

// Only one example runs at a time, so sound and CPU use do not pile up
function play() {
  activeExample.value = id;
}

function stop() {
  if (playing.value) {
    activeExample.value = null;
  }
}

// Give the game the keyboard as soon as it loads
function focusGame() {
  frame.value?.contentWindow?.focus();
}

function restart() {
  status.value = "Loading…";
  frame.value?.contentWindow?.location.reload();
}

function fullscreen() {
  root.value?.requestFullscreen?.();
}

watch(playing, (now) => {
  status.value = now ? "Loading…" : "";
  if (!now && document.fullscreenElement === root.value) {
    document.exitFullscreen();
  }
});
</script>

<template>
  <figure class="playable-example">
    <div ref="root" class="screen">
      <iframe
        v-if="playing"
        ref="frame"
        :src="page"
        :title="`${label} example`"
        allow="autoplay; fullscreen; gamepad"
        @load="focusGame"
      />
      <template v-else>
        <img
          v-if="!posterFailed"
          :src="poster"
          :alt="`${label} example`"
          loading="lazy"
          @error="posterFailed = true"
        />
        <button class="play" type="button" @click="play">
          <span class="icon" aria-hidden="true">▶</span>
          Play {{ label }}
        </button>
      </template>
      <div v-if="playing && status" class="status" role="status">{{ status }}</div>
    </div>

    <figcaption class="toolbar">
      <template v-if="playing">
        <button type="button" @click="restart">Restart</button>
        <button type="button" @click="fullscreen">Fullscreen</button>
        <button type="button" @click="stop">Stop</button>
        <span class="hint">Click the game to give it the keyboard.</span>
      </template>
      <span v-else class="hint">Runs in your browser. Keyboard and mouse recommended.</span>
      <a class="open" :href="page" target="_blank" rel="noopener">Open in new tab ↗</a>
    </figcaption>
  </figure>
</template>

<style scoped>
.playable-example {
  margin: 16px 0 24px;
}

.screen {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #111318;
}

.screen:fullscreen {
  border: 0;
  border-radius: 0;
}

.screen iframe,
.screen img {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0;
  object-fit: cover;
}

.status {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 14px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.6);
  color: #9aa0a6;
  font: 14px system-ui, sans-serif;
  pointer-events: none;
}

.play {
  position: absolute;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  border-radius: 999px;
  background: var(--vp-c-brand-3);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
  transition: background-color 0.2s, transform 0.2s;
}

.play:hover {
  background: var(--vp-c-brand-2);
  transform: scale(1.04);
}

.play:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

.icon {
  font-size: 13px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin-top: 8px;
  font-size: 14px;
}

.toolbar button {
  padding: 2px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.toolbar button:hover {
  border-color: var(--vp-c-brand-1);
}

.hint {
  color: var(--vp-c-text-2);
}

.open {
  margin-left: auto;
}
</style>
