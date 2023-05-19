const express = require('express');
const router = express.Router();
const { Review, ReviewImage, User, Spot, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: ReviewImage,
                attributes: ['id','url'],
                required: false
            },
            {
                model: Spot,
                exclude: ['createdAt', 'updatedAt'],
                required: false
            }
        ]
    })

    return res.json({ Reviews: reviews })
});

module.exports = router;
