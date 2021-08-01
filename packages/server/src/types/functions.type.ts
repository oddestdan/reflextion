import { ObjectId } from 'mongoose';
import {
  Achievement,
  ActualAchievement,
  ArchiveItem,
  Challenge,
  Status,
  Task,
  TaskForToday,
} from '../models';

/**
 * Returns a current task with its status by the challenge id.
 * @category Functions
 * @param challengeId Id of a challenge.
 * @param challenges Array of challenges for a new challenge.
 * @returns TaskForToday Current task with its status.
 */
export type GetTaskForToday = (
  challengeId: string,
  challenges: Challenge[]
) => TaskForToday | undefined;

/**
 * Returns a new challenge. Challenge duration that by default should be
 * 30 days, number of achievements – by default, challenge duration / 6.
 * @category Functions
 * @param tasks Array of tasks for a new challenge.
 * @param challenges Array of challenges for a new challenge.
 * @param challengeDuration New challenge duration.
 * @param achievementsCount Number of achievements for a new challenge.
 * @returns Challenge New challenge.
 */
export type StartNewChallenge = (
  tasks: Task[],
  challenges: Challenge[],
  assignedUserId: ObjectId,
  challengeDuration: number,
  achivementsCount: number
) => Challenge;

/**
 * Returns all past tasks with their results by the challenge id.
 * @category Functions
 * @param challengeId Id of challenge.
 * @param challenges Array of challenges for a new challenge.
 * @returns ArchiveItem[] Array of past tasks with their results.
 */
export type GetTaskArchive = (
  challengeId: string,
  challenges: Challenge[]
) => ArchiveItem[];

/**
 * Returns achievements status for the challenge by its achievements list
 * and tasks status.
 * @category Functions
 * @param achievements List of an achievements.
 * @param tasksStatuses Tasks completion status.
 * @returns AchievementsStatusMap Map of achivement ids and their statuses.
 */
export type CalculateAchievementsStatus = (
  achievements: Achievement[],
  tasksStatus: Status
) => Record<string, Status>;

/**
 * Returns a list of actual achievements by the challenge id.
 * @category Functions
 * @param challengeId Id of a challenge.
 * @param challenges Array of challenges for a new challenge.
 * @returns ActualAchievement[] Array of actual achievements.
 */
export type GetActualAchievements = (
  challengeId: string,
  challenges: Challenge[]
) => ActualAchievement[];
