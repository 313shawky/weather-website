const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
"October", "November", "December"];

let searchLocation = document.querySelector('#find');

async function getWeatherData(location){
    let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0333cac80e064439b24221306231802&q=${location}&days=3`);
    let result = await apiResponse.json();
    if(result.error === undefined){
        displayCurrent(result.location, result.current);
        displayForecast(result.forecast.forecastday);
    }
}

getWeatherData('cairo');

searchLocation.addEventListener('input', function(eventInfo){
    if(eventInfo.target.value.length >= 3){
        getWeatherData(eventInfo.target.value);
    }
});

function displayCurrent(locationObj, currentObj){
    let day = new Date(currentObj.last_updated);
    let content = `<div class="current-header text-white d-flex justify-content-between p-2">
        <span id="today">${days[day.getDay()]}</span>
        <span id="today-date">${day.getDate() + ' ' + months[day.getMonth()]}</span>
    </div>
    <div class="p-3">
        <h4 id="location" class="py-2 text-center fs-2">${locationObj.name}</h4>
        <div class="py-2 d-flex justify-content-between align-items-center">
            <div class="temp">${currentObj.temp_c}<sup>o</sup>C</div>
            <div><img class="condition-icon" src="http://${currentObj.condition.icon}" alt=""></div>
        </div>
        <span class="condition-text py-3">${currentObj.condition.text}</span>
        <div class="py-3 d-flex justify-content-around text-light">
            <span><img id="cloud" class="me-1" src="images/icon-umberella.png" alt="">${currentObj.cloud}%</span>
            <span><img id="wind-speed" class="me-1" src="images/icon-wind.png" alt="">${currentObj.wind_kph}km/h</span>
            <span><img id="wind-direction" class="me-1" src="images/icon-compass.png" alt="">${currentObj.wind_dir}</span>
        </div>
    </div>`;
    document.querySelector('#current').innerHTML = content;
}

function displayForecast(arr){
    let content = ``;
    for(let i = 1; i < arr.length; i++){
        let day = new Date(arr[i].date);
        content += `<div id="forecast${i}" class="col-md-6 p-0">
        <div class="forecast${i}-header text-white d-flex justify-content-between p-2">
            <span id="tomorrow">${days[day.getDay()]}</span>
            <span id="tomorrow-date">${day.getDate() + ' ' + months[day.getMonth()]}</span>
        </div>
        <div class="text-center p-3">
            <div class="m-2 p-3">
                <img class="condition-logo" src="http://${arr[i].day.condition.icon}" alt="">
            </div>
            <div class="m-3">
                <div class="max-temp">${arr[i].day.maxtemp_c}<sup>o</sup>C</div>
                <div class="min-temp">${arr[i].day.mintemp_c}<sup>o</sup>C</div>
            </div>
            <div class="condition-text my-5">${arr[i].day.condition.text}</div>
        </div>
    </div>`
    };
    document.querySelector('#forecast').innerHTML = content;
}

