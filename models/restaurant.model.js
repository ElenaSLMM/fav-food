const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: String,
    password: String,
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],     // ref: 'nombreModelo'
    rating: Number
}, {
    timestamps: true
})

const User = mongoose.model("Book", userSchema)

module.exports = User