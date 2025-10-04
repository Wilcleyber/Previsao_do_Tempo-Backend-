const weatherTranslations = {
    'Clear': 'Céu limpo',
    'Clouds': 'Nuvens',
    'Rain': 'Chuva',
    'Drizzle': 'Garoa',
    'Thunderstorm': 'Trovoada',
    'Snow': 'Neve',
    'Mist': 'Névoa',
    'Smoke': 'Fumaça',
    'Haze': 'Neblina',
    'Dust': 'Poeira',
    'Fog': 'Nevoeiro',
    'Sand': 'Areia',
    'Ash': 'Cinzas',
    'Squall': 'Rajada',
    'Tornado': 'Tornado'
};

function translateCondition(condition) {
    return weatherTranslations[condition] || condition;
}

function processCurrentWeather(data) {
    return {
        data: 'Hoje',
        temperaturaAtual: Math.round(data.main.temp),
        tempMin: Math.round(data.main.temp_min),
        tempMax: Math.round(data.main.temp_max),
        condicao: translateCondition(data.weather[0].main),
        icone: data.weather[0].icon
    }
}

function processTomorrowWeather(forecastData) {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() +1);

    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const tomorrowForecasts = forecastData.list.filter(item =>
        item.dt_txt.startsWith(tomorrowStr)
    );

    let min = Infinity, max = -Infinity, conditions = {};
    let icon = '';

    tomorrowForecasts.forEach(item => {
        if (item.main.temp_min < min) min = item.main.temp_min;
        if (item.main.temp_max > max) max = item.main.temp_max;
        const cond = item.weather[0].main;
        conditions[cond] = (conditions[cond] || 0) +1;
        if (!icon) icon = item.weather[0].icon;
    });

    const mainCondition = Object.keys(conditions).reduce((a, b) => conditions[a] > conditions[b] ? a : b);

    return {
        data: 'Amanhã',
        tempMin: Math.round(min),
        tempMax: Math.round(max),
        condicao: translateCondition(mainCondition),
        icone: icon
    };
}

module.exports = {
    processCurrentWeather,
    processTomorrowWeather
};