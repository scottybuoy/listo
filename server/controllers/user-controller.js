const { User, List, Category, Item } = require('../models');
const { signToken } = require('../utils/auth');

// create new user
const createUser = async ({ body }, res) => {
    const user = await User.create(body);

    if (!user) {
        return res.status(400).json({ message: 'Failed to create user'});
    }
    const token = signToken(user);
    res.status(200).json({ token, user });
};

// get user by id
const getUser = async (req, res) => {
    const foundUser = await User.findById(req.params.id)

    if (!foundUser) {
        return res.status(400).json({ message: 'Cannot fiind user'})
    }

    res.json(foundUser);
};

const login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    // console.log('REQ', req.user);

    if (!user) {
        return res.status(400).json({ message: 'Unable to find this user' });
    }
    
    const correctPW = await user.isCorrectPassword(req.body.password);

    if (!correctPW) {
        return res.status(400).json({ message: 'Incorrect password' });
    }

    console.log('SUCCESSFUL LOGIN');
   
    const token = signToken(user);
    res.json({ token, user });

}


const getAllUsers = async (req, res) => {
    const users = await User.find({})

    if (!users) {
        return res.status(400).json({ message: 'cannot find users'})
    }

    res.json(users);
};

const createList = async (req, res) => {
    const newList = await List.create(req.body);

    if (!newList) {
        return res.status(400).json({ message: 'Failed to create list'})
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id},
        { $addToSet: { lists: newList } },
        { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
        return res.status(400).json({ message: 'Failed to add list to user'});
    }
    return res.status(200).json(updatedUser)
};

const addItemToList = async ( { params, body }, res) => {
    const updatedList = await List.findOneAndUpdate(
        { _id: params.listId},
        { $addToSet: { items: body}},
        { new: true, runValidators: true }
    );

    if (!updatedList) {
        return res.status(400).json({ message: 'Failed to add item'})
    }

    return res.status(200).json(updatedList)
};

const addItemToListWithCategory = async (req, res) => {

    const list = await List.findById(req.params.listId);

    const categories = list.categories;

    // check for existence of submitted category before creating new one
    for (const category of categories) {
        const foundCategory = await Category.findById(category);

        if (foundCategory.categoryName === req.body.category) {

            const updatedCategory = await Category.findOneAndUpdate(
                { _id: category },
                { 
                    $addToSet: { 
                        items: {
                            itemName: req.body.itemName,
                            quantity: req.body.quantity,
                            notes: req.body.notes
                        }
                    }
                },
                { new: true, runValidators: true }
            );

            return res.status(200).json(updatedCategory)
        }
    }

    const category = await Category.create({ categoryName: req.body.category })

    if (!category) {
        return res.status(400).json({ message: 'Failed to create category' });
    }

    const updatedList = await List.findOneAndUpdate(
        { _id: req.params.listId },
        { $addToSet: { categories: category } },
        { new: true, runValidators: true }
    );

    if (!updatedList) {
        return res.status(400).json({ message: 'Failed to add category to list'});
    }

    const updatedCategory = await Category.findOneAndUpdate(
        { _id: category._id },
        { 
            $addToSet: { 
                items: {
                    itemName: req.body.itemName,
                    quantity: req.body.quantity,
                    notes: req.body.notes
                }
            }
        },
        { new: true, runvalidators: true }
    );

    if (!updatedCategory) {
        return res.status(400).json({ message: 'Failed to add items to category' });
    }

    return res.status(200).json(updatedCategory)

};

const getUserLists = async (req, res) => {
    const user = await User.findById(req.params.userId)

    if (!user) {
        return res.status(400).json({ message: 'Cannot fiind user'})
    }

    const listIds = user.lists;

    const userLists = await List.find({'_id': { $in: listIds}})

    if (!userLists) {
        return res.status(400).json({ message: 'Cannot find lists'});
    }


    return res.status(200).json({userLists});
}

const getList = async (req, res) => {

    const list = await List.findById(req.params.listId)

    if (!list) {
        return res.status(400).json({ message: 'Cannot find list'})
    }

    return res.status(200).json(list);


};

const getListCategories = async (req, res) => {
    const list = await List.findById(req.params.listId);

    const listTitle = list.listTitle;

    if (!list) {
        res.status(400).json({ message: 'Failed to find list' });
    }

    const categoryIds = list.categories;
    // console.log('CATS IN GET LIST CATS', categoryIds)

    const categories = await Category.find(
        {
            _id: {
                $in: categoryIds
            }
        }
    );

    return res.status(200).json({listTitle, categories})
}

// const updateItem = async (req, res) => {

//     const list = await List.findById(req.params.listId);

//     if (!list) {
//         return res.status(400).json({ message: 'Cannot find list' });
//     }

//     const item = list.items.id(req.body.itemId);

//     item.itemName = req.body.itemName;
//     item.quantity = req.body.quantity;
//     item.notes = req.body.notes;

//     const updatedList = await list.save();


//     return res.status(200).json(updatedList);

// };
const updateItem = async (req, res) => {

    const category = await Category.findById(req.body.catId);

    if (!category) {
        return res.status(400).json({ message: 'Cannot find category' });
    }

    const item = category.items.id(req.body.itemId);

    item.itemName = req.body.itemName;
    item.quantity = req.body.quantity;
    item.notes = req.body.notes;

    const updatedCategory = await category.save();
    


    return res.status(200).json(updatedCategory);

};

// const deleteItem = async (req, res) => {
//     const updatedList = await List.findOneAndUpdate(
//         { _id: req.params.listId},
//         { $pull: { items: { _id: req.body.itemId } } },
//         { new: true }
//     );
   
//     if (!updatedList) {
//         return res.status(400).json({ message: 'Cannot remove item'})
//     };

//     return res.status(200).json(updatedList)

// };

const deleteItem = async (req, res) => {
    const updatedCategory = await Category.findOneAndUpdate(
        { _id: req.body.categoryId},
        { $pull: { items: { _id: req.body.itemId } } },
        { new: true }
    );
   
    if (!updatedCategory) {
        return res.status(400).json({ message: 'Cannot remove item'})
    };

    return res.status(200).json(updatedCategory)

};

const deleteList = async (req, res) => {
    const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $pull: { lists: req.body.listId } },
        { new: true }
    )

    if (!updatedUser) {
        return res.status(400).json({message: 'Failed to delete list from user'})
    }

    return res.status(200).json(updatedUser);
}

module.exports = { 
                    createUser,
                    getUser,
                    getAllUsers,
                    createList,
                    addItemToList,
                    addItemToListWithCategory,
                    getListCategories,
                    login,
                    getUserLists,
                    getList,
                    updateItem,
                    deleteItem,
                    deleteList
                }