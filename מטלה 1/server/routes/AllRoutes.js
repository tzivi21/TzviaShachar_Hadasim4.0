const express = require('express');
const router = express.Router();
const PatientsRoutes = require('./PatientsRoutes');
const VaccinesRoutes = require('./VaccinesRoutes');
const PatientVaccineRoutes = require('./PatientVaccineRoutes');


router.use('/Patients', PatientsRoutes);
router.use('/Vaccines', VaccinesRoutes);
router.use('/PatientVaccines', PatientVaccineRoutes);


module.exports = router;
