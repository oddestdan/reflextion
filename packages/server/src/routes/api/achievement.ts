import express = require('express');
import { getActualAchievements } from '../../services';
import { fakeData } from '../../utils';

const router = express.Router();

router.get('/achievement/:id', (req, res) => {
  try {
    const actualAchievements = getActualAchievements(
      req.params.id,
      fakeData.challenges
    );

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
