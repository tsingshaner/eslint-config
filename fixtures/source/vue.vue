<script lang="ts" setup>
import { defineOptions } from 'vue'

defineOptions({
  name: 'VueTest'
})

const _t = 1

if (Math.random() < 1) {
  console.info("test")
}

const _obj = {
  b: 2,
  c: 2,
}
</script>

<template>
  <h1 alt="1" class="mx-10 mx-22 h-10" role="menu" title="tes">
    test
  </h1>
</template>
