<template>
  <p>Let's start your brand-new challenge for the next 30 days!</p>
  <button @click="startNewChallenge">Start new 30 days challenge</button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  methods: {
    startNewChallenge(): void {
      // calls API to create a new challenge
      this.$store.commit('startNewChallenge');
      this.$router.push('/challenge/active');
    },
  },
});
</script>

<style scoped lang="scss"></style>
