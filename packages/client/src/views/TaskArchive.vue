<template>
  <h2>Task archive</h2>
  <ul class="task-list">
    <li class="task" v-for="task in archivedTasks" :key="task">
      ({{ task.isCompleted ? '✅' : '❌' }})
      {{ task.description }}
    </li>
  </ul>
  <GoBack />
</template>

<script lang="ts">
import GoBack from '@/components/GoBack.vue';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  components: { GoBack },
  computed: {
    archivedTasks(): Array<any> {
      // fetch an API for archived tasks
      return this.$store.state.activeChallenge.tasksOrder;
    },
  },
});
</script>

<style scoped lang="scss"></style>
