import { Router } from 'express'
// import { ErrorServices } from '../services/error'

const route = Router()

route.get('/', (req, res) => {
    if (!req.query.id) {
        // throw new ErrorServices({ message: 'Access denied database', statusCode: 500 })
        throw Error('Failed saasdasdad')
    }
    res.status(200).json({
        message: 'todo route',
    })
})

route.delete('/:id', (req, res) => {
    res.status(201).json({
        message: 'deleted',
        id: req.params.id,
    })
})

export default route
