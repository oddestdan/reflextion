import { ChallengeState } from '../enums';
import { Achievement, Challenge } from '../models';
import { startNewChallenge } from './challenge.service';
import { achievementsMock } from './__mocks__/achievement.mock';
import { challengesMock } from './__mocks__/challenge.mock';
import { tasksMock } from './__mocks__/task.mock';

const mapToAchievementId = (achievement: Achievement): string => achievement.id;

describe('challenge service', () => {
  describe('startNewChallenge', () => {
    let newChallenge: Challenge;

    beforeEach(() => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date('June 16, 2021'));
    });

    it('should return a new challenge', () => {
      newChallenge = startNewChallenge(
        tasksMock.tasks,
        challengesMock.challenges,
        undefined,
        undefined
      );
      expect(newChallenge).toBeTruthy();
    });

    it('should have next id as new challenge id', () => {
      expect(newChallenge.id).toEqual('3');
    });
    it('should have set date as start date', () => {
      expect(newChallenge.startDate).toEqual(new Date('June 16, 2021'));
    });
    it('should have a state of InProgress upon creation', () => {
      expect(newChallenge.state).toEqual(ChallengeState.InProgress);
    });
    it('should have a shuffled, random set of tasks', () => {
      expect(newChallenge.tasksOrder.size).toEqual(30);
    });
    it('should have 30 / 6 = 5 achievements by default', () => {
      expect(newChallenge.achievementsOrder.size).toEqual(5);
    });
    it('should have two base achievements by default', () => {
      const [default1, default2] =
        achievementsMock.defaultAchievements.map(mapToAchievementId);

      const newChallengeAchievementIds = Array.from(
        newChallenge.achievementsOrder
      ).map(mapToAchievementId);

      expect(newChallengeAchievementIds).toContain(default1);
      expect(newChallengeAchievementIds).toContain(default2);
    });

    afterEach(() => {
      jest.useRealTimers();
    });
  });
});
