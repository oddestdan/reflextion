import express = require('express');
import { startNewChallenge } from '../../services';
import { fakeData } from '../../utils';

const router = express.Router();

router.post('/challenge', (req, res) => {
  const newChallenge = startNewChallenge(
    fakeData.tasks,
    fakeData.challenges,
    31,
    5
  );
  fakeData.challenges.push(newChallenge);
  console.log(newChallenge);

  return res.json({
    id: newChallenge.id,
    message: 'New challenge successfully created',
  });
});

module.exports = router;
