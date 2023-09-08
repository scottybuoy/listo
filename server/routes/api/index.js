const router = require('express').Router();
const userRoutes = require('./user-routes');
const checklistRoutes = require('./checklist-routes');
// const itemRoutes = require('./item-routes')

router.use('/user', userRoutes);
router.use('/checklist', checklistRoutes);
// router.use('/item', itemRoutes)

module.exports = router;