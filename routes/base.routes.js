const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => {
    res.render('index')
})


router.get('/restaurants', (req, res)  => {
    console.log('entro') 
    res.send('hola miguel')})


module.exports = router
