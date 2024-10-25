const sequelize = require('../config/database');

const healthCheck = async (req, res) => {
  // Check for payload and return 400 if present
  if (Object.keys(req.body).length > 0) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  try {
    // Check database connection
    await sequelize.authenticate();
    res.set('Cache-Control', 'no-cache');
    return res.status(200).send(); // No payload
  } catch (error) {
    console.error('Database connection failed:', error);
    res.set('Cache-Control', 'no-cache');
    return res.status(503).send(); // No payload
  }
};

module.exports = { healthCheck };
