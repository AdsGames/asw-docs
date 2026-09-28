import { ref } from "vue";

/** The PlayableExample that is running. Starting one stops the others. */
export const activeExample = ref<symbol | null>(null);
