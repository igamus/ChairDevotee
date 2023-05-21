const express = require('express');
const router = express.Router();
const { Review, ReviewImage, User, Spot, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const validateUrl = [
    check('url')
        .isURL()
        .withMessage('Must use a valid url'),
    handleValidationErrors
];


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
    });

    return res.json({ Reviews: reviews })
});

router.post('/:reviewId/images', [requireAuth, validateUrl], async (req, res) => {
    const { url } = req.body;
    const reviewId = req.params.reviewId;
    const queryReview = await Review.findOne({
        where: {
            id: reviewId
        },
        include: [
            {
                model: ReviewImage
            }
        ]
    });

    if (!queryReview) return res.status(404).json({message: "Review couldn't be found"});

    if (queryReview.userId !== req.user.id) return res.status(403).json({message: 'Forbidden'});

    if (queryReview.ReviewImages.length >= 10) return res.status(403).json({message: 'Maximum number of images for this resource was reached'});

    await ReviewImage.create({
        reviewId: reviewId,
        url: url
    });

    const postedReviewImage = await ReviewImage.findOne({
        where: {
            [Op.and]: [{reviewId: reviewId, url: url}]
        },
        attributes: ['id','url']
    });

    return res.json(postedReviewImage);
});

module.exports = router;
