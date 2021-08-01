import * as SocketIO from 'socket.io';
import http from 'http';
import { calculateAchievementsStatus, getTaskForToday } from '../services';
import { StatusState } from '../enums';
import {
  Achievement,
  AchievementModel,
  Challenge,
  ChallengeModel,
} from '../models';

const connectServer = (httpServer: http.Server) =>
  new SocketIO.Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

export default function runSocketIO(httpServer: http.Server): void {
  const io = connectServer(httpServer);

  io.on('connection', (socket) => {
    console.log('connected socket', socket.id);

    socket.on('taskForTodayCompleted', async (taskId: string) => {
      console.log(`task for today completed: id = "${taskId}"`);

      const challenges: Challenge[] = await ChallengeModel.find();
      const taskForToday = getTaskForToday(taskId, challenges);
      if (!taskForToday) return;

      taskForToday.status = {
        state: StatusState.Success,
        updated: new Date(),
      };

      const achievements: Achievement[] = await AchievementModel.find();
      const achievementsStatusMap = calculateAchievementsStatus(
        achievements,
        taskForToday.status
      );
      console.log(achievementsStatusMap);
    });
  });
}
