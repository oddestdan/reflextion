import * as mongoose from 'mongoose';
import { ChallengeState } from '../enums';
import { Achievement } from './achievement.model';
import { Status } from './status.model';
import { Task } from './task.model';

/**
 * Challenge describes a 30-days period, during which randomly chosen
 * 30 tasks and 5 achievements are assigned for the user. Starting from the first
 * day, the user will receive a new task every day, which should be completed before
 * the midnight, overwise it will be marked as failed. Achievements status is
 * calculated based on tasks completion. After 30 days the challenge could be successful
 * (>= 90% tasks completed) or failed (<90% tasks completed)
 * @category Interfaces
 */
export interface Challenge extends mongoose.Document {
  id: string;
  state: ChallengeState;
  startDate: Date; // start date -> 30 days -> end date
  tasksOrder: Set<Task>; // ordered set of tasks
  tasksStatus: Record<string, Status>; // 30 per challenge
  achievementsOrder: Set<Achievement>; // ordered set of achievements
  achievementsStatus: Record<string, Status>; // 5 per challenge
  assignedUserId: mongoose.ObjectId;
}

export const ChallengeSchema = new mongoose.Schema({
  state: { type: ChallengeState },
  startDate: { type: Date },
  tasksOrder: { type: Object, default: [] },
  tasksStatus: { type: Object },
  achievementsOrder: { type: Object, default: [] },
  achievementsStatus: { type: Object },
  assignedUserId: { type: mongoose.Types.ObjectId },
});

export const ChallengeModel = mongoose.model<Challenge>(
  'Challenge',
  ChallengeSchema
);
