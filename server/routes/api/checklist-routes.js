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
} = require('../../controllers/checklist-controller')

router.route('/:userId').get(getUserChecklists).post(createCheckList).delete(deleteChecklist);

router.route('/:userId/add-task').post(addTaskToCheckList);

router.route('/:userId/:checklistId').get(getSingleChecklist).delete(removeTaskFromChecklist);

router.route('/check-task').put(toggleItemCheck);

module.exports = router;