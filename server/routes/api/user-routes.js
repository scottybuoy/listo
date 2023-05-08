const router = require('express').Router();

const {
    createUser,
    login,
    getUser,
    getAllUsers,
    createList,
    addItemToList,
    getUserLists,
} = require('../../controllers/user-controller');

const { authMiddleWare } = require('../../utils/auth');

router.route('/').get(getAllUsers).post(createUser);

router.route('/login').post(login);

router.route('/:id').get(getUser).post(createList);

router.route('/:userId/lists').get(getUserLists)

router.route('/lists/:listId').post(addItemToList)

module.exports = router;