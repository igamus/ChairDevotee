const express = require('express');
const router = express.Router();
const { SpotImage, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;
    const queryImage = await SpotImage.findOne({
        where: {id: imageId},
        include: [
            {
                model: Spot,
                attribute: ['ownerId']
            }
        ]
    });

    if (!queryImage) return res.status(404).json({ "message": "Spot Image couldn't be found" });

    if (userId !== queryImage.Spot.ownerId) return res.status(403).json({ message: "Forbidden" });

    await queryImage.destroy();

    return res.json({message: "Successfully deleted"});
});

module.exports = router;
