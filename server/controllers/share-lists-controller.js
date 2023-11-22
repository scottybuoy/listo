const { User, List, Checklist, Category, Task } = require('../models');

const sendList = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getReceivedLists = async (req, res) => {
    try {
        const receivedLists = await User.findById(req.params.userId)
            .populate(['receivedLists', 'receivedChecklists']);
    
        if (!receivedLists) {
            return res.status(400).json({ message: 'failed to find received lists' })
        }
    
        return res.status(200).json(receivedLists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteReceivedList = async (req, res) => {
    try {
        let fieldToPullFrom = null;
    
        req.body.typeOfList === 'shoppingList' ? fieldToPullFrom = 'receivedLists' : fieldToPullFrom = 'receivedChecklists';
    
        const userToUpdate = await User.findById(req.params.userId);
    
        if (!userToUpdate) {
            return res.status(400).json({ message: 'cannot remove received list from user' })
        };
    
        userToUpdate[fieldToPullFrom].pull(req.body.receivedListId);
        userToUpdate.save();
    
        return res.status(200).json(userToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const saveReceivedList = async (req, res) => {
    try {
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
    
        // CREATE NEW CATEGORY INSTANCES FOR SHOPPING LIST COPY
        if (req.body.typeOfList === 'shoppingList') {
            let newCats = await Promise.all(obj.categories.map(async (categoryID) => {
                const category = await Category.findById(categoryID);
                let catObj = category.toObject();
                let oldID = catObj._id;
                delete catObj._id;
                const categoryCopy = await Category.create(catObj);
             
                return categoryCopy._id;
            }));
            obj.categories = newCats;
        } else {
            let newTasks = await Promise.all(obj.tasks.map(async (taskID)=> {
                const task = await Task.findById(taskID);
                let taskObj = task.toObject();
                let oldID = taskObj._id;
                delete taskObj._id;
                const taskCopy = await Task.create(taskObj);
       
                return taskCopy._id;
            }));
            obj.tasks = newTasks;
        }
    
     
    
    
        req.body.typeOfList === 'shoppingList' ? listCopy = await List.create(obj) : listCopy = await Checklist.create(obj);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};

const saveReceivedChecklist = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const findRecipient = async (req, res) => {
    try {
        const user = await User.find({ username: req.params.username });
        if (!user) {
            return res.status(400).json({ message: 'unable to find user' });
        }
    
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    sendList,
    getReceivedLists,
    saveReceivedList,
    saveReceivedChecklist,
    findRecipient,
    deleteReceivedList,
}