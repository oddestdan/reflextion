import { achievementsMock } from './__mocks__/achievement.mock';
import { challengesMock } from './__mocks__/challenge.mock';
import { calculateAchievementsStatus } from './index';
import { StatusState } from '../enums';
import {
  checkAchievementComplete,
  getActualAchievements,
} from './achievement.service';

describe('achievement service', () => {
  describe('checkAchievementComplete', () => {
    let updated: Date;
    beforeEach(() => {
      updated = new Date();
    });
    it('should return "Failure" if there are any failed tasks', () => {
      const status = checkAchievementComplete({
        '1': { state: StatusState.Failure, updated },
        '2': { state: StatusState.Pending, updated },
        '3': { state: StatusState.Success, updated },
      });
      expect(status).toEqual(StatusState.Failure);
    });
    it('should return "Pending" if there are any pending and no failed tasks', () => {
      const status = checkAchievementComplete({
        '1': { state: StatusState.Success, updated },
        '2': { state: StatusState.Pending, updated },
        '3': { state: StatusState.Success, updated },
      });
      expect(status).toEqual(StatusState.Pending);
    });
    it('should return "Success" if all tasks were completed in time', () => {
      const status = checkAchievementComplete({
        '1': { state: StatusState.Success, updated },
        '2': { state: StatusState.Success, updated },
        '3': { state: StatusState.Success, updated },
      });
      expect(status).toEqual(StatusState.Success);
    });

    describe('edge cases', () => {
      it('should return undefined if task Status is an empty object', () => {
        const status = checkAchievementComplete({});
        expect(status).toEqual(undefined);
      });
    });
  });

  describe('calculateAchievementsStatus', () => {
    describe('achievements statuses by challenge tasks', () => {
      let testDate: Date;

      beforeEach(() => {
        testDate = new Date();
      });
      it('should return achievements status for the challenge', () => {
        const achievementsStatusMap = calculateAchievementsStatus(
          achievementsMock.achievements,
          {
            state: StatusState.Pending,
            updated: testDate,
          }
        );

        Object.values(achievementsStatusMap).forEach((a) => {
          expect(a.state).toEqual(StatusState.Pending);
          expect(a.updated).toEqual(testDate);
        });
      });

      describe('edge cases', () => {
        it('should return empty "State" object if achievement list is empty', () => {
          const achievementsStatusMap = calculateAchievementsStatus([], {
            state: StatusState.Success,
            updated: testDate,
          });
          expect(achievementsStatusMap).toEqual({});
        });
      });
    });
  });

  describe('getActualAchievements', () => {
    it('should return achievements status for the challenge', () => {
      const actualAchievements = getActualAchievements(
        '2',
        challengesMock.challenges
      );

      expect(actualAchievements[0].description).toEqual(
        'Complete half of the tasks'
      );
      expect(actualAchievements[0].status.state).toEqual(StatusState.Pending);
    });

    describe('edge cases', () => {
      it('should return undefined if no current challenge was found by id', () => {
        expect(getActualAchievements('-1', challengesMock.challenges)).toEqual(
          undefined
        );
      });
      it('should return undefined if the challenge list is empty', () => {
        expect(getActualAchievements('1', [])).toEqual(undefined);
      });
    });
  });
});
