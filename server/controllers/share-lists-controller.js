const { User, List, Checklist } = require('../models');

const sendList = async (req, res) => {
    const listToSend = await List.findById(req.body.listId)

    if (!listToSend) {
        return res.status(400).json({ message: 'failed to find list' });
    };

    const listRecipient = await User.findOneAndUpdate(
        { _id: req.body.recipientId },
        { $addToSet: { receivedLists: listToSend } },
        { new: true, runValidotors: true }
    );

    if (!listRecipient) {
        return res.status(400).json({ message: 'failed to send list to user' });
    };

    return res.status(200).json(listRecipient);
}

const getReceivedLists = async (req, res) => {
    const receivedLists = await User.findById(req.params.userId)
        .populate('receivedLists');

    if (!receivedLists) {
        return res.status(400).json({message: 'failed to find received lists'})
    }

    return res.status(200).json(receivedLists);
}

module.exports = {
    sendList,
    getReceivedLists,
}