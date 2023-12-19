import express from 'express';
import { dashboardController } from '../controllers/dashboardController.js';

const dashboardRoute = express.Router()


dashboardRoute.get('/dashboard' ,  dashboardController)


export default dashboardRoute