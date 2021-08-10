<template>
  <form class="login-form" @submit.prevent="login">
    <input type="text" name="email" id="email" v-model="email" />
    <input type="password" name="password" id="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  data() {
    return {
      email: 'test123@email.com',
      password: '',
    };
  },
  methods: {
    login(): void {
      // fetch for User data from an API
      const user = { email: this.email, password: this.password };
      this.$store.commit('login', user);

      // fetch for User's active challenge
      const activeChallenge = this.$store.state.activeChallenge;

      if (activeChallenge?.id) {
        this.$router.push('/challenge/active');
      } else {
        this.$router.push('/challenge/new');
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
