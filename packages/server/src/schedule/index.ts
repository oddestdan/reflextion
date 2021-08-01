import * as schedule from 'node-schedule';
import { ChallengeModel } from 'src/models';
import { StatusState } from '../enums';
import { getTaskForToday } from '../services';

export default async function runScheduler(): Promise<void> {
  const challenges = await ChallengeModel.find();
  // schedule for today's status task to Fail at 12 AM every day during the challenge
  const everydayFailJob = schedule.scheduleJob('00 12 * * 0-6', () => {
    const taskForToday = getTaskForToday('1', challenges);
    console.log(taskForToday);

    if (taskForToday && taskForToday.status.state !== StatusState.Success) {
      taskForToday.status = {
        state: StatusState.Failure,
        updated: new Date(),
      };
    }
  });

  // TODO:
  // const currentChallenge = challengesMock.challenges.find(
  //   (challenge) => challenge.id === '1'
  // );
  // const challengeEndDate = addDays(currentChallenge.startDate, 30);
  // schedule to calculate achievements status and challenge state
  // at 12 AM of the last day of the challenge
  // schedule.scheduleJob(challengeEndDate, () => {
  //   const taskForToday = getTaskForToday('1', challenges);

  //   if (!taskForToday) return;

  //   const achievementsStatusMap = calculateAchievementsStatus(
  //     achievementsMock.achievements,
  //     taskForToday.status
  //   );
  //   const statusState = checkAchievementComplete(achievementsStatusMap);
  //   console.log(achievementsStatusMap, statusState);

  //   everydayFailJob.cancel();
  // });
}
