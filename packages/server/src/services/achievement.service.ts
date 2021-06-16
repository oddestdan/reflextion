import { StatusState } from '../enums';
import { Achievement, ActualAchievement, Challenge, Status } from '../models';
import { CalculateAchievementsStatus, GetActualAchievements } from '../types';

export const checkAchievementComplete = (
  taskStatus: Record<string, Status>
): StatusState => {
  const tasksResult = Object.values(taskStatus);
  if (tasksResult.some((task) => task.state === StatusState.Success)) {
    return StatusState.Failure;
  }
  if (tasksResult.some((task) => task.state === StatusState.Pending)) {
    return StatusState.Pending;
  }
  return StatusState.Success;
};

export const getActualAchievements: GetActualAchievements = (
  challengeId: string,
  challenges: Challenge[]
): ActualAchievement[] => {
  const requiredChallenge = challenges.find(
    (challenge) => challenge.id === challengeId
  );

  if (!requiredChallenge) return undefined;

  return Array.from(requiredChallenge.achievementsOrder).map(
    ({ id, description, icon }: Achievement) => ({
      id,
      description,
      icon,
      status: requiredChallenge.achievementsStatus[id],
    })
  );
};

export const calculateAchievementsStatus: CalculateAchievementsStatus = (
  achievements: Achievement[],
  tasksStatus: Status
): Record<string, Status> => {
  const achievementsStatusMap: Record<string, Status> = {};

  achievements.forEach((achievement) => {
    achievementsStatusMap[achievement.id] = tasksStatus;
  });

  return achievementsStatusMap;
};
