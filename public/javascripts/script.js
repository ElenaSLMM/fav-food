let myMap

window.onload = () => {

    const ironhackMad = {
        lat: 40.392450,
        lng: -3.698187
    }

    let mapOptions = {
                center: ironhackMad,
                zoom: 15,
                // styles: mapStyles.aubergine
            }


    myMap = new google.maps.Map(document.getElementById('myMap'), mapOptions)

    getPlaces()

}   

function getPlaces(){
    axios
        .get('/restaurants/api')
        .then(json => setPlaces(json.data.restaurantArr))
        .catch(err => console.log('error', err))
        
}

function setPlaces(arr){
    arr.forEach((restaurant, index) => {
            const center = {
                lat: restaurant.location.lat,
                lng: restaurant.location.lng
            }

            let image = "../images/mapMarker.png"
            setTimeout(()=>{
                new google.maps.Marker({
                    position: center,
                    map: myMap,
                    title: restaurant.name,
                    animation: google.maps.Animation.DROP,
                    icon: image      
                })
            }, 100 * index)
        })
}