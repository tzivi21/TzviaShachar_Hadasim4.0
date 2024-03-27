const DB_actions = require('../modules/DB_access/DB_patients_actions');
const validation = require('../modules/validation');

const PatientsController = {

    createPatient: async (req, res) => {
        try {
            let patient = req.body;
    
            // Asynchronously format dates
            const formattedBirthDatePromise = formatISODate(patient.birth_date);
            const formattedPositiveTestDatePromise = formatISODate(patient.positive_test_date);
            const formattedRecoveryDatePromise = formatISODate(patient.recovery_date);
    
            // Wait for all date formatting operations to complete
            const [formattedBirthDate, formattedPositiveTestDate, formattedRecoveryDate] = await Promise.all([
                formattedBirthDatePromise,
                formattedPositiveTestDatePromise,
                formattedRecoveryDatePromise
            ]);
    
            // Update patient object with formatted dates
            patient = {
                ...patient,
                birth_date: formattedBirthDate,
                positive_test_date: formattedPositiveTestDate,
                recovery_date: formattedRecoveryDate
            };
    
            // Validate patient input
            if (!validation.validatePatientInput(patient)) {
                return res.status(400).json({ error: 'invalid data' }); // Return to exit early
            }
    
            // Create patient in the database
            await DB_actions.createPatient(patient);
    
            res.status(200).json(patient);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    


    getAllPatients: async (req, res) => {
        try {
            let patients = await DB_actions.getAllPatients();
            res.status(200).json(patients);
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },


    getPatientById: async (req, res) => {
        try {
            const { id } = req.params;
            let patient = await DB_actions.getPatientById(id);
            res.status(200).json(patient);
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },


    updatePatient: async (req, res) => {
        try {
            const { id } = req.params;
            let updatedPatientData = req.body; // Use let instead of const to allow reassignment
            
            // Transforming the dates into the right pattern
            const formattedBirthDate =formatISODate(updatedPatientData.birth_date) ;
            const formattedPositiveTestDate =formatISODate(updatedPatientData.positive_test_date) ;
            const formattedRecoveryDate =formatISODate(updatedPatientData.recovery_date) ;
            
            // Initialize with new dates
            updatedPatientData = {
                ...updatedPatientData,
                birth_date: formattedBirthDate,
                positive_test_date: formattedPositiveTestDate,
                recovery_date: formattedRecoveryDate
            };
    
            if (!validation.validatePatientInput(updatedPatientData)) {
                return res.status(400).json({ error: 'invalid data' }); // Return to exit early
            }
            
            await DB_actions.updatePatient(updatedPatientData);
            res.status(200).json(updatedPatientData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    


    deletePatient: async (req, res) => {
        try {
            let { id } = req.params;
            let numid = parseInt(id);
            await DB_actions.deletePatient(numid);
            res.status(200).json('the patient was deleted succefully');
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },

    //option to get all the vaccines of a specific patient
    getPatientVaccines: async (req, res) => {
        try {
            const { id } = req.params;
            let vaccines = await DB_actions.getPatientVaccinesById(id);
            res.status(200).json(vaccines);
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },
};

function formatISODate(isoDateString) {
    // Parse ISO 8601 date string into a JavaScript Date object
    const dateObject = new Date(isoDateString);

    // Get the date part (YYYY-MM-DD) in the local timezone
    const formattedDate = dateObject.toISOString().split('T')[0];

    return formattedDate;
}

module.exports = PatientsController;
