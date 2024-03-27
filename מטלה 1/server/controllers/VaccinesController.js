const DB_actions=require('../modules/DB_access/DB_vaccines_actions');
const validation=require('../modules/validation');

const VaccinesController = {
   
    createVaccine: async (req, res) => {
        try {
            const vaccine  = req.body;
            if(!validation.validateVaccineData(vaccine)){
                res.status(400).json({ error: 'invalid data' });
                res.end();
            }
            await DB_actions.createVaccine(vaccine);
            res.status(200).json({ message: 'Vaccine created successfully' });
            res.end();
            
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },

   
    getAllVaccines: async (req, res) => {
        try {
            let vaccines=await DB_actions.getAllVaccines();
            res.status(200).json(vaccines);
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },

    
    getVaccineById: async (req, res) => {
        try {
            const { id } = req.params;
            let vaccine=await DB_actions.getVaccineById(id);
            res.status(200).json(vaccine);
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },

    
    updateVaccine: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedVaccineData = req.body;
            if(!validation.validateVaccineData(updatedVaccineData)){
                res.status(400).json({ error: 'invalid data' });
            }
            await DB_actions.updateVaccine(updatedVaccineData);
            res.status(200).json(updatedVaccineData);
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    },

   
    deleteVaccine: async (req, res) => {
        try {
            const { id } = req.params;
            await DB_actions.deleteVaccine(id);
            res.status(200).json('the vaccine was deleted succefully');
            res.end();
        } catch (error) {
            res.status(500).json({ error: error.message });
            res.end();
        }
    }
};

module.exports = VaccinesController;
