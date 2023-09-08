const { Checklist, User, Task } = require('../models')

const createCheckList = async (req, res) => {
    const newChecklist = await Checklist.create(req.body);

    if (!newChecklist) {
        return res.status(400).json({ message: 'failed to create user' })
    }

    const updateUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { checkLists: newChecklist } },
        { new: true, runValidators: true }
    );

    if (!updateUser) {
        return res.status(400).json({ message: 'falied to add checklist to user' })
    }

    return res.status(200).json(updateUser);
}

const addTaskToCheckList = async (req, res) => {
    const newTask = await Task.create(req.body);

    if (!newTask) {
        return res.status(400).json({ message: 'failed to create task' });
    };

    const updatedCheckList = await Checklist.findOneAndUpdate(
        { _id: req.body.checklistId },
        { $addToSet: { tasks: newTask } },
        { new: true, runValidators: true },
    );

    if (!updatedCheckList) {
        return res.status(400).json({message: 'failed to add task to checklist'})
    };

    return res.status(200).json(updatedCheckList);
}

const getAllChecklists = async (req, res) => {
    const checklists = await Checklist.find().populate('tasks')

    if (!checklists) {
        return res.status(400).json({ message: 'failed to get checklists' });
    }

    return res.status(200).json(checklists)
}

module.exports = {
    getAllChecklists,
    createCheckList,
    addTaskToCheckList

}