const CityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");


const notfounsection = document.querySelector(".not-found");
const searchcitysection = document.querySelector(".search-city");
const weatherseaction = document.querySelector(".weather-info");

const countrytxt = document.querySelector(".country-txt");
const temptxt = document.querySelector(".temp-txt");
const conditiontxt = document.querySelector(".condition-txt");
const humidityvaluetxt = document.querySelector(".humidity-value-txt");
const windvaluetxt = document.querySelector(".wind-value-txt")
const weathersummaryimg = document.querySelector(".weather-summary-img")
const currentdatatxt = document.querySelector(".current-data-txt")
const forecastitemcontainer = document.querySelector(".forecast-item-container")

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

function getweathericon(id){
    if(id <= 236) return 'thunderstorm.svg'
    if(id <= 321) return 'drizzle.svg'
    if(id <= 531) return 'rain.svg'
    if(id <= 622) return 'snow.svg' 
    if(id <= 781) return 'atmosphere.svg' 
    if(id <= 800) return 'clear.svg'
    else{
        return 'clouds.svg'
    } 
}
function getcurrentdate(){
    const currentdate = new Date()
    const option ={
        weekday : 'short',
        day : '2-digit',
        month:'short'
    }
   return (currentdate.toLocaleDateString('en-GB',option))
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData("weather", city);
    if(weatherData.cod != 200){
        showDisplayseaction(notfounsection)
        return
    }
    const {
        name : country,
        main :{temp,humidity},
        weather:[{id,main}],
        wind:{speed}
    } = weatherData

    countrytxt.textContent = country;
    temptxt.textContent = Math.round(temp) + " °C"
    conditiontxt.textContent = main
    humidityvaluetxt.textContent = humidity+"%"
    windvaluetxt.textContent = speed+"M/s"
    weathersummaryimg.src =`assets/assets/weather/${getweathericon(id)}`
    currentdatatxt.textContent = getcurrentdate();

    await updateforecastinfo(city); 
    showDisplayseaction(weatherseaction)
}


async function updateforecastinfo(city){
    const forecastdate = await getFetchData("forecast",city) 
    const timetake ='12:00:00'
    const todaydate = new Date().toISOString().split('T')[0];

    forecastitemcontainer.innerHTML =""
    forecastdate.list.forEach(forecastweather =>{
        if(forecastweather.dt_txt.includes(timetake) && !forecastweather.dt_txt.includes(todaydate)) {
            updatedorecastinfo(forecastweather)
        }
        
    })
}

function updatedorecastinfo(weatherdata){

    const {
        dt_txt : date,
        main :{temp},
        weather : [{id}]
    } = weatherdata

    const datetaken = new Date(date)
    const dateoption = {
        weekday:"short",
        day :"2-digit"
    }
    const dateresult = datetaken.toLocaleDateString("en-US",dateoption)

    console.log(dateresult)
    
    const forecastitem = `
                    <div class="forecast-item">
                        <h5 class="forecast-item-date regular-txt">
                           ${dateresult}
                        </h5>
                        <img src="assets/assets/weather/${getweathericon(id)}" class="forecast-item-img">
                        <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
                    </div>`
    forecastitemcontainer.insertAdjacentHTML("beforeend",forecastitem)
}
function showDisplayseaction(section){
    [weatherseaction, searchcitysection ,notfounsection]
    .forEach(section => section.style.display = "none")

    section.style.display = "flex"
}