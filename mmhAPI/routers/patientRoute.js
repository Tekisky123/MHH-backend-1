import express from 'express';
import { createPatient, deletePatient, getPatient, updatePatient } from '../controllers/patientController.js';
const patientRouter = express.Router();

patientRouter.post('/create' , createPatient)
patientRouter.get('/getpatient' , getPatient)
patientRouter.put('/:id' , updatePatient)
patientRouter.delete('/:id' , deletePatient)


export default patientRouter;