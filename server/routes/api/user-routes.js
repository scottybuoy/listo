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
    deleteList,
    getAllLists
} = require('../../controllers/user-controller');

const { authMiddleWare } = require('../../utils/auth');

// /api/user endpoint

router.route('/').get(getAllUsers).post(createUser);

router.route('/login').post(login);

router.route('/:id').get(getUser).post(createList);

router.route('/:userId/lists').get(getUserLists).delete(deleteList);

router.route('/:userId/list/:listId').get(getList);

router.route('/lists/:listId').get(getListCategories).post(addItemToListWithCategory).put(updateItem).delete(deleteItem);

router.route('/:userId/allLists').get(getAllLists);

module.exports = router;