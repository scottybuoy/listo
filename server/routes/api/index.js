const router = require('express').Router();
const userRoutes = require('./user-routes');
const checklistRoutes = require('./checklist-routes');
const shareListsRoutes = require('./share-lists-routes');

router.use('/user', userRoutes);
router.use('/checklist', checklistRoutes);
router.use('/share-lists', shareListsRoutes);

module.exports = router;