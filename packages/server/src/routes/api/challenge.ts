import express = require('express');
import { ChallengeModel } from '../../models';
import { startNewChallenge } from '../../services';
import { fakeData } from '../../utils';

const router = express.Router();

router.post('/challenge', async (req, res) => {
  // TODO: create an interface for _id / email UserDTO
  const { user }: any = req;
  const newChallenge = startNewChallenge(
    fakeData.tasks,
    fakeData.challenges,
    user._id,
    31,
    5
  );
  fakeData.challenges.push(newChallenge);
  const savedChallenge = await new ChallengeModel(newChallenge).save();

  return res.json({
    id: newChallenge.id,
    message: 'New challenge successfully created',
    challenge: savedChallenge,
  });
});

router.get('/challenge/active', async (req, res) => {
  const { user }: any = req;
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
