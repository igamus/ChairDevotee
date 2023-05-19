const express = require('express');
const router = express.Router();
const { setTokenCookie } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize } = require('../../db/models');

router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;
    console.log(spotId);
    // should really be able to check before querying...
    const spotQuery = await Spot.findOne({
        attributes: {
            include: [
                [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating']
            ]
        },
        include: [
            {
                model: Review,
                attributes: [],
                required: false
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview'],
                required: false
            }
        ],
        where: {
            id: spotId
        }
    });
    let targetSpotData = spotQuery.toJSON();
    console.log(targetSpotData);

    if (!targetSpotData.id) res.status(404).json({message: "Spot couldn't be found."});

    if (targetSpotData.ownerId) { // probably something direct you can do with subquerying
        const ownerQuery = await User.findOne({
            attributes: ['id', 'firstName','lastName'],
            where: {
                id: targetSpotData.ownerId
            }
        });
        const owner = ownerQuery.toJSON();
        targetSpotData.Owner = owner;
    }

    await setTokenCookie(res, targetSpotData);

    return res.json(targetSpotData);
});

router.get('/', async (req, res,) => {
    const data = await Spot.findAll({
        // should just be a clean way to get the average for each
        include: [
            {
                model: Review,
                attributes: ['stars'],
                required: false
            },
            {
                model: SpotImage,
                attributes: ['url'],
                where: {preview: true},
                limit: 1,
                required: false
            }
        ]
    });

    const spots = []; // shouldn't have to use js to format and crunch numbers...

    for (const spot of data) {
        let previewImage;
        if (spot.SpotImages.length) previewImage = spot.SpotImages[0].url;
        else previewImage = null;

        let avgRating;
        if (spot.Reviews.length) {
            let sum = spot.Reviews.reduce((a, cv) => a + cv.stars, 0);
            avgRating = sum / spot.Reviews.length;
        } else avgRating = null; // there's got to be a more efficient way than this...

        spots.push({ // there has to be a better way to extract the data... (or at least some shorthand)
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating,
            previewImage
        })
    }

    await setTokenCookie(res, spots);

    return res.json({ Spots: spots });
});

module.exports = router;
