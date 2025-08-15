const temperature = document.getElementById('temperature');
const color_change = document.querySelector('.color_change');
const color_btn = document.querySelector('.color_btn');

async function getWeather() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const apiKey = "ecf07bafe5f67fa8a66abd728beb563b";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const weatherData = await res.json();

    temperature.innerHTML = `
      <h1 class="text-center mt-2">Weather in ${weatherData.name}</h1>
      <h3 class="text-center mt-2 py-2 ">${weatherData.main.temp}<sup>°C</sup></h3>
      <p class="text-center">${weatherData.weather[0].description}</p>
      <p class="text-center">
        ${weatherData.weather[0].main} 
        <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" 
             alt="Weather Icon" style="vertical-align: middle;">
      </p>
    `;

    let conditionMain = weatherData.weather[0].main.toLowerCase();

    if (conditionMain === "clouds") {
      bgVideo.src = "./aset/cloud.mp4";
      color_change.style.color = "white";
      color_btn.style.color = "white";
      color_btn.style.backgroundColor = "black";
    } else if (conditionMain === "rain") {
      bgVideo.src = "./aset/rain.mp4";
    } else if (conditionMain === "clear") {
      bgVideo.src = "./aset/celar.mp4";
      color_change.style.color = "black";
    } else if (conditionMain === "snow") {
      bgVideo.src = "./aset/snow.mp4";
    } else {
      bgVideo.src = "./aset/celar.mp4";
    }

  } catch (error) {
    Swal.fire({
      title: "Location Access Denied!",
      text: 'Please allow location access to get weather data.',
      imageUrl: './aset/cloud_18139877.png',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom image'
    });
  }
}

getWeather();
async function serchcity() {
  const cityInput = document.querySelector('#cityInput');
  const city = cityInput.value.trim();

  
  if (!city) {
    
    Swal.fire({
  title: "City name required!",
   text: 'Please enter a city name before searching.',
  imageUrl: './aset/cloud_18139877.png',
  imageWidth: 100,
  imageHeight: 100,
  imageAlt: 'Custom image'
});

    return;
  }

  try {
    const apiKey = "ecf07bafe5f67fa8a66abd728beb563b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);

    
    if (!res.ok) {
      throw new Error("City not found");
    }

    const citydata = await res.json();
    console.log(citydata);

    temperature.innerHTML = `
  <h1 class="text-center mt-2">Weather in ${citydata.name}</h1>
  <h3 class="text-center mt-2 py-2 ">${citydata.main.temp}<sup>°C</sup></h3>
  <p class="text-center">${citydata.weather[0].description}</p>
  <p class="text-center">
    ${citydata.weather[0].main} 
    <img src="https://openweathermap.org/img/wn/${citydata.weather[0].icon}@2x.png" 
         alt="Weather Icon" style="vertical-align: middle;">
  </p>
`;


    let conditionMain = citydata.weather[0].main.toLowerCase();

    if (conditionMain === "clouds") {
      bgVideo.src = "./aset/cloud.mp4";
      color_change.style.color = "white";
      color_btn.style.color = "white";
      color_btn.style.backgroundColor = "black";
    } 
    else if (conditionMain === "rain") {
      bgVideo.src = "./aset/rain.mp4";
    } 
    else if (conditionMain === "clear") {
      bgVideo.src = "./aset/celar.mp4";
      color_change.style.color = "black";
    } 
    else if (conditionMain === "snow") {
      bgVideo.src = "./aset/snow.mp4";
    } 
    else {
      bgVideo.src = "./aset/celar.mp4";
    }

  } catch (error) {
   
      Swal.fire({
  title: 'Oops...',
   text: 'City not found or an error occurred!',
  imageUrl: './aset/cloud_18139877.png',
  imageWidth: 100,
  imageHeight: 100,
  imageAlt: 'Custom image'
});
    console.error(error);
  }
  cityInput.value = ''; 
}

