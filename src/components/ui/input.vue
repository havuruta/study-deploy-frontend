<template>
  <input
    :class="['px-3 py-2 border rounded-md', $attrs.class]"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});
</script> 