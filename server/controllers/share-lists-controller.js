const { User, List, Checklist } = require('../models');

const sendList = async (req, res) => {
    let listToSend = null;
    let fieldToUpdate = null;
    if (req.body.typeOfList === 'shoppingList') {
        listToSend = await List.findById(req.body.listId);
    } else {
        listToSend = await Checklist.findById(req.body.listId);
    };

    if (!listToSend) {
        return res.status(400).json({ message: 'failed to find list' });
    };

    listToSend.sentBy = req.body.sentBy;
    listToSend.save();

    req.body.typeOfList === 'shoppingList' ? fieldToUpdate = 'receivedLists' : fieldToUpdate = 'receivedChecklists';


    const listRecipient = await User.findOneAndUpdate(
        { _id: req.body.recipientId },
        { $addToSet: { [fieldToUpdate]: listToSend } },
        { new: true, runValidotors: true }
    );

    if (!listRecipient) {
        return res.status(400).json({ message: 'failed to send list to user' });
    };

    return res.status(200).json(listRecipient);
}

const getReceivedLists = async (req, res) => {

    const receivedLists = await User.findById(req.params.userId)
        .populate(['receivedLists', 'receivedChecklists']);

    if (!receivedLists) {
        return res.status(400).json({ message: 'failed to find received lists' })
    }

    return res.status(200).json(receivedLists);
};

const deleteReceivedList = async (req, res) => {
    let fieldToPullFrom = null;

    req.body.typeOfList === 'shoppingList' ? fieldToPullFrom = 'receivedLists' : fieldToPullFrom = 'receivedChecklists';

    const userToUpdate = await User.findById(req.params.userId);

    if (!userToUpdate) {
        return res.status(400).json({ message: 'cannot remove received list from user' })
    };

    userToUpdate[fieldToPullFrom].pull(req.body.receivedListId);
    userToUpdate.save();

    return res.status(200).json(userToUpdate);
}

const saveReceivedList = async (req, res) => {
    let updatedList = null;
    let fieldToUpdate = null;
    let fieldToPullFrom = null;
    let listCopy = null;

    if (req.body.typeOfList === 'shoppingList') {
        updatedList = await List.findById(req.body.receivedListId);
    } else {
        updatedList = await Checklist.findById(req.body.receivedListId);
    }

    if (!updatedList) {
        return res.status(400).json({ message: 'could not find received list' })
    }

    updatedList.sentBy = '';
    updatedList.save();
    let obj = updatedList.toObject();
    delete obj._id;
    req.body.typeOfList === 'shoppingList' ? listCopy = await List.create(obj) : listCopy = await Checklist.create(obj);

    console.log('COMPARE', req.receivedListId, listCopy)

    req.body.typeOfList === 'shoppingList' ? fieldToUpdate = 'lists' : fieldToUpdate = 'checklists';
    req.body.typeOfList === 'shoppingList' ? fieldToPullFrom = 'receivedLists' : fieldToPullFrom = 'receivedChecklists';

    const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { [fieldToUpdate]: listCopy } },
        { new: true, runValidotors: true }
    );

    updatedUser[fieldToPullFrom].pull(req.body.receivedListId)
    updatedUser.save();

    if (!updatedUser) {
        return res.status(400).json({ message: 'failed to add received list to user' })
    };

    return res.status(200).json(updatedUser);

};

const saveReceivedChecklist = async (req, res) => {
    const updatedChecklist = Checklist.findById(req.body.checklistId);

    if (!updatedChecklist) {
        return res.status(400).json({ message: 'unable to find checklist' })
    }

    updatedChecklist.sentBy = ''
    updatedChecklist.save();

    const updatedUser = User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { checklists: req.body.checklistId } },
        { new: true, runValidotors: true }
    );

    if (!updatedUser) {
        return res.status(400).json({ message: 'unable to save received checklist' })
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
    saveReceivedChecklist,
    findRecipient,
    deleteReceivedList,
}