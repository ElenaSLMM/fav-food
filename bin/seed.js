const axios = require("axios")
require('dotenv').config()

const Restaurant = require("../models/restaurant.model")

let restaurantsArr = []

storeRestaurants(null)

function storeRestaurants(nextPageToken) {

    let token
    let url = ''

    if (nextPageToken == null){
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.392533,-3.698207&radius=1000&type=restaurant&key=" + process.env.KEY
        console.log(url)
    } else {
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=" + nextPageToken + '&key=' + process.env.KEY
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
                    rating: restaurant.rating
                })

            })
            if(response.data.next_page_token){
                token = response.data.next_page_token
            }

        })
        .catch (error => console.log(error))

    if(token){
        storeRestaurants(token)

    }
}
console.log(restaurantsArr)


