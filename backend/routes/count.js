const express = require('express');
const router = express.Router();
const Count = require('../models/Count');

function getTodayDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}
// Helper function to get or create today's count
async function getTodayCount() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let dailyCount = await Count.findOne({ date: today });

    if (!dailyCount) {
        dailyCount = new Count({ date: today, count: 0 });
        await dailyCount.save();
    }

    return dailyCount;
}

router.get('/daily-count', async (req, res) => {
    try {
        const today = getTodayDate();
        let dailyCount = await Count.findOne({ date: today });

        if (!dailyCount) {
            dailyCount = new Count({ date: today });
            await dailyCount.save();
        }

        res.json({
            right: dailyCount.right,
            haina: dailyCount.haina,
            basically: dailyCount.basically
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching daily count' });
    }
});
router.post('/update-count', async (req, res) => {
    try {
        const { category, change } = req.body;
        const today = getTodayDate();
        
        let dailyCount = await Count.findOne({ date: today });

        if (!dailyCount) {
            dailyCount = new Count({ date: today });
        }

        dailyCount[category] += change;
        await dailyCount.save();

        res.json({
            right: dailyCount.right,
            haina: dailyCount.haina,
            basically: dailyCount.basically
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating daily count' });
    }
});
router.get('/all-counts', async (req, res) => {
    try {
        const allCounts = await Count.find({}).sort({ date: 1 });
        res.json(allCounts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching all counts' });
    }
});
module.exports = router;