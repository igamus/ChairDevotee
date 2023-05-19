const express = require('express');
const router = express.Router();
const { setTokenCookie } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');

router.get('/', async (req, res,) => {
    const data = await Spot.findAll({
        // attributes: { // there should just be a clean way to get the average for each, but right now it's getting the aggregate of all reviews and only returning one result
        //     include: [
        //         [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
        //     ],
        // },
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

    // const safeUser = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username };
    // in regular pull: id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updateedAt
    // avgRating: [avg of review.star]
    // previewImg: [url] [pull one]

    await setTokenCookie(res, spots);

    return res.json({ Spots: spots });
});

module.exports = router;
