const express = require('express')
const router = new express.Router()
const Canciones = require('../models/canciones')

router.post('/canciones', async (req, res) => {
    const canciones = new Canciones(req.body)

    try {
        await canciones.save()
        res.status(201).send(canciones)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/canciones', async (req, res) => {
    try {
        const cancioness = await Canciones.find({})
        res.send(cancioness)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/canciones/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const canciones = await Canciones.findById(_id)

        if (!canciones) {
            return res.status(404).send()
        }

        res.send(canciones)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/canciones/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['artista', 'cancion','anyo']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const canciones = await Canciones.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!canciones) {
            return res.status(404).send()
        }

        res.send(canciones)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/cancioness/:id', async (req, res) => {
    try {
        const canciones = await Canciones.findByIdAndDelete(req.params.id)

        if (!canciones) {
            res.status(404).send()
        }

        res.send(canciones)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router