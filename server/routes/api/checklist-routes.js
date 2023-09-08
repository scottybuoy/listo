const router = require('express').Router();

const {
    getAllChecklists,
    createCheckList,
    addTaskToCheckList
} = require('../../controllers/checklist-controller')

router.route('/').get(getAllChecklists).post(createCheckList);

router.route('/add-task').post(addTaskToCheckList);

module.exports = router;