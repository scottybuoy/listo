const router = require('express').Router();

const {
    getAllChecklists,
    createCheckList,
    addTaskToCheckList,
    getUserChecklists,
    getSingleChecklist,
    removeTaskFromChecklist,
    toggleItemCheck,
    deleteChecklist,
    editTask,
} = require('../../controllers/checklist-controller')

// /api/checklist endpoint

router.route('/:userId').get(getUserChecklists).post(createCheckList).delete(deleteChecklist);

router.route('/:userId/task').post(addTaskToCheckList).put(editTask);

router.route('/:userId/:checklistId').get(getSingleChecklist).delete(removeTaskFromChecklist);

router.route('/check-task').put(toggleItemCheck);

module.exports = router;