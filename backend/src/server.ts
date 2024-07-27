import express, { json } from 'express';
import cors from 'cors';
import mssql from 'mssql';
import authRouter from './app/routes/authRoutes';
import viewRouter from './app/routes/viewRoutes';
import incidentRouter from './app/routes/incidentRoutes';
import pollRouter from './app/routes/pollRoutes';
import voteRouter from './app/routes/voteRoutes';
import { sqlConfig } from './config';

// Initialize the application
const app = express();

// Add a body to the requests
app.use(json());

// Use CORS for communication with the frontend
// app.use(cors());

// Add middleware and respective URLs
app.use('/auth', authRouter);
app.use('/views', viewRouter);
app.use('/incidents', incidentRouter);
app.use('/polls', pollRouter);
app.use('/votes', voteRouter);

// Connect to the database
mssql.connect(sqlConfig)
  .then(pool => {
    if (pool.connected) {
      console.log('Database connected!');
    }
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

// Start the application
const port = process.env.PORT || 4000;  // Use the port from the environment variable or default to 4000
app.listen(port, () => {
  console.log(`The server is running on port ${port}...`);
});
