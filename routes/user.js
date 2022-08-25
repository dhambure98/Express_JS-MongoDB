const express = require('express')
const app = express()
const router = express.Router()

const User = require('../models/user.model')

app.use(express.json())

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id)
        res.json(users)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.post('/', async (req, res) => {
    const users = new User({
        userId: req.body.userId,
        firstName: req.body.firstName,
        surName: req.body.surName,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: req.body.password,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
    })
    try {
        const response = await users.save()
        res.json(response)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id)
        const response = await users.remove()

        res.json(response)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id)
        users.userId = req.body.userId
        users.firstName = req.body.firstName
        users.surName = req.body.surName
        users.gender = req.body.gender
        users.dateOfBirth = req.body.dateOfBirth
        users.password = req.body.password
        users.phoneNo = req.body.phoneNo
        users.email = req.body.email

        const response = await users.save()
        res.json(response)

    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.get('/login', async (req, res) => {
    try {
        const users = await User.findByPasswordAndEmail(req.params.email, req.params.password)
        res.json(users)
    } catch (err) {
        res.send('Err: ' + err)
    }
})





module.exports = router