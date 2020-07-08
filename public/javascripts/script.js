let myMap

window.onload = () => {

    const ironhackMad = {
        lat: 40.392450,
        lng: -3.698187
    }

    let mapOptions = {
                center: ironhackMad,
                zoom: 15,
                styles: mapStyles.graySimple
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
        let contentString = `<h6> ${restaurant.name}</h6>` + `<p>Rating: ${restaurant.rating}</p>` + `<p>Dirección: ${restaurant.address}</p>` + `<p>Rango de precios: ${restaurant.priceLevel}</p>` + `<p><a href="/restaurants/route/${restaurant._id}">Ruta hasta aquí</a></p>` + `<a href="/restaurants/${restaurant._id}">Detalles</a>`
        
        let infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 300
        })
            const center = {
                lat: restaurant.location.lat,
                lng: restaurant.location.lng
            }

            let image = "../images/mapMarker.png"
            setTimeout(()=>{
            let marker = new google.maps.Marker({
                    position: center,
                    map: myMap,
                    title: restaurant.name,
                    animation: google.maps.Animation.DROP,
                    icon: image      
                })
            marker.addListener("click", function(){
                infowindow.open(myMap, marker)})
            }, 100 * index)
        })
}