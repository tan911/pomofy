import { Router } from 'express'

const route: Router = Router()

route.get('/', (req, res) => {
    if (!req.query.id) {
        throw Error('Failed')
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
