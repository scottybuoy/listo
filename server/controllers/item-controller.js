const { User, List, Category } = require('../models');

// create new category
const createCategory = async (req, res) => {
    const category = await Category.create(req.body.category);

    if (!category) {
        return res.status(400).json({ message: 'Failed to create category'});
    }

    const updatedList = await List.findOneAndUpdate(
        { _id: req.params.listId },
        { $addToSet: { category: category } },
        { new: true, runValidators: true }
    );

    if (!updatedList) {
        return res.status(400).json({ message: 'Failed to add category to list'});
    }

    return res.status(200).json(updatedList);
}

const addItemToListWithCategory = async (req, res) => {
    // const list = List.findById(req.params.listId)

    const category = await Category.create(req.body.category)

    if (!category) {
        return res.status(400).json({ message: 'Failed to create category' });
    }

    const updatedList = await List.findOneAndUpdate(
        { _id: req.params.listId },
        { $addToSet: { category: category } },
        { new: true, runValidators: true }
    );

    if (!updatedList) {
        return res.status(400).json({ message: 'Failed to add category to list'});
    }

    console.log(updatedList)

    return res.status(200).json(updatedList);

}

// module.exports = {
//     addItemToListWithCategory,
// };