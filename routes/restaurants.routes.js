const express = require('express')
const router = express.Router()


//List
router.get('/list', (req, res)  => res.render('restaurants/restaurants'))





//------------------------ENDPOINTS PRIVATES-------------

//Favs
router.get('/favs', (req, res) => res.render('restaurants/favs-restaurants'))



//Wishlist

router.get('/wish', (req, res) => res.render('restaurants/wish-restaurants'))


//Visited
router.get('/visited', (req, res) => res.render('restaurants/visited-restaurants'))





module.exports = router