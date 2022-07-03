<script setup>
import { ref } from 'vue'
import { useModal } from "../vueModally";
import Test from "./Test.vue";
defineProps({
  msg: String
})

const count = ref(0)
async function testModal() {
  await useModal(Test, {
    options: {
      type: 'modal',
      mobile: 'panel'
    }
  })
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <!-- <a :href="testLink" target="_blank">VSCode</a> -->
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="testModal">open modal</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
