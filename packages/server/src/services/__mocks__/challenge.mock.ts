import { ChallengeState, StatusState } from '../../enums';
import { Challenge } from '../../models';
import { achievementsMock } from './achievement.mock';
import { tasksMock } from './task.mock';

export const challengesMock = {
  challenges: [
    {
      id: '1',
      state: ChallengeState.InProgress,
      startDate: new Date('June 15, 2021'),
      tasksOrder: new Set(tasksMock.tasks.slice(0, 3)),
      tasksStatus: {
        '0': { state: StatusState.Pending, updated: new Date() },
        '1': { state: StatusState.Pending, updated: new Date() },
        '2': { state: StatusState.Pending, updated: new Date() },
      },
      achievementsOrder: new Set([
        ...achievementsMock.defaultAchievements,
        ...achievementsMock.achievements.slice(0, 3),
      ]),
      achievementsStatus: {
        '0': { state: StatusState.Pending, updated: new Date() },
        '1': { state: StatusState.Pending, updated: new Date() },
        '2': { state: StatusState.Success, updated: new Date() },
      },
    },
    {
      id: '2',
      state: ChallengeState.InProgress,
      startDate: new Date('June 15, 2021'),
      tasksOrder: new Set(tasksMock.tasks.slice(0, 4)),
      tasksStatus: {
        '1': { state: StatusState.Pending, updated: new Date() },
        '2': { state: StatusState.Pending, updated: new Date() },
        '3': { state: StatusState.Pending, updated: new Date() },
        '4': { state: StatusState.Pending, updated: new Date() },
      },
      achievementsOrder: new Set([
        ...achievementsMock.defaultAchievements,
        ...achievementsMock.achievements.slice(0, 3),
      ]),
      achievementsStatus: {
        '1': { state: StatusState.Pending, updated: new Date() },
        '2': { state: StatusState.Pending, updated: new Date() },
        '3': { state: StatusState.Success, updated: new Date() },
        '4': { state: StatusState.Pending, updated: new Date() },
        '5': { state: StatusState.Pending, updated: new Date() },
      },
    },
  ],
} as { challenges: Challenge[] };
