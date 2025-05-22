const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const gamesRoutes = require('./routes/games.routes');
const db = require('./db');

const app = express();
const port = 3000;


app.use(cors());

// Middleware JSON
app.use(bodyParser.json());

// Routes
app.use('/api/games', gamesRoutes);

// Route test
app.get('/', (req, res) => {
  res.send('🎮 Backend Instant Gaming en ligne');
});

app.listen(port, () => {
  console.log(`🚀 Serveur Express lancé sur http://localhost:${port}`);
});
