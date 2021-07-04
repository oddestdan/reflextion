import schedule = require('node-schedule');
import { addDays } from '../utils';
import { StatusState } from '../enums';
import {
  calculateAchievementsStatus,
  checkAchievementComplete,
  getTaskForToday,
} from '../services';
import { challengesMock } from '../services/__mocks__/challenge.mock';
import { achievementsMock } from '../services/__mocks__/achievement.mock';

export default function runScheduler(): void {
  const currentChallenge = challengesMock.challenges.find(
    (challenge) => challenge.id === '1'
  );
  console.log(currentChallenge);
  const challengeEndDate = addDays(currentChallenge.startDate, 30);

  // schedule for today's status task to Fail at 12 AM every day during the challenge
  const everydayFailJob = schedule.scheduleJob('00 12 * * 0-6', () => {
    const taskForToday = getTaskForToday('1', challengesMock.challenges);
    console.log(taskForToday);

    if (taskForToday && taskForToday.status.state !== StatusState.Success) {
      taskForToday.status = {
        state: StatusState.Failure,
        updated: new Date(),
      };
    }
  });

  // schedule to calculate achievements status and challenge state
  // at 12 AM of the last day of the challenge
  schedule.scheduleJob(challengeEndDate, () => {
    const taskForToday = getTaskForToday('1', challengesMock.challenges);
    console.log(taskForToday);

    if (!taskForToday) return;

    const achievementsStatusMap = calculateAchievementsStatus(
      achievementsMock.achievements,
      taskForToday.status
    );
    const statusState = checkAchievementComplete(achievementsStatusMap);
    console.log(achievementsStatusMap, statusState);

    everydayFailJob.cancel();
  });
}
