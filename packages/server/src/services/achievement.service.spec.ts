import { achievementsMock } from './__mocks__/achievement.mock';
import { challengesMock } from './__mocks__/challenge.mock';
import { calculateAchievementsStatus } from './index';
import { StatusState } from '../enums';
import { getActualAchievements } from './achievement.service';

describe('achievement service', () => {
  describe('calculateAchievementsStatus', () => {
    it('should return achievements status for the challenge', () => {
      const testDate = new Date();
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
  });

  describe('get', () => {
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
  });
});
