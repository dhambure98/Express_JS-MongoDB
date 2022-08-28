const express = require('express')
const app = express()
const router = express.Router()

const User = require('../models/user.model')

app.use(express.json())

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

// get user for id
router.get('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id)
        res.json(users)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

// get user for email and password
router.get('/:email/:password',async (req, res) =>{
    try {
        const register = await User.findOne({ email: req.params.email, password: req.params.password })
        res.json(register)
    }catch (error) {
        res.send('Error : '+ error)
    }
})

// save user
router.post('/',async (req,res) => {
    const user = new User({
        firstName:req.body.firstName,
        surname:req.body.surname,
        gender:req.body.gender,
        dateOfBirth:req.body.dateOfBirth,
        password:req.body.password,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email,
    })

    try {
        const register = await user.save()
        res.json(register)
    }catch (error) {
        res.send('Error : '+ error)
    }

})

// delete user for select user id
router.delete('/:id',async (req,res) =>{
    try {
        const register = await User.findById(req.params.id)
        const response = await register.remove()
        res.json(response)
    }catch (error) {
        res.send('Error : '+error)
    }
})

// update user for select user id
router.put('/:id',async (req,res) =>{
    try {
        const register = await User.findById(req.params.id)
        register.firstName = req.body.firstName
        register.surname = req.body.surname
        register.gender = req.body.gender
        register.dateOfBirth = req.body.dateOfBirth
        register.password = req.body.password
        register.phoneNumber = req.body.phoneNumber
        register.email = req.body.email

        const response = await register.save()
        res.json(response)

    }catch (error) {
        res.send('Error : '+ error)
    }
})







module.exports = router