<template>
  <div @click="close" :class="blur ? 'blur' : ''" class="vm__modal__wrapper">
    <div
        class="vm__modal__container"
        :class="
        `${modal_class[modal_type].cls}`
      "
    >
      <div :style="modal_class[modal_type].style" class="vm__modal__box">
        <div
            @click="
            (e) => {
              e.stopPropagation();
            }
          "
            :style="
            'max-width: ' + modal_width + 'px; background: ' + modal_background
          "
            class="vm__modal__box_container animated faster"
            :class="
            `${
              anim_class
            } ${modal_class[modal_type].cls}`
          "
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref,computed} from "vue"
import {closeModal} from "../vueModally";

export default {
  name: "Modal",
  props: {
    modal_index: {
      type: Number
    },
    closed: {
      type: Boolean,
      default: false
    },
    modal_width: {
      type: Number,
      default: 700
    },
    modal_background: {
      type: String,
      default: "white"
    },
    modal_padding: {
      type: Number,
      default: 20
    },
    modal_closable: {
      type: Boolean,
      default: true
    },
    modal_type: {
      type: String,
      default: 'modal'
    },
    blur: {
      type: Boolean,
      default: true
    }
  },
  setup(props,context){

    let modal_class = ref({
      modal: {cls: "is-modal",anim_in: "zoomIn",anim_out: "zoomOut",style: `padding: ${props.modal_padding}px;`},
      panel: {cls: "is-panel",anim_in: "slideInUp",anim_out: "slideOutDown",style: 'padding: 0'},
      side: {cls: "is-side",anim_in: "slideInRight",anim_out: "slideOutRight",style: 'padding: 0'}
    })

    let is_panel = computed(() => props.modal_type === "panel")

    let is_side = computed(() => props.modal_type === "side")

    let anim_class = computed(() => !props.closed
        ? modal_class.value[props.modal_type].anim_in
        : modal_class.value[props.modal_type].anim_out)


    function close() {
      if (props.modal_closable) {
        console.log('should close modal now')
        closeModal(props.modal_index)
        // context.emit('close', props.modal_index)
      }
    }

    return {
      modal_class,
      is_panel,
      is_side,
      close,
      anim_class
    }
  }
}
</script>

<style src="../assets/animate.css"></style>
<style lang="scss">
.vm__modal__wrapper {
  position: fixed;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  &.blur {
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
  }

  .vm__modal__container {
    &.is-modal {
      margin-top: auto;
      margin-bottom: auto;
    }
    &.is-panel {
      margin-top: auto;
      margin-bottom: 0;
    }
    &.is-side {
      margin-left: auto;
      margin-bottom: 0;
      width: auto!important;
    }
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
    overflow: auto !important;
    .vm__modal__box {
      .vm__modal__box_container {
        &.is-panel {
          border-bottom-left-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }
        &.is-side {
          border-bottom-right-radius: 0 !important;
          border-top-right-radius: 0 !important;
          height: 100vh;
        }
        border-radius: 15px;
        margin-left: auto;
        width: 100%;
        margin-right: auto;
      }
    }
  }
}
</style>
