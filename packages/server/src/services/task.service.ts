import { Challenge, ArchiveItem, Task, TaskForToday } from '../models';
import { GetTaskArchive, GetTaskForToday } from '../types';
import { DAY } from '../utils';

export const getTaskForToday: GetTaskForToday = (
  challengeId: string,
  challenges: Challenge[]
): TaskForToday | undefined => {
  const requiredChallenge = challenges.find(
    (challenge) => challenge.id === challengeId
  );

  if (!requiredChallenge) return undefined;

  const today = Date.now();
  const taskForToday = Array.from(requiredChallenge.tasksOrder).find(
    (task) =>
      Number(task.id) ===
      Math.floor((today - requiredChallenge.startDate.getTime()) / DAY)
  );

  return taskForToday
    ? {
        ...taskForToday,
        status: requiredChallenge.tasksStatus[taskForToday.id],
      }
    : undefined;
};

export const getTaskArchive: GetTaskArchive = (
  challengeId: string,
  challenges: Challenge[]
): ArchiveItem[] | undefined => {
  const requiredChallenge = challenges.find(
    (challenge) => challenge.id === challengeId
  );

  if (!requiredChallenge) return undefined;

  return Array.from(requiredChallenge.tasksOrder).map(
    (task: Task): ArchiveItem => ({
      ...task,
      status: requiredChallenge.tasksStatus[task.id],
    })
  );
};
