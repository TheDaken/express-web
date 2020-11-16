const mongoose = require('mongoose')

const Canciones = mongoose.model('canciones', {
    artista: {
        type: String,
        required: true,
        trim: true
    },
    cancion: {
        type: String,
        required: true,
        trim: true
    },
    anyo:{
        type: Number,
        required:true,
        trim: true
    }
})

module.exports = Canciones