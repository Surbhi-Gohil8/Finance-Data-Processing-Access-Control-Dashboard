require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const connectDB = require('./config/db');
const logger = require('./config/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const ApiError = require('./utils/ApiError');
const { apiLimiter } = require('./middlewares/rateLimit.middleware');

const app = express();

// Connect to Database
connectDB();

// Setup Morgan logger
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Security Middleware
app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply Rate Limiting
app.use('/api', apiLimiter);

// Swagger Documentation setup (optional but good for testing)
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount main routes for v1 API
app.use('/api/v1', routes);

// Handle unknown API requests
app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'));
});

// Central error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
