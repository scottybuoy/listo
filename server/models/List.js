const { Schema, model } = require('mongoose');
const itemSchema = require('./Item');

const listSchema = new Schema(
    {
        listTitle: {
            type: String
        },
        items: [itemSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const List = model('List', listSchema)

module.exports = List;