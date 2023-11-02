const mongoose = require ('mongoose')

//Definir el modelo para bootcamps

const bootcampSchema = mongoose.Schema({
    name:{
        type: String,
        unique: [true, "nombre de bootcamp debe ser único"],
        required: [true, "Nombre de bootcamp requerido"],
        maxlength: [50, "longitud de nombre menor a 50"]
    },
    phone:{
        type: Number,
        maxlength: [10, "longitud de nombre menor a 10"]
    },
    address:{
        type: String,
        required: [true, "direccion requerida"],
    },
    topics:{
        type: [String],
        enum: [
            "AI",
            "Frontend/UX",
            "Backend",
            "DevOps"
        ]
    },
    averageRating:Number,
    createdAt: Date
})

module.exports = mongoose.model('Bootcamps', bootcampSchema)