<script setup>
import { useRoute } from "vue-router";

const route = useRoute()
</script>

<template>
  <div class="detail top-page">
    <h2>{{ $route.params.id }}</h2>
  </div>
</template>

<style scoped lang="less">

</style>