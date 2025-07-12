const CityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener('click',()=>{
    if(CityInput.value.trim() != ""){
        console.log(CityInput.value);
        CityInput.value ="";  
    }
})

CityInput.addEventListener('keydown',()=>{
    if(event.key == "Enter" && CityInput.value.trim() != ""){
        console.log(CityInput.value);
        CityInput.value =""; 
    }
})