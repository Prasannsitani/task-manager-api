const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send()
    }
})

// GET /tasks?status=true
// GET /tasks?limit=3&skip=0
// GET /tasks?sortBy=createdBy:asc

// Both Approaches works fine. We can use either of them.
// const tasks = await Task.find({owner: req.user._id})
// res.send(tasks)
// Or 
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.status) {
        match.status = req.query.status === 'true' 
    } 

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {    
        await req.user.populate({
            path: 'tasks',
            match,
            options :  {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            } 
        }).execPopulate()
        res.send(req.user.tasks)  
    } catch (err) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        return !task ? res.status(404).send() : res.status(200).send(task)
    } catch (err) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'status']
    const isValidTaskOperation = updates.every(update => { return allowedUpdates.includes(update)})

    if(!isValidTaskOperation) {
        return res.status(400).send({Error: 'Invalid Updates!!'})
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        if(!task) {
            res.status(404).send()
        }
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    
    try {
        const deletedTask = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        return !deletedTask ? res.status(404).send({Error: "Task Doesn't Exists"}) : res.status(200).send({deletedTask})
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;