import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './config/database';
import userRoutes from './routes/userRoutes';
import patientRoutes from './routes/patientRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/tasks', taskRoutes);

// Sync DB
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

export default app;
