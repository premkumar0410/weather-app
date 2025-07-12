const CityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");


const apiKey ="7af3665977bf208d9c27ad860a6bdfe8";
searchBtn.addEventListener('click',()=>{
    if(CityInput.value.trim() != ""){
       updateWeatherInfo(CityInput.value);
        CityInput.value ="";  
    }
})

CityInput.addEventListener('keydown',()=>{
    if(event.key == "Enter" && CityInput.value.trim() != ""){
     updateWeatherInfo(CityInput.value);
        CityInput.value =""; 
    }
})

async function getFetchData(endpoint,city){
    const apiurl =`https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}&units=metric`;

    const respone = await fetch(apiurl);
    return respone.json()
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData("weather", city);
    console.log(weatherData);
}