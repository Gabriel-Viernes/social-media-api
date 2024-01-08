const Thought = require('../models/Thought').Thought
const Reaction = require('../models/Reaction').Reaction
const User = require('../models/User')
const { Schema, model } = require('mongoose')

const getThoughts = async function (req, res) {
    try {
        const thoughts = await Thought.find().populate('reactions')
        res.json(thoughts)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const getSingleThought = async function (req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('reactions')
        res.json(thought)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const createThought = async function (req, res) {
    try {
        const newThought = await Thought.create(req.body)
        const updatedUser = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: newThought._id }},
            { new: true })
        res.json([newThought, updatedUser])
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const updateThought = async function(req, res) {
    try {
        const updatedThought = await Thought.updateOne({ _id: req.params.thoughtId }, req.body )
        res.json(updatedThought)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const deleteThought = async function(req, res) {
    try {
        const deletedThought = await Thought.deleteOne({ _id: req.params.thoughtId })
        res.json(deletedThought)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}
//
const addReaction = async function(req, res) {
    console.log('lol')
    try {
        const newReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true })
        if (!newReaction) {
            return res.status(404).json({ message: "No thought found with that id!" })
        }
        res.json(newReaction)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const removeReaction = async function(req, res) {
    console.log('lol')
    try {
        const deletedReaction = await Thought.updateOne(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId }}},
            { runValidators: true, new: true })
        if (!newReaction) {
            return res.status(404).json({ message: "No thought found with that id!" })
        }
        res.json(deletedReaction)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
}
