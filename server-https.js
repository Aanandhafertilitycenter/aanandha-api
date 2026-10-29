const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
require('dotenv').config();

const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/aanandha.bkcoders.co.in/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/aanandha.bkcoders.co.in/fullchain.pem'),
};

https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 HTTPS Server is running at https://localhost:${PORT}`);
});
