const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast } = require('./weather_api');
const { processCurrentWeather, processTomorrowWeather } = require('./weather_formatter');

router.get('/weather/today', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'Parâmetro city é obrigatório.' });
    }
    try {
        const rawData = await getCurrentWeather(city);
        const result = processCurrentWeather(rawData);
        res.json(result);
    } catch (error) {
        console.error('Erro completo:', error);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Cidade não encontrada.' });
        } else {
            res.status(500).json({ error: 'Erro ao buscar dados do clima.' });
        }
    }
});

router.get('/weather/tomorrow', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'Parâmetro city é obrigatório.' });
    }
    try {
        const rawData = await getForecast(city);
        const result = processTomorrowWeather(rawData);
        res.json(result);
    } catch (error) {
        console.error('Erro completo:', error);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Cidade não encontrada.' });
        } else {
            res.status(500).json({ error: 'Erro ao buscar dados do clima.' });
        }
    }
});

module.exports = router;