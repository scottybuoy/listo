const router = require('express').Router();
const userRoutes = require('./user-routes');
const checklistRoutes = require('./checklist-routes');
const sendListRoutes = require('./send-list-routes');

router.use('/user', userRoutes);
router.use('/checklist', checklistRoutes);
router.use('/send-list', sendListRoutes);

module.exports = router;