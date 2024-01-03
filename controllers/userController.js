const User = require('../models/User')

async function getUsers(req, res) {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

async function getSingleUser(req, res) {
    try {
        const users = await User.findOne(req.params.id)
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
