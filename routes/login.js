const express = require('express')
const app = express()
const router = express.Router()

const Login = require('../model/login.model')
const User = require('../model/user.model')


app.use(express.json())

// get all login username and password
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
                res.send(user.firstName +"Successful logged in")
            
            }else {
                res.send("Wrong Password. Please Input Correct Password.Try again")
            }

        }else {
            res.send("User not exist please check email")
        }

    }catch (error){
        res.send('Error : '+ error)
    }
})

module.exports = router