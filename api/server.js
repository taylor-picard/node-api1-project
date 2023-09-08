// "require"
const express = require('express');
const User = require('./users/model');
// "invoke"
const server = express();
// "use" (JSON)
server.use(express.json());


//POST
server.post('/api/users', (req, res) => {
    const user = req.body;
    if(!user.name || !user.bio){
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    }else{
        User.insert(user)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch (() => {
            res.status(500).json({
                message: "There was an error while saving the user to the database"
            })
        })
    }
    
})

// GET
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(() => {
            res.status(500).json({
                message: "The users information could not be retrieved"
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            }
            res.json(user)
        })
        .catch(() => {
            res.status(500).json({
                message: "The user information could not be retrieved"
            })
        })
})

// DELETE
server.delete(`/api/users/:id`, async (req, res) => {
    const user = await User.findById(req.params.id)
        if(!user){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }else{
            const deletedUser = await User.remove(user.id)
            res.status(200).json(deletedUser)
        }
})

// PUT
server.put(`/api/users/:id`, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }else{
            if(!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } 
            else {
                const updatedUser = await User.update(user.id, req.body)
                res.status(200).json(updatedUser)
            }
        }
    }
    catch(err){
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})
// "export"
module.exports = server; 
