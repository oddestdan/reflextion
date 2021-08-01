import * as mongoose from 'mongoose';
import { StatusState } from 'src/enums';
import { Status } from './status.model';

/**
 * Achievement describes a set of several tasks accomplished
 * in the specific way.
 * @category Interfaces
 */
export interface Achievement extends mongoose.Document {
  id: string;
  description: string;
  icon: string;
  checkComplete: (taskStatus: Record<string, Status>) => StatusState;
}

/**
 * ActualAchievement provides information about an achievement
 * and its current status in scope of the challenge.
 * @category Interfaces
 */
export interface ActualAchievement extends Omit<Achievement, 'checkComplete'> {
  status: Status;
}

export const AchievementSchema = new mongoose.Schema({
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  isDefault: { type: Boolean, default: false },
});

export const AchievementModel = mongoose.model<Achievement>(
  'Achievement',
  AchievementSchema
);
