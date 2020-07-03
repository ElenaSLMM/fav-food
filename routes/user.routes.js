
const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10


// User signup
router.get("/signup", (req, res) => res.render("auth/signup"))
router.post("/signup", (req, res, next) => {

    const { username, password } = req.body

    if (!username || !password) {
        res.render("auth/signup", { errorMsg: "Rellena el usuario y la contraseña" })
        return
    }

    User.findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/signup", { errorMsg: "El usuario ya existe en la BBDD" })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ username, password: hashPass })
                .then(() => res.redirect("/"))
                .catch(() => res.render("auth/signup", { errorMsg: "No se pudo crear el usuario" }))
        })
        .catch(error => next(error))
})


// User login
router.get('/login', (req, res) => res.render('auth/login', { "errorMsg": req.flash("error") }))
router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
    badRequestMessage: 'Rellena todos los campos'
}))


// User logout
router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/login")
})

module.exports = router

// const express = require('express')
// const router = express.Router()

// // YOUR MODEL GOES HERE --> const Book = require('./../models/book.model')

// //YOUR ROUTES GO HERE 

// //Log-in routes
// router.get('/log-in', (req, res) => res.render('user/log-in'))

// //router.post('/log-in', (req, res) => res.render('user/log-in'))



// //sign-in routes

// router.get('/sign-in', (req, res) => res.render('user/sign-in'))
// //router.post('/sign-in', (req, res) => res.render('user/log-in'))


// //log-out routes

// router.get('/log-out', (req, res) => res.redirect('/'))



// //profile routes

// router.get('/profile', (req, res) => res.render('user/profile'))

// router.get('/profile/edit', (req, res) => res.render('user/profile-edit'))

// module.exports = router