const axios = require('axios')

const API_KEY = 'e3ff0c8ea7e34c135c253e9d66e0ebf1';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function getCurrentWeather(city) {
    try {
        const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&lang=en&units=metric`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function getForecast(city) {
    try {
        const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&lang=en&units=metric`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCurrentWeather,
    getForecast
};
 

    
    
