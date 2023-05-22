const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review, ReviewImage, User, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, where } = require('sequelize');

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
];

const validateQuery = [
    check('page')
        .optional()
        .isInt({min: 1})
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional()
        .isInt({min: 1})
        .withMessage('Size must be greater than or equal to 1'),
    check('maxLat')
        .optional()
        .isFloat()
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .optional()
        .isFloat()
        .withMessage('Minimum latitude is invalid'),
    check('minLng')
        .optional()
        .isFloat()
        .withMessage('Maximum longitude is invalid'),
    check('maxLng')
        .optional()
        .isFloat()
        .withMessage('Minimum longitude is invalid'),
    check('minPrice')
        .optional()
        .isFloat({min: 0})
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional()
        .isFloat({min: 0})
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .isInt({min:1, max:5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

const validateBooking = [
    check('startDate')
        .isDate()
        .withMessage('startDate must be a valid date'),
    check('endDate')
        .isDate()
        .withMessage('endDate must be a valid date'),
    check('endDate')
        .custom((endDate, { req }) => endDate > req.body.startDate)
        .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
];

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

router.post('/:spotId/reviews', [requireAuth, validateReview], async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { review, stars } = req.body;
    const spot = await Spot.findOne({
        where: {id: spotId},
        include: [
            {
                model: Review,
                attributes: ['userId'],
                where: { userId: userId },
                required: false
            }
        ]
    });

    if (!spot) return res.status(404).json({message: "Spot couldn't be found"});

    if (spot.Reviews.length) return res.status(500).json({message: 'User already has a review for this spot'});

    await Review.create({
        userId: userId,
        spotId: spotId,
        review: review,
        stars: stars
    });

    const postedReview = await Review.findOne({
        where: {
            [Op.and]: [
                {
                    userId: userId
                },
                {
                    spotId: spotId
                }
            ]
        }
    })

    return res.status(201).json(postedReview);
});

router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) res.status(404).json({"message": "Spot couldn't be found"})

    const reviews = await Review.findAll({
        where: { spotId: spotId },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'],
                },
                required: false
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['reviewId', 'createdAt', 'updatedAt'],
                },
                required: false
            }
        ]
    })

    if (!reviews.length) res.json({"message": "No reviews for this spot."})

    return res.json({ Reviews: reviews });
});

router.post('/:spotId/bookings', [requireAuth, validateBooking], async (req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const targetSpot = await Spot.findOne({
        where: {
            id: spotId
        }
    });

    if (!targetSpot) return res.status(404).json({message: "Spot couldn't be found"})

    if (targetSpot.ownerId === userId) return res.status(403).json({ message: "Forbidden" });

    const bookings = await Booking.findAll({ where: { id: spotId } }); // should just eager load?

    if (bookings) {
        let bookingConflict = false;
        bookings.forEach(booking => {
            booking = booking.toJSON();

            if (booking.startDate < endDate && endDate < booking.endDate) {
                bookingConflict = true;
                return res.status(403).json({ // refactor into validator?
                    message: "Sorry, this spot is already booked for the specified dates",
                    errors: {
                        endDate: "End date conflicts with an existing booking"
                    }
                });
            } else if (booking.startDate < startDate && startDate < booking.endDate) {
                bookingConflict = true;
                return res.status(403).json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    errors: {
                        startDate: "Start date conflicts with an existing booking"
                    }
                });
            } else if (startDate < booking.startDate && booking.endDate < endDate) {
                bookingConflict = true;
                return res.status(403).json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                    }
                });
            }
        });
        if (bookingConflict) return;
    }

    await Booking.create({
        spotId: spotId,
        userId: userId,
        startDate: startDate,
        endDate: endDate
    });

    const createdBooking = await Booking.findOne({
        where: {
            startDate: startDate,
            endDate: endDate
        }
    });

    return res.json(createdBooking);
});

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId);
    if (!spot) res.status(404).json({"message": "Spot couldn't be found"});

    let bookings;
    if (userId === spot.ownerId) {
        bookings = await Booking.findAll({
            where: { spotId: spotId },
            include: [
                {
                    model: User,
                    attributes: ['id','firstName','lastName'],
                    required: false
                }
            ]
        })
    } else {
        bookings = await Booking.findAll({
            where: { spotId: spotId },
            attributes: ['spotId', 'startDate','endDate']
        });
    }

    if (!bookings.length) res.json({"message": "No bookings for this spot."});

    return res.json({Bookings: bookings});
});

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const { url, preview } = req.body;
    const userId = req.user.id;
    const querySpot = await Spot.findByPk(spotId);

    if (!querySpot) return res.status(404).json({ "message": "Spot couldn't be found" });
    if (userId !== querySpot.ownerId) return res.status(403).json({ message: "Forbidden" });

    await querySpot.createSpotImage({url: url, preview: preview}); // do you need this doubling?

    const record = await SpotImage.findOne({
        where: {
            [Op.and]: [
                {url: url}, {preview: preview}
            ]
        },
        attributes: {
            exclude: ['spotId', 'createdAt', 'updatedAt']
        }
    });

    return res.json(record);
});

router.put('/:spotId', [requireAuth, validateSpot], async (req, res) => {
    const spotId = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const userId = req.user.id;
    const querySpot = await Spot.findOne({ where: {id: spotId} });

    if (!querySpot) return res.status(404).json({ "message": "Spot couldn't be found" });

    if (userId !== querySpot.ownerId) return res.status(403).json({ message: "Forbidden" });

    await querySpot.update({ address: address, city: city, state: state, country: country, lat: lat, lng: lng, name: name, description: description, price: price });

    const updatedSpot = await Spot.findByPk(spotId);

    return res.json(updatedSpot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const querySpot = await Spot.findOne({where: {id: spotId}});

    if (!querySpot) return res.status(404).json({ "message": "Spot couldn't be found" });

    if (userId !== querySpot.ownerId) return res.status(403).json({ message: "Forbidden" });

    await querySpot.destroy();

    return res.json({message: "Successfully deleted"});
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

router.get('/', validateQuery, async (req, res,) => {
    let { page, size } = req.query;
    const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    if (page === undefined || page < 1 || page > 10) page = 1;
    else page = parseInt(page);

    if (size === undefined || size < 1 || size > 10) size = 20;
    else size = parseInt(size);

    const pagination = {
        offset: (page - 1) * size,
        limit: size
    };

    const where = {};

    // deeply repetitive... you can probably refactor
    if (minLat && maxLat) where.lat = { [Op.between]: [minLat, maxLat] }
    else if (minLat) where.lat = { [Op.gte]: minLat }
    else if (maxLat) where.lat = { [Op.lte]: maxLat }

    if (minLng && maxLng) where.lng = { [Op.between]: [minLng, maxLng] }
    else if (minLng) where.lng = { [Op.gte]: minLng }
    else if (maxLng) where.lng = { [Op.lte]: maxLng }

    if (minPrice && maxPrice) where.price = { [Op.between]: [minPrice, maxPrice] }
    else if (minPrice) where.price = { [Op.gte]: minPrice }
    else if (maxPrice) where.price = { [Op.lte]: maxPrice }

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
        ],
        ...pagination,
        where
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

    return res.json({
        Spots: spots,
        page,
        size: spots.length
    });
});

router.post('/', [requireAuth, validateSpot], async (req, res) => {
    const newSpot = await Spot.create({...req.body, ownerId: req.user.id});
    const retrieved = await Spot.findOne({where: {[Op.and]: [{lat: req.body.lat}, {lng: req.body.lng}]}});

    return res.status(201).json(retrieved);
});

module.exports = router;
