import { ObjectId } from 'mongoose';
import { achievementsData } from '../data';
import { ChallengeState, StatusState } from '../enums';
import { Challenge, Task } from '../models';
import { StartNewChallenge } from '../types';
import { shuffleArray } from '../utils';
import { checkAchievementComplete } from './achievement.service';

export const startNewChallenge: StartNewChallenge = (
  tasks: Task[],
  challenges: Challenge[],
  assignedUserId: ObjectId,
  challengeDuration = 30,
  achivementsCount = challengeDuration / 6
): Challenge => {
  const maxChallengeId = Math.max(
    ...challenges.map((ch) => Number(ch.id))
  ).toString();

  const randomShuffledTasks = shuffleArray(tasks);
  const tasksOrder = new Set(randomShuffledTasks);
  const tasksStatus = {};
  Array.from(tasksOrder).forEach((_, id) => {
    tasksStatus[id] = StatusState.Pending;
  });

  const randomAchievements = shuffleArray(achievementsData.achievements).slice(
    0,
    achivementsCount - achievementsData.defaultAchievements.length
  );
  const achievementsOrder = new Set(
    [...achievementsData.defaultAchievements, ...randomAchievements].map(
      (a) => ({
        ...a,
        checkComplete: checkAchievementComplete,
      })
    )
  );
  const achievementsStatus = {};
  Array.from(achievementsOrder).forEach((_, id) => {
    achievementsStatus[id] = StatusState.Pending;
  });

  return {
    id: challenges.length ? `${+maxChallengeId + 1}` : '1',
    startDate: new Date(),
    state: ChallengeState.InProgress,
    tasksOrder,
    tasksStatus,
    achievementsOrder,
    achievementsStatus,
    assignedUserId,
  };
};
