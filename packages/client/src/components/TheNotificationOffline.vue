<template>
  <div class="notification-wrapper">
    <p>Your device is currently {{ isOnline ? 'online' : 'offline' }}!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
.notification {
  &-wrapper {
    align-items: center;
    background-color: #2c3e50;
    color: #ffffff;
    display: flex;
    justify-content: center;
    padding: 0 20px;
  }
}
</style>
