const express = require('express');
const sequelize = require('./config/database');
const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Health check routes
app.use('/api', healthRoutes);
app.use('/api', userRoutes);

// Connect to database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

module.exports = app