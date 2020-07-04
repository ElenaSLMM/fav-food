const axios = require("axios")
const util = require('util')

axios
    .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.392533,-3.698207&radius=1000&type=restaurant&key=" + process.env.KEY)
    .then(res => console.log(res.data))
    
    // .then((res) => res.data.results.forEach(result => {
    //     console.log(util.inspect(result, false, null, true))

    // }))
    .catch(error => console.log(error))

