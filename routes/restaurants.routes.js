const express = require('express')
const router = express.Router()
const passport = require("passport")
const session = require("express-session")


//List
router.get('/list', (req, res)  => res.render('restaurants/restaurants'))



const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/user/login')



//------------------------ENDPOINTS PRIVATES---------------

//Favs
router.get('/favs', checkAuthenticated, (req, res) => res.render('restaurants/favs-restaurants'))


//Wishlist

router.get('/wish', checkAuthenticated, (req, res) => res.render('restaurants/wish-restaurants'))


//Visited
router.get('/review', checkAuthenticated, (req, res) => res.render('restaurants/review-restaurants'))





module.exports = router