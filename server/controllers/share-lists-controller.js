const { User, List, Checklist } = require('../models');

const sendList = async (req, res) => {
    const listToSend = await List.findById(req.body.listId)

    if (!listToSend) {
        return res.status(400).json({ message: 'failed to find list' });
    };

    listToSend.sentBy = req.body.sentBy;
    listToSend.save();

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
        return res.status(400).json({ message: 'failed to find received lists' })
    }

    return res.status(200).json(receivedLists);
};

const saveReceivedList = async (req, res) => {
    const updatedList = await List.findById(req.body.receivedList);

    if (!updatedList) {
        return res.status(400).json({ message: 'could not find received list' })
    }

    updatedList.sentBy = '';
    updatedList.save();

    const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { lists: updatedList } },
        { new: true, runValidotors: true }
    );

    updatedUser.receivedLists.pull(req.body.receivedList)
    updatedUser.save();

    if (!updatedUser) {
        return res.status(400).json({ message: 'failed to add received list to user' })
    };

    return res.status(200).json(updatedUser);

};

const findRecipient = async (req, res) => {
    const user = await User.find({ username: req.params.username });
    if (!user) {
        return res.status(400).json({ message: 'unable to find user' });
    }

    return res.status(200).json(user);
}

module.exports = {
    sendList,
    getReceivedLists,
    saveReceivedList,
    findRecipient,
}