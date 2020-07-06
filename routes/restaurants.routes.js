require('dotenv').config()

const express = require('express')
const router = express.Router()
const passport = require("passport")
const session = require("express-session")

const axios = require("axios")

const mongoose = require('mongoose')

const Restaurant = require("../models/restaurant.model")
const User = require("../models/user.model")

const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/user/login', {errorMsg: 'Área restringida'})


//--------------------------PUBlIC ENDPOINTS-------------------------

//List
router.get('/list', (req, res)  => {

const isAuth = req.isAuthenticated()

    Restaurant
        .find()
        .then(restaurantArr => res.render('restaurants/restaurants', {restaurantArr: restaurantArr, isAuth: isAuth, user: req.user} ))
        .catch(err => console.log('error: ', err))
})



//------------------------PRIVATES ENDPOINTS--------------------------

//wish
router.get('/wish', checkAuthenticated, (req, res) => {

    User
        .findById(req.user._id)
        .populate('wishList')
        .then(user =>  {
            let array = user.wishList
            res.render('restaurants/wish-restaurants', {array})})
        .catch(err => console.log('error: ', err))
})

router.get('/wish/delete', checkAuthenticated, (req, res) => {

    User
        .findById(req.user._id)
        .then(user => {
            let array = user.wishList
            let newArray = array.filter(restaurant => restaurant != req.query.id)
            user.wishList = newArray
            user.save()
            res.redirect('/restaurants/wish')
        })


})

//Favs
router.get('/favs', checkAuthenticated, (req, res) =>{

    let Arr = req.user.favourites
    User.findById(req.user._id)
        .populate('favourites')
        .then(Arr => res.render('restaurants/favs-restaurants', {Arr}))
        .catch(err => console.log('error', err))
        console.log(Arr)
})



router.post('/favs/add/:id', (req, res) =>{
    
    Restaurant
    .findById(req.params.id)
    .then(restaurant => {
        User
            .findOne(req.user._id)
            .then(user => {
                if(!user.favourites.some(elem =>elem == restaurant.id)){
                    user.favourites.push(restaurant)
                    user.save()
                }
            })
            .catch(err=> console.log('error añadiendo fav', err)) 
           
    })
    .catch(err=> console.log('error añadiendo fav', err)) 

})



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


//------------------------PRIVATES ENDPOINTS-------------------

// WISH
//add restaurant to wishList

router.post('/wish/add/:id', checkAuthenticated, (req, res, next) => {

    Restaurant
        .findById(req.params.id)
        .then(restaurant => {
            User
                .findOne(req.user._id)
                .then(user => {
                    if(!user.wishList.some(elem =>elem == restaurant.id)){
                        user.wishList.push(restaurant)
                        user.save()
                    }
                    res.redirect('/restaurants/wish')
                })  
        })
})


module.exports = router

