const { Schema, model } = require('mongoose');

const checklistSchema = new Schema(
    {
        listTitle: {
            type: String,
            required: true
        },

        dateCreated: {
            type: Date,
            default: Date.now,
        },

        sentBy: {
            type: String,
        },

        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task',
            }
        ]

    }
)

const Checklist = model('Checklist', checklistSchema)

module.exports = Checklist