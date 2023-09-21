const router = require('express').Router();

const {
    sendList,
    getReceivedLists
} = require('../../controllers/send-list-controller');

router.route('/').post(sendList);

router.route('/:userId').get(getReceivedLists);

module.exports = router;