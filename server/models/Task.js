const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
    {
        taskItem: {
            type: String,
            required: true
        },
        checked: {
            type: Boolean,
            default: false,
        },
        notes: {
            type: String,
        }
    }
);

const Task = model('Task', taskSchema)

module.exports = Task;