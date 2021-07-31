import SocketIO = require('socket.io');
import http = require('http');
import { calculateAchievementsStatus, getTaskForToday } from '../services';
import { StatusState } from '../enums';
import { achievementsMock } from '../services/__mocks__/achievement.mock';
import { challengesMock } from '../services/__mocks__/challenge.mock';

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

    socket.on('taskForTodayCompleted', (taskId: string) => {
      console.log(`task for today completed: id = "${taskId}"`);

      const taskForToday = getTaskForToday(taskId, challengesMock.challenges);
      if (!taskForToday) return;

      taskForToday.status = {
        state: StatusState.Success,
        updated: new Date(),
      };

      const achievementsStatusMap = calculateAchievementsStatus(
        achievementsMock.achievements,
        taskForToday.status
      );
      console.log(achievementsStatusMap);
    });
  });
}
