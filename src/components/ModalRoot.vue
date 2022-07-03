<template>
  <Modal v-if="$modals.value.length" v-for="(modal, index) in $modals.value" :key="index" :bind="$attrs"
    :modal_index="index" :modal_width="modal.options.width" :modal_padding="modal.options.padding"
    :modal_closable="modal.options.closable" :modal_background="modal.options.background"
    :modal_type="computedModaltype" :blur="modal.options.blur" :closed="modal.closed" :close-modal-fnc="$closeModal"
    :style="'z-index: ' + (201 + index)">
    <component @close="$closeModal(index, $event)" @close-all="$closeAllModal($event)" v-bind="modal.props"
      :is="modal.component"></component>
  </Modal>
</template>

<script lang="ts">
import Modal from "./Modal.vue";
export default {
  name: "ModalRoot",
  inject: ['$modals'],
  components: { Modal },
}
</script>
<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { inject, onMounted } from '@vue/runtime-core';

let modalsTest = inject('$modals')
let returnType = null
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
let computedModaltype = computed(() => {
  if (modalsTest) {
    modalsTest.value.forEach(modal => {
      if (modal.options.type && computedScreenSize.value >= 640) {
        returnType = modal.options.type
      } else {
        returnType = modal.options.mobile
      }
    })
  }
  return returnType
})
</script>

<style scoped>
</style>