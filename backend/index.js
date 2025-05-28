const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const gamesRoutes = require('./routes/games.routes');
const authRoutes = require('./routes/auth.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

// Middleware JSON
app.use(bodyParser.json());

// Routes
app.use('/api/games', gamesRoutes);
app.use('/api', authRoutes);
app.use('/api/wishlist', wishlistRoutes); 

// Route test
app.get('/', (req, res) => {
  res.send('🎮 Backend Instant Gaming en ligne');
});

app.listen(port, () => {
  console.log(`Serveur Express lancé sur http://localhost:${port}`);
});
