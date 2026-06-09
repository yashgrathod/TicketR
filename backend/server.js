require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const ticketRoutes = require('./routes/tickets');
const app = express();
app.use(helmet());
app.set('trust proxy', 1);
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://ticketryashrathod.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);
app.get('/api/upload-url', (req, res) => {
  res.json({
    uploadUrl: 'https://mock-s3-bucket.amazonaws.com/mock-upload-url',
    fileUrl: 'https://mock-s3-bucket.amazonaws.com/mock-file.png',
    message: 'Mock S3 presigned URL generated successfully'
  });
});
app.use('/api/tickets', ticketRoutes);
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/support-crm';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
