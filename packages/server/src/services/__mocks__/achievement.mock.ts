import { Achievement } from '../../models';

export const achievementsMock = {
  defaultAchievements: [
    { id: '1', description: 'Complete half of the tasks', icon: '' },
    { id: '2', description: 'Complete all tasks', icon: '' },
  ],
  achievements: [
    {
      id: '3',
      description: 'Complete each task 7 days in a row',
      icon: '',
    },
    {
      id: '4',
      description: 'Complete five tasks before 8:00 AM',
      icon: '',
    },
    { id: '5', description: "Complete 4 Monday's tasks", icon: '' },
    {
      id: '6',
      description: "Complete 4 Friday's tasks",
      icon: '',
    },
  ],
} as { achievements: Achievement[]; defaultAchievements: Achievement[] };
