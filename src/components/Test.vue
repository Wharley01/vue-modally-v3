<template>
  <div>
    <h1 class="txt-s-6">
      {{title}}
    </h1>
    <h1>
      Hello this is a test modal component
    </h1>
    <button @click="$emit('close','this is returned data')">
      Close test
    </button>
  </div>
</template>

<script>
export default {
  name: "Test",
  props:{
    title: String
  }
}
</script>

<style scoped>

</style>