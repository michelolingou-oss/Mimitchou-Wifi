const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const paymentRoutes = require('./routes/payments');
const wifiAuthRoutes = require('./routes/wifiAuth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// PostgreSQL database connection
const pool = new Pool({
    user: 'yourUsername', // replace with your database username
    host: 'localhost', // replace with your database host
    database: 'yourDatabase', // replace with your database name
    password: 'yourPassword', // replace with your database password
    port: 5432, // default PostgreSQL port
});

// Payment routes
app.use('/api/payments', paymentRoutes);

// WiFi authentication routes
app.use('/api/wifi-auth', wifiAuthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
