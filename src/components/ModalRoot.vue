<template>
  <Modal v-if="modalsTest.length" v-for="(modal, index) in modalsTest" :key="index" :bind="$attrs" :modal_index="index"
    :modal_width="modal.options.width" :modal_padding="modal.options.padding" :modal_closable="modal.options.closable"
    :modal_background="modal.options.background" :modal_type="modalType" :blur="modal.options.blur" :closed="modal.closed"
    :close-modal-fnc="$closeModal" :style="'z-index: ' + (201 + index)">
    <component @close="$closeModal(index, $event)" @close-all="$closeAllModal($event)" v-bind="modal.props"
      :is="modal.component"></component>
  </Modal>
</template>


<script setup lang="ts">
import { computed, ref, unref } from '@vue/reactivity';
import { inject, onMounted, watch } from '@vue/runtime-core';
import Modal from "./Modal.vue";

let modalsTest = inject('$modals', () => [])

console.log({ modalsTest: unref(modalsTest) })
let screensize = ref(null)
onMounted(() => {
  screensize.value = window.innerWidth
  window.addEventListener('resize', () => {
    screensize.value = window.innerWidth
  })
})
let computedScreenSize = computed(() => {
  return screensize.value
})
let modalType = ref(null)

watch(modalsTest.value, (newModals) => {
  let modals = JSON.parse(JSON.stringify(newModals));
  modals.forEach(modal => {
    console.log({ modal: modal.options })
    if (modal.options.type && computedScreenSize.value >= 640) {
      modalType.value = modal.options.type
    } else {
      modalType.value = modal.options.mobile
    }
  })
})



</script>

<style scoped></style>