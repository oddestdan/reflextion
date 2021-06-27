import { StatusState } from '../enums';

/**
 * Status describes a state of some item (a task or an achievement)
 * and a timestamp, when this state was updated.
 * @category Interfaces
 */
export interface Status {
  state: StatusState;
  updated: Date;
}
