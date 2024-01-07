const User = require('../models/User')
const { Schema, model } = require('mongoose')

//http routes for /api/user
const getUsers = async function(req, res) {
    try {
        const users = await User.find().populate('thoughts').populate('friends')
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const getSingleUser = async function(req, res) {
    try {
        const users = await User.findOne(req.params.id).populate('thoughts').populate('friends')
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const createUser = async function(req, res) {
    try {
        const newUser =  await User.create(req.body)
        res.json(newUser)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const updateUser = async function(req, res) {
    try {
        const updatedUser = await User.updateOne({ _id: req.body.id }, req.body )
        res.json(updatedUser)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const deleteUser = async function(req, res) {
    try {
        const deletedUser = await User.deleteOne({ _id: req.body.id })
        res.json(deletedUser)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const addFriend = async function(req, res) {
    try {
        const newFriend = await User.updateOne({ _id: req.params.userId }, { friends: req.params.friendId })
        res.json(newFriend)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend
}
