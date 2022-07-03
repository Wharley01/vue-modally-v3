<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { inject } from 'vue';
const logOut = inject('log-out')
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png"  @click="logOut"/>
  <ModalRoot/>
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <my-header>
    <template #title>Hello World title</template>
    <template #author>Hello World title</template>
  </my-header>
    <a :href="testLink" target="_blank">VSCode</a>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
