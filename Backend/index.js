// index.js
import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();
const PORT = 5400;

// Enable CORS for Vue frontend port (default Vite: 5173)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', paymentRoutes);

app.get('/', (req,res) => res.send('Server is running'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

