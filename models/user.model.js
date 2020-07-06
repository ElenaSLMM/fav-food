const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, required: true},

    password: {type: String, required: true},

    favouritesArr: {type: [String]}, 
    //favourites: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],  
    //wishListArr: {type: [String]},
    wishList: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],

    opinions: [{
        restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
        date: {type: Date,
            default: Date.now
        },
        comments: {
            type: String,
            maxlength: 500
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
    }]
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User