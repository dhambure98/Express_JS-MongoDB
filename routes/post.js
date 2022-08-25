const express = require('express')
const app = express()
const router = express.Router()

const Post = require('../models/post.model')


app.use(express.json())

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id)
        res.json(posts)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.post('/', async (req, res) => {
    const posts = new Post({
        userId: req.body.userId,
        date: req.body.date,
        time: req.body.time,
        title: req.body.title,
        body: req.body.body
    })

    try {
        const response = await posts.save()
        res.json(response)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id)
        const response = await posts.remove()

        res.json(response)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id)
        posts.userId = req.body.userId
        posts.date = req.body.date
        posts.time = req.body.time
        posts.title = req.body.title
        posts.body = req.body.body

        const response = await posts.save()
        res.json(response)

    } catch (err) {
        res.send('Err: ' + err)
    }
})





module.exports = router