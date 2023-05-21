const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookingsData = await Booking.findAll({
        where: { id: userId },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'updatedAt', 'createdAt'],
                },
                include: [
                    { // can define alias in models but it's nested incorrectly
                        model: SpotImage,
                        attributes: ['url'],
                        where: {
                            preview: true
                        },
                        limit: 1,
                        required: false
                    }
                ],
                required: false
            }
        ]
    });

    const bookings = [];
    bookingsData.forEach(booking => {
        booking = booking.toJSON();
        booking.Spot.previewImage = booking.Spot.SpotImages[0].url;
        delete booking.Spot.SpotImages;
        bookings.push(booking)
    });

    return res.json({Bookings: bookings});
});

module.exports = router;
