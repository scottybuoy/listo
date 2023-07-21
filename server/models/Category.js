const { Schema, model } = require('mongoose');
const itemSchema = require('./Item');

const categorySchemma = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
            unique: true,
        },
        items: [itemSchema]
    }
);

const Category = model('Category', categorySchemma);

module.exports = Category;

