require('dotenv').config()

const express = require('express')
const router = express.Router()
const passport = require("passport")
const session = require("express-session")

const axios = require("axios")
require('dotenv').config()


const Restaurant = require("../models/restaurant.model")

//--------------------------PUBlIC ENDPOINTS-------------------------
//List
router.get('/list', (req, res)  => {

    Restaurant
        .find()
        .then(restaurantArr => res.render('restaurants/restaurants', {restaurantArr} ))
        .catch(err => console.log('error: ', err))

})




//------------------------ENDPOINTS PRIVATES---------------
const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/user/login')

//Favs
router.get('/favs', checkAuthenticated, (req, res) => res.render('restaurants/favs-restaurants'))


//Wishlist

router.get('/wish', checkAuthenticated, (req, res) => res.render('restaurants/wish-restaurants'))


//Visited
router.get('/review', checkAuthenticated, (req, res) => res.render('restaurants/review-restaurants'))

//Details
router.get('/:id', (req, res) => {
        Restaurant
        .findById(req.params.id)
        .then(restaurant => {
            const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + restaurant.googleId + "&key=" + process.env.KEY
            console.log(url)
            axios.get(url)
            .then(response => 
                
                {
                    console.log(response.data)
                    res.render('restaurants/restaurant-details',
                {
                    data: response.data.result,
                    restaurant: restaurant
                }
                )}
                
                )
        })  
    })




module.exports = router