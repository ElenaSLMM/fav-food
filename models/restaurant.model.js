const mongoose = require('mongoose')
const Schema = mongoose.Schema


const restaurantSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    location: {lat: {type: Number}, lng: {type: Number}},
    priceLevel: {
        type: Number,
        min: 1,
        max: 5
    },
    website: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    googleId: {type: String, required: true}
}, {
    timestamps: true
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant