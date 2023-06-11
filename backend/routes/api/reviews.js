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

const validateReviewUpdate = [
    check('review')
        .exists({checkFalsy: true})
        .withMessage('Review text is required'),
    check('stars')
        .isInt({min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
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

    const newReviewImage = await ReviewImage.create({
        reviewId: reviewId,
        url: url
    });

    // const postedReviewImage = await ReviewImage.findOne({
    //     where: {
    //         [Op.and]: [{reviewId: reviewId, url: url}]
    //     },
    //     attributes: ['id','url']
    // });

    return res.json(newReviewImage);
});

router.put('/:reviewId', [requireAuth, validateReviewUpdate], async (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const { review, stars } = req.body;

    const queryReview = await Review.findByPk(reviewId);

    if (!queryReview) return res.status(404).json({message: "Review couldn't be found"});

    if (queryReview.userId !== userId) return res.status(403).json({message: 'Forbidden'});

    await queryReview.update({review: review, stars: stars});

    const updatedReview = await Review.findByPk(reviewId);

    return res.json(updatedReview);
});

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);

    if (!review) return res.status(404).json({message: "Review couldn't be found"})

    if (review.userId !== userId) return res.status(403).json({message: 'Forbidden'});

    await review.destroy();

    return res.json({message: 'Successfully deleted'});
});

module.exports = router;
