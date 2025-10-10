require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function getCurrentWeather(city) {
    try {
        const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&lang=en&units=metric`;
        const response = await axios.get(url);
        console.log('Dados recebidos da API:', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function getForecast(city) {
    try {
        const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&lang=en&units=metric`;
        const response = await axios.get(url);
        console.log('Dados recebidos da API:', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCurrentWeather,
    getForecast
};
 

    
    
