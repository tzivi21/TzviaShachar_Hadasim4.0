const DB_actions=require('../modules/DB_access/DB_PatientVaccines_actions');
const DB_patient_actions=require('../modules/DB_access/DB_patients_actions');
const validation=require('../modules/validation');

const PatientVaccineController = {
   
    createPatientVaccine: async (req, res) => {
        try {
            const  patientVaccine  = req.body;
            if(!validation.validatePatientVaccineData(patientVaccine)){
                res.status(400).json({ error: 'invalid data' });
                res.end();
            }
            //checking if the patient has already 4 vaccines
            const vaccines=await DB_patient_actions.getPatientVaccinesById(patientVaccine.patient_id);
            if(vaccines!=null&&vaccines.lengh==4){
                throw('a patient can have only up to 4 vaccines');
            }

            await DB_actions.createPatientVaccines(patientVaccine);
            res.status(200).json(patientVaccine);
            res.end();
            
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },

   
    getAllPatientVaccines: async (req, res) => {
        try {
            let patientVaccines=await DB_actions.getAllPatientVaccines();
            res.status(200).json(patientVaccines);
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },

    
    getPatientVaccineById: async (req, res) => {
        try {
            const patient_id = req.params.patient_id;
            const vaccine_id = req.params.vaccine_id;        
            let patientVaccine=await DB_actions.getPatientVaccineByPatientId(patient_id,vaccine_id);
            res.status(200).json(patientVaccine);
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },

    
    updatePatientVaccine: async (req, res) => {
        try {
            const patient_id = req.params.patient_id;
            const vaccine_id = req.params.vaccine_id;             
            const updatedPatientVaccineData = req.body;
            if(!validation.validatePatientVaccineData(updatedPatientVaccineData)){
                res.status(400).json({ error: 'invalid data' });
                res.end();
            }
            await DB_actions.updatePatientVaccine(updatedPatientVaccineData);
            res.status(200).json(updatedPatientVaccineData);
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },

   
    deletePatientVaccine: async (req, res) => {
        try {
            const patient_id = req.params.patient_id;
            const vaccine_id = req.params.vaccine_id; 
            await DB_actions.deletePatientVaccine(patient_id,vaccine_id);
            res.status(200).json('the PatientVaccine was deleted succefully');
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    }
};

module.exports = PatientVaccineController;
