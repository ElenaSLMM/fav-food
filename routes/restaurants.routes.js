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

// Mongo Access - return Json for Google Maps

router.get('/api', (req, res) => {
    Restaurant
        .find()
        .then(restaurantArr => res.json({restaurantArr}))
        .catch (err => console.log('error: ', err))

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
        .catch(err => console.log('error: ', err))

})

//Favs
router.get('/favs', checkAuthenticated, (req, res) => {

    User
        .findById(req.user._id)
        .populate('favourites')
        .then(user =>  {
            let array = user.favourites
            res.render('restaurants/favs-restaurants', {array})})
        .catch(err => console.log('error: ', err))
})



router.post('/favs/add/:id', checkAuthenticated, (req, res, next) => {

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
                    res.redirect('/restaurants/favs')
                })  
        })
        .catch(err => console.log('error: ', err))
})

router.get('/favs/delete', checkAuthenticated, (req, res) => {

    User
        .findById(req.user._id)
        .then(user => {
            let array = user.favourites
            let newArray = array.filter(restaurant => restaurant != req.query.id)
            user.favourites = newArray
            user.save()
            res.redirect('/restaurants/favs')
        })
        .catch(err => console.log('error', err))

})

//Reviews

router.get('/reviews', checkAuthenticated, (req,res) => {
    User
        .findById(req.user.id)
        .populate('opinions.restaurant')
        .then(user => {
            let opinionsArr = user.opinions
            res.render('restaurants/review-restaurants', {opinionsArr})})
        .catch(err => console.log('error en la vista de reviews', err))
})

router.get('/reviews/delete', checkAuthenticated, (req, res) => {
    User
        .findById(req.user._id)
        .then(user => {
            let array = user.opinions
            let newArray = array.filter(opinion => opinion.id != req.query.id)
            user.opinions = newArray
            user.save()
            res.redirect('/restaurants/reviews')
        })
        .catch(err => console.log('error', err))
})


router.get('/reviews/new/:id', checkAuthenticated, (req, res) => {
    Restaurant
        .findById(req.params.id)
        .then((restaurant)=> res.render('restaurants/review-restaurant-form', restaurant))
        .catch(err => console.log('error: ', err))
})


router.post('/reviews/new/:id', checkAuthenticated, (req, res) =>{

let {date, comments, rating} = req.body

    Restaurant
        .findById(req.params.id)
        .then(restaurant =>{

            User
                .findById(req.user._id)
                .then(user => {
                    let review = {restaurant, date, comments, rating}
                    user.opinions.push(review)
                    user.save()
                    res.redirect('/restaurants/reviews')
            })
        })
        .catch(err => console.log('error: ', err))
} )




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

