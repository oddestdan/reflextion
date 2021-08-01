import * as express from 'express';
import { ChallengeModel } from 'src/models';
import { getActualAchievements } from '../../services';

const router = express.Router();

router.get('/achievement/:id', async (req, res) => {
  try {
    const challenges = await ChallengeModel.find();
    const actualAchievements = getActualAchievements(req.params.id, challenges);

    if (!actualAchievements) {
      return res.json({ status: `Unable to find actual achievements` });
    }

    return res.json({
      data: actualAchievements,
      status: `Received actual achievements by challenge id`,
    });
  } catch (error) {
    return res.status(500).json({ status: error.message });
  }
});

module.exports = router;
