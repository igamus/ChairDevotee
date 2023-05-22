const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateBookingUpdate = [
    check('endDate')
        .custom((endDate, { req }) => endDate > req.body.startDate)
        .withMessage('endDate cannot come before startDate'),
    handleValidationErrors
];

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookingsData = await Booking.findAll({
        where: { userId: userId },
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
        booking.Spot.previewImage = booking.Spot.SpotImages.length ? booking.Spot.SpotImages[0].url : null;
        delete booking.Spot.SpotImages;
        bookings.push(booking)
    });

    return res.json({Bookings: bookings});
});

router.put('/:bookingId', [requireAuth, validateBookingUpdate], async (req, res) => {
    const userId = req.user.id;
    const bookingId = req.params.bookingId;

    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const booking = await Booking.findByPk(bookingId);

    if (!booking) return res.status(404).json({ message: "Booking couldn't be found"});

    if (booking.userId !== userId) return res.status(403).json({ message: 'Forbidden' });

    if (new Date() > booking.endDate) return res.status(403).json({ message: "Past bookings can't be modified" });

    if (booking.startDate < endDate && endDate < booking.endDate) {
        return res.status(403).json({ // refactor into validator?
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                endDate: "End date conflicts with an existing booking"
            }
        });
    } else if (booking.startDate < startDate && startDate < booking.endDate) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking"
            }
        });
    } else if (startDate < booking.startDate && booking.endDate < endDate) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        });
    }

    await booking.update({
        startDate: startDate,
        endDate: endDate
    });

    const updatedBooking = await Booking.findByPk(bookingId);

    return res.json(updatedBooking);
});

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookingId = req.params.bookingId;

    const booking = await Booking.findOne({
        where: {
            id: bookingId
        },
        include: [
            {
                model: Spot
            }
        ]
    });

    if (!booking) return res.status(404).json({ message: "Booking couldn't be found"});

    if (userId !== booking.userId && userId !== booking.Spot.ownerId) return res.status(403).json({ message: 'Forbidden' });

    if (new Date() > booking.startDate) return res.status(403).json({ message: "Bookings that have been started can't be deleted" });

    await booking.destroy();

    return res.json({message: 'Successfully deleted'});
});

module.exports = router;
