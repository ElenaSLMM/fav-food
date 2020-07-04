module.exports = app => {
    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/user', require('./user.routes.js'))
    app.use('/restaurants', require('./restaurants.routes.js'))

}