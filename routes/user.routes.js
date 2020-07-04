const express = require("express")
const router = express.Router()
const passport = require("passport")
const session = require("express-session")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10


// User signup
router.get("/signup", (req, res) => res.render("user/signup"))
router.post("/signup", (req, res, next) => {

    const { username, password } = req.body

    if (!username || !password) {
        res.render("user/signup", { errorMsg: "Rellena el usuario y la contraseña" })
        return
    }

    User.findOne({ username })
        .then(user => {
            if (user) {
                res.render("user/signup", { errorMsg: "El usuario ya existe en la BBDD" })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ username, password: hashPass })
                .then(() => res.redirect("/"))
                .catch(() => res.render("user/signup", { errorMsg: "No se pudo crear el usuario" }))
        })
        .catch(error => next(error))
})


// User login


router.get('/login', (req, res) => res.render('user/login', { "errorMsg": req.flash("error") }))
router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true,
    passReqToCallback: true,
    badRequestMessage: 'Rellena todos los campos'
}))


// User logout
router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/user/login")
})


//---------------------PRIVATE ROUTES------------------------

// Is authenticated? 
const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/user/login')


//profile routes

router.get('/profile', checkAuthenticated, (req, res) => res.render('user/profile'))
router.get('/profile/edit', checkAuthenticated, (req, res) => res.render('user/profile-edit'))


module.exports = router





