import express from 'express'
import nPrimes from '../methods/primes.js'

const router = express.Router()

router.get('/:n', (request, response) => {
    response.send(nPrimes(request.params.n || 0))
})

router.post('/', (request, response) => {
    response.send(nPrimes(request.body.n || 0))
})

export default router