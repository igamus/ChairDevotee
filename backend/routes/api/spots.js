const express = require('express');
const router = express.Router();
const { setTokenCookie } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .isFloat({min: -90, max: 90})
        .withMessage("Latitude is not valid"),
    check('lng')
        .isFloat({min: -180, max: 180})
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .isFloat()
        .withMessage("Price per day is required"),
    handleValidationErrors
]

router.get('/current', requireAuth, async (req, res) => {
    const querySpots = await Spot.findAll({
        where: { ownerId: req.user.id },
        include: [
            {
                model: Review,
                required: false
            },
            {
                model: SpotImage,
                where: { preview: true },
                required: false
            }
        ]
    });
    let userSpots = [];
    querySpots.forEach(e => userSpots.push(e.toJSON()));

    userSpots.forEach(spot => {
        if (spot.SpotImages.length) spot.previewImage = spot.SpotImages[0].url;
        else spot.previewImage = null;
        delete spot.SpotImages;

        if (spot.Reviews.length) {
            let reviews = spot.Reviews;
            let totalStars = reviews.reduce((a,c) => a + c.stars, 0);
            spot.avgRating = totalStars / reviews.length;
        } else spot.avgRating = null;
        delete spot.Reviews;
    });

    return res.json({Spots: userSpots});
});

router.put('/:spotId', [requireAuth, validateSpot], async (req, res) => {
    const spotId = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const userId = req.user.id;
    const querySpot = await Spot.findOne({ where: {id: spotId} });

    if (querySpot === null) return res.status(404).json({ "message": "Spot couldn't be found" });

    const targetSpot = querySpot.toJSON(); // do you need to convert to JSON here

    if (userId !== targetSpot.ownerId) return res.status(403).json({ message: "Forbidden" });

    querySpot.set({ address: address, city: city, state: state, country: country, lat: lat, lng: lng, name: name, description: description, price: price });
    querySpot.save();

    return res.json(querySpot);
});

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

    return res.json({ Spots: spots });
});

router.post('/', [requireAuth, validateSpot], async (req, res) => {
    const newSpot = await Spot.create({...req.body, ownerId: req.user.id});
    const retrieved = await Spot.findOne({where: {[Op.and]: [{lat: req.body.lat}, {lng: req.body.lng}]}});

    return res.status(201).json(retrieved);
});

module.exports = router;
