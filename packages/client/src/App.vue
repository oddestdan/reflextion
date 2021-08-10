<template>
  <!-- TODO: remove -->
  <div id="nav">
    <router-link to="/challenge/active">Active</router-link> |
    <router-link to="/challenge/new">New</router-link> |
    <router-link to="/challenge/result">Result</router-link> |
    <router-link to="/task/archive">Archive</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <!--  -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
