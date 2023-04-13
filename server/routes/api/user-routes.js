const router = require('express').Router();

const {
    createUser,
    getUser,
    getAllUsers,
    createList,
    addItemToList
} = require('../../controllers/user-controller');

const { authMiddleWare } = require('../../utils/auth');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).post(createList);

router.route('/lists/:listId').post(addItemToList)

module.exports = router;