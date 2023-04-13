const { User, List, Item } = require('../models');
// const { signToken } = require('../utils/auth');

// create new user
const createUser = async ({ body }, res) => {
    const user = await User.create(body);

    if (!user) {
        return res.status(400).json({ message: 'Failed to create user'});
    }
    // const token = signToken(user);
    res.status(200).json(user);
};

// get user by id
const getUser = async (req, res) => {
    const foundUser = await User.findById(req.params.id)

    if (!foundUser) {
        return res.status(400).json({ message: 'Cannot fiind user'})
    }

    res.json(foundUser);
};

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
}

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
}

module.exports = { createUser, getUser, getAllUsers, createList, addItemToList}