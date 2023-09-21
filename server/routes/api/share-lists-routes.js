const router = require('express').Router();

const {
    sendList,
    getReceivedLists
} = require('../../controllers/share-lists-controller');

router.route('/').post(sendList);

router.route('/:userId').get(getReceivedLists);

module.exports = router;