const axios = require("axios")
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DB)
const Restaurant = require("../models/restaurant.model")

storeRestaurants(null)

function storeRestaurants(nextPageToken) {
    let url = ''
    let restaurantsArr = []

    if (nextPageToken == null){
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.392533,-3.698207&radius=1500&type=restaurant&key=" + process.env.KEY
    } else {
        url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=` + nextPageToken + `&key=` + process.env.KEY
    }
    
    axios
        .get(url)
        .then(response => {
            response.data.results.forEach(restaurant => {
                restaurantsArr.push({
                    name: restaurant.name,
                    address: restaurant.vicinity,
                    location: {
                        lat: restaurant.geometry.location.lat,
                        lng: restaurant.geometry.location.lng
                    },
                    priceLevel: restaurant.price_level,
                    website: restaurant.website,
                    rating: restaurant.rating,
                    googleId: restaurant.place_id
                })

            })

            Restaurant.create(restaurantsArr)
        
            if(response.data.next_page_token){
                setTimeout(()=> storeRestaurants(response.data.next_page_token), 2000)
            }

        })
        .catch (error => console.log(error))
}



