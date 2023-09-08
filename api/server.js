// import { insert } from './users/model';

// "require"
const express = require('express');
// "invoke"
const server = express();
// "use" (JSON)
server.use(express.json());

//POST
server.post('/api/users', async (req, res) => {
    try {
        const {id, name, bio } = req.body;
        if(!id || !name || !bio){
            res.status(422).json({
                message: `name and bio required`
            })
        }else{
            
        }
    } catch (err) {
        res.status(500).json({
            message: `Error creating user`
        })
    }
})

// GET
server.get('/api/users')

// "export"
module.exports = server; 
