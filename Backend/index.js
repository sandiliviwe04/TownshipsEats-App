// index.js
import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/paymentRoutes.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5400;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api', paymentRoutes);

app.get('/', (req,res) => res.send('Server is running'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
