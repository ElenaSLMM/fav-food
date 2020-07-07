let myRoute

window.onload = () => {

    const ironhackMad = {
        lat: 40.392450,
        lng: -3.698187
    }

    let mapOptions = {
                center: ironhackMad,
                zoom: 15,
            }
    
    myRoute = new google.maps.Map(document.getElementById('myRoute'), mapOptions)

    const directionReq = { 
        origin: ironhackMad,
        destination: locationRest,
        travelMode: 'WALKING'
    }
    const directionService = new google.maps.DirectionsService

    directionService.route(
        directionReq, (response) => {
            const directionsDisplay = new google.maps.DirectionsRenderer
            directionsDisplay.setDirections(response)
            directionsDisplay.setMap(myRoute)
        }
    )

}
