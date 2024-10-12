const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));
app.use('/api/course-types', require('./routes/courseTypeRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/experts', require('./routes/expertRoutes'));
app.use('/api/evaluations', require('./routes/evaluationRoutes'));
app.use('/api/allotments', require('./routes/allotmentRoutes'));
app.use('/api/transcriptions', require('./routes/transcriptionRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));