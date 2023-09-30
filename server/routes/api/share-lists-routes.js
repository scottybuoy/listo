const router = require('express').Router();

const {
    sendList,
    getReceivedLists,
    saveReceivedList,
} = require('../../controllers/share-lists-controller');

router.route('/').post(sendList);

router.route('/:userId').get(getReceivedLists).post(saveReceivedList);

module.exports = router;