require('dotenv').config()

const express = require('express')
const router = express.Router()
const passport = require("passport")
const session = require("express-session")

const axios = require("axios")

const Restaurant = require("../models/restaurant.model")
const User = require("../models/user.model")

const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/user/login', {errorMsg: 'Área restringida'})
const isLogged = (req, res, next ) => req.isAuthenticated() ? true : false

//--------------------------PUBlIC ENDPOINTS-------------------------

//List
router.get('/list', (req, res)  => {

const isAuth = isLogged(req)

    Restaurant
        .find()
        .then(restaurantArr => res.render('restaurants/restaurants', {restaurantArr: restaurantArr, isAuth: isAuth, user: req.user} ))
        .catch(err => console.log('error: ', err))
})




//------------------------ENDPOINTS PRIVATES---------------


//Favs
router.get('/favs', checkAuthenticated, (req, res) => res.render('restaurants/favs-restaurants'))


//Wishlist

router.get('/wish', checkAuthenticated, (req, res) => res.render('restaurants/wish-restaurants'))


//Visited
router.get('/review', checkAuthenticated, (req, res) => res.render('restaurants/review-restaurants'))



//--------------------------PUBlIC ENDPOINTS-------------------------
//Details
router.get('/:id', (req, res) => {


    Restaurant
        .findById(req.params.id)
        .then(restaurant => {
            const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + restaurant.googleId + "&key=" + process.env.KEY
            axios
                .get(url)
                .then(response =>{res.render('restaurants/restaurant-details',{data: response.data.result, restaurant: restaurant})})
                .catch(err => console.log('error: ', err))

        })  
    })


module.exports = router

