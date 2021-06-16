import { Status } from './status.model';
import { Task } from './task.model';

/**
 * Achievement describes a set of several tasks accomplished
 * in the specific way.
 * @category Interfaces
 */
export interface Achievement {
  id: number | string;
  description: string;
  icon: string;
  checkComplete: (taskStatus: Map<Pick<Task, 'id'>, Status>) => Status;
}

/**
 * ActualAchievement provides information about an achievement
 * and its current status in scope of the challenge.
 * @category Interfaces
 */
export interface ActualAchievement
  extends Pick<Achievement, 'id' | 'description'> {
  image: string;
  status: Status;
}
