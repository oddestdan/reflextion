<template>
  <h2>Hello my friend</h2>

  <!-- TODO: extract as a separate component -->
  <div class="task-box">
    <p v-if="taskForToday.isCompleted">
      You've already completed your task for today. Well done!
    </p>
    <p v-else>This is your task for today:</p>

    <p>
      ({{ taskForToday.isCompleted ? '✅' : '❌' }})
      {{ taskForToday.description }}
    </p>
  </div>

  <router-link to="/task/archive">Task archive</router-link>

  <h3>Achievements</h3>
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
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  data() {
    return {
      achievements: this.$store.state.activeChallenge.achievementsOrder,
      taskForToday: {
        ...this.$store.state.activeChallenge.tasksOrder[0],
        isCompleted: false,
      },
    };
  },
  methods: {
    // should integrate with WS
    finishChallenge(): void {
      // evaluate active challenge's State (SUCCESS or FAILURE)
      this.$store.commit('finishChallenge');
      this.$router.push('/challenge/result');
    },
  },
  created() {
    // setTimeout(() => {
    // this.finishChallenge();
    // }, 3000);
  },
});
</script>

<style scoped lang="scss"></style>
