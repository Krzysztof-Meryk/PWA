const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('p.error_message');
const date = document.querySelector('p.date');
const cityName = document.querySelector('h2.city_name');
const img = document.querySelector('img.weather_img');
const temp = document.querySelector('span.temp');
const description = document.querySelector('p.weather_description');
const feelsLike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const windSpeed = document.querySelector('span.wind_speed');
const visibility = document.querySelector('span.visibility');
const clouds = document.querySelector('span.clouds');

const apiInfo = {
    link: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '&appid=155ea1a490d7756365b12aa456cf8c6c',
    units: '&units=metric',
    lang: '&lang=pl',
};

const getweatherInfo = () => {
    const apiInfoCity = input.value.trim();

    if (!apiInfoCity) {
        errorMsg.textContent = '⚠️ Wprowadź nazwę miasta';
        return;
    }

    const apiURL = `${apiInfo.link}${apiInfoCity}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;

    axios.get(apiURL)
        .then((response) => {
            // Wyczyść poprzedni błąd
            errorMsg.textContent = '';

            const timestamp = response.data.dt;
            const timezone = response.data.timezone;
            const localTime = new Date(Date.now() + 1000 * timezone - 7200000);

            date.textContent = localTime.toLocaleString('pl-PL', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });

            cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
            description.textContent = `${response.data.weather[0].description}`;
            img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
            temp.textContent = `${Math.round(response.data.main.temp)}°C`;
            feelsLike.textContent = `${Math.round(response.data.main.feels_like)}°C`;
            pressure.textContent = `${response.data.main.pressure} hPa`;
            humidity.textContent = `${response.data.main.humidity} %`;
            windSpeed.textContent = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
            visibility.textContent = `${response.data.visibility / 1000} km`;
            clouds.textContent = `${response.data.clouds.all}%`;
        })
        .catch((error) => {
            console.log(error);

            let message = 'Wystąpił błąd. Spróbuj ponownie.';

            if (error.response) {
                const code = error.response.data.cod;
                const msg = error.response.data.message || 'Nieznany błąd';
                message = `${code} - ${msg}`;
            }

            errorMsg.textContent = message;

            // Wyczyść dane pogodowe
            [date, cityName, temp, description, feelsLike, humidity, pressure, windSpeed, visibility, clouds].forEach(el => {
                el.textContent = '';
            });
            img.src = '';
        })
        .finally(() => {
            input.value = '';
        });
};

const getweatherInfoByEnter = (e) => {
    if (e.key === 'Enter') {
        getweatherInfo();
    }
};

button.addEventListener('click', getweatherInfo);
input.addEventListener('keypress', getweatherInfoByEnter);