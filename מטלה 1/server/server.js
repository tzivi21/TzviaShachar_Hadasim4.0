const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config');
const routes = require('./routes/AllRoutes');
const cors = require('cors');


app.use (cors ({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true}))
    

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Start Server
app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});
