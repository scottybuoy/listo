const { Schema, model } = require('mongoose');


const listSchema = new Schema(
    {
        listTitle: {
            type: String,
            required: true
        },

        listType: {
            type: String,
            required: true
        },

        dateCreated: {
            type: Date,
            default: Date.now,
        },

        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category',
            }
        ],
        sentBy: {
            type: String,
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const List = model('List', listSchema)

module.exports = List;