// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const helloRoute = require('./routes/hello');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/hello', helloRoute);

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => console.error('Could not connect to MongoDB...', err));

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const countRoutes = require('./routes/count');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', countRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});