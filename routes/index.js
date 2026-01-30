import express from 'express';
import employeeRouter from './employees.js';
const router = express.Router();

// This "mounts" the employee routes. 
// You can add more lines here as your app grows!
router.use('/employees', employeeRouter);

export default router;