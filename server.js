const express = require ('express');
const weatherRoutes = require('./weather_routes');

const app = express();

app.use('/', weatherRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});