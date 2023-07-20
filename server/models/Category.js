const { Schema, model } = require('mongoose');

const categorySchemma = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
            
        }
    }
)

