<template>
  <h2>Challenge {{ true ? 'succeeded' : 'failed' }}!</h2>

  <h3>Tasks: {{ actualTasks.length }}/{{ tasks.length }}</h3>
  <ul class="task-list">
    <li class="task" v-for="task in tasks" :key="task">
      ({{ task.isCompleted ? '✅' : '❌' }})
      {{ task.description }}
    </li>
  </ul>

  <h3>
    Achievements: {{ actualAchievements.length }}/{{ achievements.length }}
  </h3>
  <ul class="achievement-list">
    <li
      class="achievement"
      v-for="achievement in achievements"
      :key="achievement"
    >
      ({{ achievement.isCompleted ? '✅' : '❌' }})
      {{ achievement.description }}
    </li>
  </ul>

  <button @click="startNewChallenge">Start new 30 days challenge</button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  data() {
    return {
      tasks: this.$store.state.activeChallenge.tasksOrder,
      achievements: this.$store.state.activeChallenge.achievementsOrder,
    };
  },
  methods: {
    startNewChallenge(): void {
      // calls API to create a new challenge
      this.$store.commit('startNewChallenge');
      this.$router.push('/challenge/active');
    },
  },
  computed: {
    // TODO: calculate actual achievements by statuses
    actualAchievements(): Array<any> {
      return this.achievements.slice(0, 3);
    },
    // TODO: calculate actual tasks by statuses
    actualTasks(): Array<any> {
      return this.tasks.slice(0, 9);
    },
  },
});
</script>

<style scoped lang="scss"></style>
