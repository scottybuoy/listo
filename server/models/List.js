const { Schema, model } = require('mongoose');


const listSchema = new Schema(
    {
        listTitle: {
            type: String
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const List = model('List', listSchema)

module.exports = List;