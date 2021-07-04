import { Challenge } from '../models';
import { tasksMock as tasksData } from '../services/__mocks__/task.mock';
import { achievementsMock as achievementsData } from '../services/__mocks__/achievement.mock';
import { ChallengeState, StatusState } from '../enums';
import { getTomorrow } from './utils';

// TODO: remove after creating a database
const today = new Date();
const tomorrow = getTomorrow();

export const fakeData = {
  challenges: [
    {
      id: '1',
      state: ChallengeState.InProgress,
      startDate: today,
      tasksOrder: new Set(tasksData.tasks.slice(0, 3)),
      tasksStatus: {
        '0': { state: StatusState.Pending, updated: today },
        '1': { state: StatusState.Pending, updated: today },
        '2': { state: StatusState.Pending, updated: today },
      },
      achievementsOrder: new Set([
        ...achievementsData.defaultAchievements,
        ...achievementsData.achievements.slice(0, 3),
      ]),
      achievementsStatus: {
        '0': { state: StatusState.Pending, updated: today },
        '1': { state: StatusState.Pending, updated: today },
        '2': { state: StatusState.Success, updated: today },
      },
    },
    {
      id: '2',
      state: ChallengeState.InProgress,
      startDate: tomorrow,
      tasksOrder: new Set(tasksData.tasks.slice(0, 4)),
      tasksStatus: {
        '1': { state: StatusState.Pending, updated: today },
        '2': { state: StatusState.Pending, updated: today },
        '3': { state: StatusState.Pending, updated: today },
        '4': { state: StatusState.Pending, updated: today },
      },
      achievementsOrder: new Set([
        ...achievementsData.defaultAchievements,
        ...achievementsData.achievements.slice(0, 3),
      ]),
      achievementsStatus: {
        '1': { state: StatusState.Pending, updated: today },
        '2': { state: StatusState.Pending, updated: today },
        '3': { state: StatusState.Success, updated: today },
        '4': { state: StatusState.Pending, updated: today },
        '5': { state: StatusState.Pending, updated: today },
      },
    },
  ] as Challenge[],
  achievements: achievementsData,
  tasks: tasksData.tasks,
};
