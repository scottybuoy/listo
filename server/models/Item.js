const { Schema } = require('mongoose');

const itemSchema = new Schema(
    {
        itemName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
        },
        notes: {
            type: String,
        },
    },
);

module.exports = itemSchema;