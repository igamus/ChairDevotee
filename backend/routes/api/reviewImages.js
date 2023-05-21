const express = require('express');
const router = express.Router();
const { ReviewImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;
    const queryImage = await ReviewImage.findOne({
        where: {id: imageId},
        include: [
            {
                model: Review
            }
        ]
    });

    if (!queryImage) return res.status(404).json({ "message": "Review Image couldn't be found" });

    if (userId !== queryImage.Review.userId) return res.status(403).json({ message: "Forbidden" });

    await queryImage.destroy();

    return res.json({message: "Successfully deleted"});
});

module.exports = router;
