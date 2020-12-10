import express from 'express'
const router = express.Router()

import User from '../models/User.js'

router.get('/', async(request, response) => {
    const users = await User.find()

    response.json(users)
})

router.post('/add', async(request, response) => {
    try {
        const user = await User.create(request.body)

        if (user) {
            response.send(user)
        }
        
    } catch (error) {
        response.status(400).send('Error : ' + error)
    }
})

export default router