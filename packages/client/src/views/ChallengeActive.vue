<template>
  <h2>Hello my {{ typeOS || 'default' }} friend</h2>

  <!-- TODO: extract as a separate component -->
  <div class="task-box">
    <p v-if="taskForToday.isCompleted">
      You've already completed your task for today. Well done!
    </p>
    <p v-else>This is your task for today:</p>

    <p @click="completeTask" class="completable-task">
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
import { getOS } from '@/utils';
import { VIBRATE_MS } from '@/config';

export default defineComponent({
  data() {
    return {
      typeOS: '',
      achievements: [],
      taskForToday: {
        isCompleted: false,
      },
    };
  },
  methods: {
    checkHasActiveChallenge(): void {
      const hasActiveChallenge = Boolean(this.$store.state.activeChallenge.id);
      if (hasActiveChallenge) {
        this.setupInitialData();
      } else {
        this.$router.push('/challenge/new');
      }
    },

    setupInitialData(): void {
      this.achievements = this.$store.state.activeChallenge.achievementsOrder;
      this.taskForToday = {
        ...this.$store.state.activeChallenge.tasksOrder[0],
        isCompleted: false, // TODO: infer from tasksStatuses
      };
    },

    completeTask(): void {
      this.taskForToday.isCompleted = true;
      window.navigator.vibrate(VIBRATE_MS);
    },

    determineOS(): void {
      this.typeOS = getOS();
    },

    // should integrate with WS
    finishChallenge(): void {
      // evaluate active challenge's State (SUCCESS or FAILURE)
      this.$store.commit('finishChallenge');
      this.$router.push('/challenge/result');
    },
  },
  created() {
    this.checkHasActiveChallenge();
    this.determineOS();

    // setTimeout(() => {
    // this.finishChallenge();
    // }, 3000);
  },
});
</script>

<style scoped lang="scss">
.completable-task {
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
}
</style>
