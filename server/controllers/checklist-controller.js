const { Checklist, User, Task } = require('../models')

// populate method causing issues on front end

// const getSingleChecklist = async (req, res) => {
//     const checklist = await Checklist.findOne({ _id: req.params.checklistId })
//         .populate('tasks');
//     if (!checklist) {
//         return res.status(400).json({ message: 'failed to locate checklist' });
//     }
//     return res.status(200).json(checklist);
// }

// $in method works on component load front end

const getSingleChecklist = async (req, res) => {
    const checklist = await Checklist.findOne({ _id: req.params.checklistId })
    // .populate('tasks');
    if (!checklist) {
        return res.status(400).json({ message: 'failed to locate checklist' });
    }

    const taskIds = checklist.tasks;

    const tasks = await Task.find({ '_id': { $in: taskIds } })
    return res.status(200).json({ tasks, listTitle: checklist.listTitle });
}

const createCheckList = async (req, res) => {
    const newChecklist = await Checklist.create(req.body);

    if (!newChecklist) {
        return res.status(400).json({ message: 'failed to create user' })
    }

    const updateUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { checklists: newChecklist } },
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
        return res.status(400).json({ message: 'failed to add task to checklist' })
    };

    return res.status(200).json(updatedCheckList);
}

const removeTaskFromChecklist = async (req, res) => {
    const updatedChecklist = await Checklist.findOneAndUpdate(
        { _id: req.body.checklistId },
        { $pull: { tasks: req.body.taskId } },
        { new: true, runValidators: true }
    );

    if (!updatedChecklist) {
        return res.status(400).json({ message: 'failed to delete task' });
    };

    return res.status(200).json(updatedChecklist);
}

const getAllChecklists = async (req, res) => {
    const checklists = await Checklist.find().populate('tasks')

    if (!checklists) {
        return res.status(400).json({ message: 'failed to get checklists' });
    }

    return res.status(200).json(checklists)
}

const getUserChecklists = async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate([
            {
                path: 'checklists',
                populate: {
                    path: 'tasks',
                    model: 'Task'
                }
            },

        ])


    if (!user) {
        return res.status(400).json({ message: 'unable to find user' });
    }

    return res.status(200).json(user);
};

const toggleItemCheck = async (req, res) => {
    // const task = await Task.findOneAndUpdate(
    //     { _id: req.body.taskId },
    //     { $set: { checked: req.body.checked } },
    //     { new: true, runValidators: true }
    // );

    // if (!task) {
    //     return res.status(400).json({message: 'failed to find checklist'});
    // };

    // return res.status(200).json(task);
    const task = await Task.findOne({ _id: req.body.taskId });

    if (!task) {
        return res.status(400).json({ message: "unable to find task" })
    };

    const isChecked = task.checked;

    task.checked = !isChecked;

    task.save();

    return res.status(200).json(task);
};

const deleteChecklist = async (req, res) => {
    const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { checklists: req.body.checklistId } },
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        return res.status(400).json({message: 'unable to delete checklist from user'});
    };

    return res.status(200).json(updatedUser);
};



module.exports = {
    getAllChecklists,
    createCheckList,
    addTaskToCheckList,
    getUserChecklists,
    getSingleChecklist,
    removeTaskFromChecklist,
    toggleItemCheck,
    deleteChecklist,
}