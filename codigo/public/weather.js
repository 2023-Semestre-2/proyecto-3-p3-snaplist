// Weather.js

const apiKey = 'd94d1e9af8d2decdf936fe7c6bb3d928';
const weatherElement = document.getElementById('weather');

function updateWeather() {
    // Get user's location using a free IP geolocation API (you can replace this with a more accurate method)
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const userLocation = `${data.city}, ${data.country_name}`;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&units=metric&lang=es&appid=${apiKey}`;

            // Fetch weather data from OpenWeatherMap API
            fetch(apiUrl)
                .then(response => response.json())
                .then(weatherData => {
                    const temperature = weatherData.main.temp;
                    const weatherDescription = weatherData.weather[0].description;

                    // Update the weather element on the page
                    weatherElement.textContent = `${userLocation} | ${temperature}°C, ${weatherDescription}`;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching user location:', error);
        });
}

// Update the weather immediately when the page loads
updateWeather();

// Update the weather every 15 minutes (you can adjust the interval)
setInterval(updateWeather, 900000); // 900000 milliseconds = 15 minutes



