import mongoose = require('mongoose');
import { StatusState } from 'src/enums';
import { Status } from './status.model';

/**
 * Achievement describes a set of several tasks accomplished
 * in the specific way.
 * @category Interfaces
 */
export interface Achievement {
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

export const AchievementModel = mongoose.model(
  'Achievement',
  new mongoose.Schema({
    description: { type: String, default: '' },
    icon: { type: String, default: '' },
    isDefault: { type: Boolean, default: false },
  })
);
