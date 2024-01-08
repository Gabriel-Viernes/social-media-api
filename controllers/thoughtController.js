const Thought = require('../models/Thought').Thought
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
        res.json(newThought)
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

const addReaction = async function(req, res) {
    try {
        const newReaction = await Thought.updateOne(
            { _id: req.params.reactionId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true })
        if (!newReaction) {
            return res.status(404).json({ message: "No thought found with that id!" })
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const removeReaction = async function(req, res) {
    try {
        const newReaction = await Thought.updateOne(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId }}},
            { runValidators: true, new: true })
        if (!newReaction) {
            return res.status(404).json({ message: "No thought found with that id!" })
        }
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
