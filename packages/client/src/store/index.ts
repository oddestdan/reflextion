import { createStore } from 'vuex';
import users from '@/data/users.json';
import challenges from '@/data/challenges.json';
import achievements from '@/data/achievements.json';
import tasks from '@/data/tasks.json';

export default createStore({
  state: {
    activeChallenge: {},
    activeFailed: false,
    user: {},
  },
  mutations: {
    login(state, userData): void {
      const user = users.find((u) => u.email === userData.email);
      if (user) {
        state.user = user;
      }
    },

    startNewChallenge(state): void {
      const mockChallenge = challenges[0];
      mockChallenge.achievementsOrder = [
        ...achievements.defaultAchievements,
        ...achievements.achievements,
      ];
      mockChallenge.tasksOrder = tasks.slice(0, 10);

      console.log('starting a new challenge!', mockChallenge);
      state.activeChallenge = mockChallenge;
    },

    finishChallenge(state): void {
      // decide whether challenge failed or not by completing tasks and updating achievements' status
      const hasFailed = Boolean(Math.round(Math.random()));
      state.activeFailed = hasFailed;
    },
  },
});
