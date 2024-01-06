const Thought = require('../models/Thought')
const { Schema, model } = require('mongoose')

const getThoughts = async function (req, res) {
    try {
        const thoughts = await Thought.find()
        res.json(thoughts)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const getSingleThought = async function (req, res) {
    try {
        const thought = await Thought.findOne(req.params.id)
        res.json(thought)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const createThought = async function (req, res) {
    try {
        const newThought = await Thought.create(req.body)
        res.json(newUser)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const updateThought = async function(req, res) {
    try {
        const updatedThought = await Thought.findOneAndUpdate({ _id: req.body.id }, req.body )
        res.json(updatedThought)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const deleteThought = async function(req, res) {
    try {
        const deletedThought = await Thought.deleteOne({ _id: req.body.id })
        res.json(deletedThought)
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
    deleteThought
}
