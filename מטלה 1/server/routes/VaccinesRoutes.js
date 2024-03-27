const express = require('express');
const router=express.Router();
const VaccinesController=require('../controllers/VaccinesController')

// update a new vaccine
router.post('/:id', VaccinesController.updateVaccine);

// Get all vaccines
router.get('/', VaccinesController.getAllVaccines);

// Get a single vaccine by ID
router.get('/:id', VaccinesController.getVaccineById);

// create a vaccine by ID
router.put('/:id', VaccinesController.createVaccine);

// Delete a vaccine by ID
router.delete('/:id', VaccinesController.deleteVaccine);

module.exports=router;