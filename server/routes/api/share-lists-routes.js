const router = require('express').Router();

const {
    sendList,
    getReceivedLists,
    saveReceivedList,
    findRecipient,
} = require('../../controllers/share-lists-controller');

router.route('/').post(sendList);

router.route('/:userId').get(getReceivedLists).post(saveReceivedList);

router.route('/recipient/:username').get(findRecipient);

module.exports = router;