<template>
  <div class="go-back-wrapper">
    <button class="go-back-btn" @click="$router.go(-1)">Go Back</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'app-header',
};
</script>

<style scoped lang="scss">
.go-back {
  &-wrapper {
    display: flex;
    justify-content: center;
    margin: 20px 20px;
    align-items: center;
  }
  &-btn {
    margin: 10px 20px;
  }
}
</style>
