const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots');
const reviewsRouter = require('./reviews');
const spotImagesRouter = require('./spotImages');
const { restoreUser } = require('../../utils/auth');

router.use(restoreUser); // Connect restoreUser middleware to the API router to set req.user

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/spot-images', spotImagesRouter);

router.post('/test', (req, res) => res.json({ requestBody: req.body }));

// Add a XSRF-TOKEN cookie (let devs reset the CSRF token cookie)
router.get('/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({ 'XSRF-Token': csrfToken });
});

module.exports = router;
