let myMap

window.onload = () => {

    const ironhackMad = {
        lat: 40.392450,
        lng: -3.698187
    }

    let mapOptions = {
                center: ironhackMad,
                zoom: 15,
            }

    myMap = new google.maps.Map(document.getElementById('myRoute'), mapOptions)

    setPlaces(locationRest)
}  

function setPlaces (obj) {
        const center = {
            lat: obj.lat,
            lng: obj.lng
        }

        new google.maps.Marker({
            position: center,
            map: myMap,
            title: obj.name,
            animation: google.maps.Animation.DROP,

        })
}