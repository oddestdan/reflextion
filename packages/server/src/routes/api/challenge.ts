import * as express from 'express';
import { Request } from '../../dto';
import { ChallengeModel, TaskModel } from '../../models';
import { startNewChallenge } from '../../services';

const router = express.Router();

router.post('/challenge', async ({ user }: Request, res) => {
  const tasks = await TaskModel.find();
  const challenges = await ChallengeModel.find();
  const newChallenge = startNewChallenge(tasks, challenges, user._id, 31, 5);
  const savedChallenge = await new ChallengeModel(newChallenge).save();

  return res.json({
    id: newChallenge.id,
    message: 'New challenge successfully created',
    challenge: savedChallenge,
  });
});

router.get('/challenge/active', async ({ user }: Request, res) => {
  const activeChallenge = await ChallengeModel.findOne({
    assignedUserId: user._id,
  });

  if (!activeChallenge) {
    return res.json({
      message: 'No challenge assigned to this user yet',
      challenge: null,
    });
  }

  return res.json({
    message: 'Active challenge for user found',
    challenge: activeChallenge,
  });
});

module.exports = router;
