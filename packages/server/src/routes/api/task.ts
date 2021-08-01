import * as express from 'express';
import { ChallengeModel } from 'src/models';
import { getTaskArchive, getTaskForToday } from '../../services';

const router = express.Router();

router.get('/task/:id', async (req, res) => {
  try {
    const challenges = await ChallengeModel.find();
    const taskForToday = getTaskForToday(req.params.id, challenges);

    if (!taskForToday) {
      return res.json({ status: `Unable to find today's task` });
    }

    return res.json({
      data: taskForToday,
      status: `Received today's task by challenge id`,
    });
  } catch (error) {
    return res.status(500).json({ status: error.message });
  }
});

router.get('/task/archive/:id', async (req, res) => {
  try {
    const challenges = await ChallengeModel.find();
    const taskArchive = getTaskArchive(req.params.id, challenges);

    if (!taskArchive) {
      return res.json({ status: `Unable to find task archive` });
    }

    return res.json({
      data: taskArchive,
      status: `Received task archive by challenge id`,
    });
  } catch (error) {
    return res.status(500).json({ status: error.message });
  }
});

module.exports = router;
