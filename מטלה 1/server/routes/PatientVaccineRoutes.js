const express = require('express');
const router=express.Router();
const PatientVaccinesController=require('../controllers/PatientVaccinesController')

// update a new PatientVaccine
router.post('/:patient_id/:vaccine_id', PatientVaccinesController.updatePatientVaccine);

// Get all PatientVaccines
router.get('/', PatientVaccinesController.getAllPatientVaccines);

// Get a single PatientVaccine by ID
router.get('/:patient_id/:vaccine_id', PatientVaccinesController.getPatientVaccineById);

// create a PatientVaccine by ID
router.put('/:patient_id/:vaccine_id', PatientVaccinesController.createPatientVaccine);

// Delete a PatientVaccine by ID
router.delete('/:patient_id/:vaccine_id', PatientVaccinesController.deletePatientVaccine);

module.exports=router;