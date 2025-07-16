const express = require('express');
require('dotenv').config();
const cors = require('cors'); 
const app = express();

app.use(cors());          
app.use(express.json());

// Routes
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}, using DB Dialect: ${require('./config/config.js').development.dialect}`)
);
