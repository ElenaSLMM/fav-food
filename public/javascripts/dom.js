let priceLevel = document.querySelectorAll('.priceLevel')

function setPriceLevelImages ()  {
    
    priceLevel.forEach(priceLevel => {
        if(priceLevel.innerHTML == 'Rango de precios: 1'){
            priceLevel.innerHTML=`Rango de precios: <img src='/images/euro.png'>`
        }
        else if (priceLevel.innerHTML == 'Rango de precios: 2'){
            priceLevel.innerHTML=`Rango de precios: <img src='/images/euro.png'><img src='/images/euro.png'>`
        }
        else if (priceLevel.innerHTML == 'Rango de precios: 3'){
            priceLevel.innerHTML=`Rango de precios: <img src='/images/euro.png'><img src='/images/euro.png'><img src='/images/euro.png'>`
        }
        else if (priceLevel.innerHTML == 'Rango de precios: 4'){
            priceLevel.innerHTML=`Rango de precios: <img src='/images/euro.png'><img src='/images/euro.png'><img src='/images/euro.png'><img src='/images/euro.png'>`
        }
        else{
            priceLevel.innerHTML = `Rango de precios: desconocido`
        }
    })
}

setPriceLevelImages()




