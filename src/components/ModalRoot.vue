<template>
  <Modal v-if="modals.length" v-for="(modal, index) in modals" :key="index" :bind="$attrs" :modal_index="index"
    :modal_width="modal.options.width" :modal_padding="modal.options.padding" :modal_closable="modal.options.closable"
    :modal_background="modal.options.background" :modal_type="modalType" :blur="modal.options.blur"
    :closed="modal.closed" :close-modal-fnc="$closeModal" :style="'z-index: ' + (201 + index)">
    <component @close="$closeModal(index, $event)" @close-all="$closeAllModal($event)" v-bind="modal.props"
      :is="modal.component"></component>
  </Modal>
</template>


<script setup lang="ts">
import { computed, ref, unref } from '@vue/reactivity';
import { inject, onMounted, watch } from '@vue/runtime-core';
import Modal from "./Modal.vue";

let modals = inject('$modals', () => [])

console.log({ modalsTest: unref(modals) })
let screensize = ref(0)
onMounted(() => {
  if (typeof window == 'undefined') return;
  screensize.value = window.innerWidth
  window.addEventListener('resize', () => {
    screensize.value = window.innerWidth
  })
})
let computedScreenSize = computed(() => {
  return screensize.value
})
let modalType = ref("modal")



</script>

<style scoped></style>