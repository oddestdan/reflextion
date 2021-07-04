import { StatusState } from '../enums';
import { getTaskArchive, getTaskForToday } from './task.service';
import { challengesMock } from './__mocks__/challenge.mock';

describe('task service', () => {
  describe('getTaskArchive', () => {
    it('should return all past tasks with their results', () => {
      const archive = getTaskArchive('2', challengesMock.challenges);
      expect(archive).toBeTruthy();
      expect(archive[1].status.state).toEqual(StatusState.Pending);
      expect(archive[1].description).toEqual('Take a picture of a sunset');
    });
  });

  describe('getTaskForToday', () => {
    let mockDateNow: () => number;

    beforeEach(() => {
      mockDateNow = Date.now;
      Date.now = jest.fn(() => new Date('June 16, 2021').getTime());
    });

    it('should return a task for today by challenge id', () => {
      const taskForToday = getTaskForToday('2', challengesMock.challenges);
      expect(taskForToday).toBeTruthy();
      expect(taskForToday.description).toEqual('Go to bed before 11:00 PM');
    });

    afterEach(() => {
      Date.now = mockDateNow;
    });
  });
});
