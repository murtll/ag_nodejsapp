import express from 'express'
const router = express.Router()

import User from '../models/User.js'

router.get('/', async(request, response) => {
    try {
        const gender = request.query.gender
        const nameEndsWith = request.query.nameEndsWith
        const limit = Number(request.query.limit) || 0

        if (gender !== undefined &&
            gender.toUpperCase() !== 'M' &&
            gender.toUpperCase() !== 'F') {
                response.status(400).send({"error": "Invalid gender"})
                return
        }

        var users

        if (nameEndsWith !== undefined) {
            if (gender !== undefined) {
                users = await User.find({
                    name: { $regex: `.*${nameEndsWith}$` },
                    gender: gender.toUpperCase()
                }).limit(limit)
            } else {
                users = await User.find({
                    name: { $regex: `.*${nameEndsWith}$` }
                }).limit(limit)
            }
        } else {
            if (gender !== undefined) {
                users = await User.find({
                    gender: gender.toUpperCase()
                }).limit(limit)
            } else {
                users = await User.find().limit(limit)
            }
        }
    
        response.json(users)
    } catch (error) {
        response.status(400).send({"error": error})
    }
})

router.delete('/', async(request, response) => {
    try {
        const nameEndsWith = request.query.nameEndsWith
        const interest = request.query.interest

        var result

        if (nameEndsWith !== undefined) {
            if (interest !== undefined) {
                result = await User.deleteMany({
                    name: { $regex: `.*${nameEndsWith}$` },
                    interests: interest
                })
            } else {
                result = await User.deleteMany({
                    name: { $regex: `.*${nameEndsWith}$` }
                })
            }
        } else {
            if (interest !== undefined) {
                result = await User.deleteMany({
                    interests: interest
                })
            } else {
                response.status(400).send({"error": "No filters passed."})
                return
            }
        }
    
        response.json(result)
    } catch (error) {
        response.status(400).send('Error : ' + error)
    }
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