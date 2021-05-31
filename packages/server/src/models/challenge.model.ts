import { ChallengeState } from '@enums';
import { Status } from './status.model';
import { Task } from './task.model';

/**
 * Challenge describes a 30-days period, during which randomly chosen
 * 30 tasks and 5 achievements are assigned for the user.
 * @category Interfaces
 */
export interface Challenge {
  id: number | string;
  state: ChallengeState;
  startDate: Date;
  tasksOrder: Set<Task>;
  tasksStatus: Map<Pick<Task, 'id'>, Status>;
  achievementStatus: Map<Pick<Task, 'id'>, Status>;
}
