import mongoose = require('mongoose');
import { Status } from './status.model';

/**
 * Task describes a single action that should be done by the user.
 * @category Interfaces
 */
export interface Task {
  id: string;
  description: string;
}

/**
 * TaskForToday provides information about a current task for today
 * and its status.
 * @category Interfaces
 */
export interface TaskForToday extends Task {
  status: Status;
}

/**
 * ArchiveItem describes a task and its status for all past tasks
 * in the challenge.
 * @category Interfaces
 */
export interface ArchiveItem extends Task {
  status: Status;
}

export const TaskModel = mongoose.model(
  'Task',
  new mongoose.Schema({
    description: { type: String, default: '' },
  })
);
