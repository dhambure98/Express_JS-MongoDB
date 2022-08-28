const express = require('express')
const app = express()
const router = express.Router()

const Posts = require('../model/post.model')

app.use(express.json())

// get all post
router.get('/',async (req, res) =>{
    try {
        const posts = await Posts.find()
        res.json(posts)
    }catch (error) {
        res.send('Error : '+ error)
    }
})

// get post in post id
router.get('/:id',async (req, res) =>{
    try {
        const post = await Posts.findById(req.params.id)
        res.json(post)
    }catch (error) {
        res.send('Error : '+ error)
    }
})

// get post in post publish user id
router.get('/:userId',async (req, res) =>{
    try {
        const posts = await Posts.find({ userId: req.params.userId })

        res.json(posts)
    }catch (error) {
        res.send('Error : '+ error)
    }
})

// save post
router.post('/',async (req,res) => {
    const posts = new Posts({
        userId:req.body.userId,
        date:req.body.date,
        time:req.body.time,
        title:req.body.title,
        body:req.body.body
    })

    try {
        const post = await posts.save()
        res.json(post)
    }catch (error) {
        res.send('Error : '+ error)
    }

})

// update post for search post id
router.put('/:id',async (req,res) =>{
    try {
        const post = await Posts.findById(req.params.id)
        post.userId = req.body.userId
        post.date = req.body.date
        post.time = req.body.time
        post.title = req.body.title
        post.body = req.body.body

        const response = await post.save()

        res.json(response)
    }catch (error) {
        res.send('Error : '+error)
    }
})

// delete post
router.delete('/:id',async (req,res) =>{
    try {
        const post = await Posts.findById(req.params.id)
        const response = await post.remove()
        res.json(response)
    }catch (error) {
        res.send('Error : '+error)
    }
})





module.exports = router