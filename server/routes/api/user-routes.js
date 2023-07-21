const router = require('express').Router();

const {
    createUser,
    login,
    getUser,
    getAllUsers,
    createList,
    addItemToList,
    addItemToListWithCategory,
    getListCategories,
    getUserLists,
    getList,
    updateItem,
    deleteItem,
} = require('../../controllers/user-controller');

const { authMiddleWare } = require('../../utils/auth');

router.route('/').get(getAllUsers).post(createUser);

router.route('/login').post(login);

router.route('/:id').get(getUser).post(createList);

router.route('/:userId/lists').get(getUserLists);

router.route('/:userId/list/:listId').get(getList);

router.route('/lists/:listId').get(getListCategories).post(addItemToListWithCategory).put(updateItem).delete(deleteItem);

module.exports = router;