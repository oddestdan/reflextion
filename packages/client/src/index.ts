import { io } from 'socket.io-client';

const ioConnection = io('http://localhost:8080');

ioConnection.on('connect', () => {
  ioConnection.emit('taskForTodayCompleted', '1');
});
