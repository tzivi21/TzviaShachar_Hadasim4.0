const express = require('express');
const router=express.Router();
const PatientsController=require('../controllers/PatientsController');

// update a new patient
router.post('/:id', PatientsController.updatePatient);

// Get all patients
router.get('/', PatientsController.getAllPatients);

// Get a single patient by ID
router.get('/:id', PatientsController.getPatientById);

// Get all single patient vacines
router.get('/:id/vaccines', PatientsController.getPatientVaccines);

// create a patient by ID
router.put('/:id', PatientsController.createPatient);

// Delete a patient by ID
router.delete('/:id', PatientsController.deletePatient);

module.exports=router;