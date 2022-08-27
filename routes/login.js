const express = require('express')
const app = express()
const router = express.Router()

const Login = require('../models/login.model')
const User = require('../models/user.model')


app.use(express.json())

router.post('/', async (req, res) => {
    try {
        const userCount=await User.findOne({email: new RegExp('^'+req.body.email+'$', "i")}).count();

        if (userCount!==0){
            const user=await User.findOne({email: new RegExp('^'+req.body.email+'$', "i")});
            console.log(user);

            if (await user.password==req.body.password){
                const login=new Login({
                    email:req.body.email,
                    password : req.body.password,

                });
                const response=await login.save()
                res.send(user.firstName +" logged in")
                // res.send(response)
            }else {
                res.send("Wrong Password.Try again")
            }

        }else {
            res.send("User not exist please check email")
        }

    }catch (err){
        res.send('Err'+err)
    }
})

module.exports = router