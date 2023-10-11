const router = require('express').Router();

const {
    sendList,
    getReceivedLists,
    saveReceivedList,
    saveReceivedChecklist,
    findRecipient,
    deleteReceivedList,
} = require('../../controllers/share-lists-controller');

// /api/share-lists endpoint

router.route('/').post(sendList);

router.route('/:userId').get(getReceivedLists).post(saveReceivedList).delete(deleteReceivedList);

router.route('/checklist').post(saveReceivedChecklist);

router.route('/recipient/:username').get(findRecipient);

module.exports = router;