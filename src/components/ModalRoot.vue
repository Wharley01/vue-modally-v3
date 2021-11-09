<template>
  <Modal
      v-if="$modals.value.length"
      v-for="(modal, index) in $modals.value"
      :key="index"
      :bind="$attrs"
      :modal_index="index"
      :modal_width="modal.options.width"
      :modal_padding="modal.options.padding"
      :modal_closable="modal.options.closable"
      :modal_background="modal.options.background"
      :modal_type="modal.options.type"
      :blur="modal.options.blur"
      :closed="modal.closed"
      :close-modal-fnc="$closeModal"
      :style="'z-index: ' + (201 + index)"
  >
    <component
        @close="$closeModal(index,$event)"
        @close-all="$closeAllModal($event)"
        v-bind="modal.props"
        :is="modal.component"
    ></component>
  </Modal>
</template>

<script lang="ts">
import Modal from "./Modal.vue";
export default {
  name: "ModalRoot",
  inject:['$modals'],
  components: {Modal}
}
</script>
<script setup lang="ts">
// import {closeModal,closeAllModal} from "../vueModally";
</script>

<style scoped>

</style>