import { ChallengeState, StatusState } from '../enums';

const seeder = require('mongoose-seed');

const tasksSeed = {
  model: 'Task',
  documents: [
    { description: 'Go to bed before 11:00 PM' },
    { description: 'Take a picture of a sunset' },
    {
      description: 'Make a small present for your friend without a reason',
    },
    { description: 'Try a new cooking recipe' },
    { description: 'Meditate for at least 10 minutes' },
    { description: 'Call your family' },
    { description: 'Eat your breakfast in bed' },
    { description: 'Spend 20 minutes reading poetry out loud' },
    {
      description: 'Write down at least five things you feel gratitude for',
    },
    {
      description:
        'Find a song you liked in adolescence and sing it like in karaoke',
    },
    {
      description:
        'Send a short letter to future You in one year using futureme.org',
    },
    {
      description: 'Watch an old classic movie of your favorite genre',
    },
    {
      description:
        'Spend an hour playing a new trending computer/video/mobile game',
    },
    { description: 'Go for a walk to the nearest park' },
    {
      description: 'Send 10$ to any charity organization you trust',
    },
    {
      description: 'Find out a new podcast and listen to a first episode',
    },
    { description: 'Quit social media for at least one day' },
    {
      description: 'Write down at least five things you are good at',
    },
    { description: 'Take a cold shower' },
    { description: 'Clean up your laptop and mobile screens' },
    {
      description:
        "Pick up at least ten stuff you don't use and donate/sell/recycle them",
    },
    { description: 'Smile to a stranger' },
    { description: "Taste something you've never tried before" },
    {
      description:
        'Write down your five best guesses about the future and send them to future You in five years using futureme.org',
    },
    {
      description: 'Order take away meal from your favorite restaurant',
    },
    {
      description:
        "Find out more about an artist you know the name but haven't seen their work",
    },
    {
      description: 'Play drawasaurus.org with your friends online',
    },
    {
      description:
        'Take a picture of the most beautiful building on your street',
    },
    {
      description: 'Do you morning exercise for at least 20 minutes',
    },
    {
      description:
        'Become a patron for a creator you like on patreon.com or a similar service',
    },
  ],
};

const achievementsSeed = {
  model: 'Achievement',
  documents: [
    { isDefault: true, description: 'Complete half of the tasks', icon: '' },
    { isDefault: true, description: 'Complete all tasks', icon: '' },
    { description: 'Complete each task 7 days in a row', icon: '' },
    { description: 'Complete five tasks before 8:00 AM', icon: '' },
    { description: "Complete 4 Monday's tasks", icon: '' },
    { description: "Complete 4 Friday's tasks", icon: '' },
  ],
};

const challengesSeed = {
  model: 'Challenge',
  documents: [
    {
      state: ChallengeState.InProgress,
      startDate: new Date('July 4, 2021'),
      tasksOrder: new Set(tasksSeed.documents.slice(0, 3)),
      tasksStatus: {
        '0': { state: StatusState.Pending, updated: new Date() },
        '1': { state: StatusState.Pending, updated: new Date() },
        '2': { state: StatusState.Pending, updated: new Date() },
      },
      achievementsOrder: new Set(achievementsSeed.documents),
      achievementsStatus: {
        '0': { state: StatusState.Pending, updated: new Date() },
        '1': { state: StatusState.Pending, updated: new Date() },
        '2': { state: StatusState.Success, updated: new Date() },
      },
    },
    {
      state: ChallengeState.InProgress,
      startDate: new Date('July 4, 2021'),
      tasksOrder: new Set(tasksSeed.documents.slice(0, 4)),
      tasksStatus: {
        '1': { state: StatusState.Pending, updated: new Date() },
        '2': { state: StatusState.Pending, updated: new Date() },
        '3': { state: StatusState.Pending, updated: new Date() },
        '4': { state: StatusState.Pending, updated: new Date() },
      },
      achievementsOrder: new Set(achievementsSeed.documents),
      achievementsStatus: {
        '1': { state: StatusState.Pending, updated: new Date() },
        '2': { state: StatusState.Pending, updated: new Date() },
        '3': { state: StatusState.Success, updated: new Date() },
        '4': { state: StatusState.Pending, updated: new Date() },
        '5': { state: StatusState.Pending, updated: new Date() },
      },
    },
  ],
};

const usersSeed = {
  model: 'User',
  documents: [{ email: 'Test', password: 'Test' }],
};

const seedData = [achievementsSeed, challengesSeed, tasksSeed, usersSeed];

export const seedDatabase = (dbURI: string): void => {
  seeder.connect(dbURI, () => {
    seeder.loadModels([
      'src/models/achievement.model.ts',
      'src/models/challenge.model.ts',
      'src/models/task.model.ts',
      'src/models/user.model.ts',
    ]);

    seeder.clearModels(['Achievement', 'Challenge', 'Task', 'User'], () => {
      seeder.populateModels(seedData, () => {
        seeder.disconnect();
      });
    });
  });
};
