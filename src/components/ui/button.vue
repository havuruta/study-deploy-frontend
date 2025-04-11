<template>
  <button
    :class="['px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600', $attrs.class]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});
</script> 