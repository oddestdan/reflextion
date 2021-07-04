import express = require('express');
import { getTaskArchive, getTaskForToday } from '../../services';
import { fakeData } from '../../utils';

const router = express.Router();

router.get('/task/:id', (req, res) => {
  try {
    const taskForToday = getTaskForToday(req.params.id, fakeData.challenges);

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

router.get('/task/archive/:id', (req, res) => {
  try {
    const taskArchive = getTaskArchive(req.params.id, fakeData.challenges);

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
