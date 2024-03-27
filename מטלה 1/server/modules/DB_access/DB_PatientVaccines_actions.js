const mysql = require('mysql');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: 't0527607564',
    database: 'HMO'
};

async function createPatientVaccines(patientVaccinesData) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = 'INSERT INTO PatientVaccines SET ?';
        connection.query(sql, patientVaccinesData, (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error inserting new PatientVaccine:' + err));
            } else {
                resolve(result.insertId);
            }
        });
    });
}

async function deletePatientVaccine(patient_id, vaccine_id) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = `DELETE FROM PatientVaccines WHERE patient_id = ? AND vaccine_id = ? `;
        connection.query(sql,[patient_id,vaccine_id], (err, result) => {
            connection.end();
            if (err) {
                reject(new Error(`Error deleting PatientVaccine with id:${id}` + err));
            } else {
                resolve();
            }
        });
    });
}

async function updatePatientVaccine(updatedPatientVaccineData) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = 'UPDATE PatientVaccines SET ? WHERE patient_id = ? AND vaccine_id = ?';
        connection.query(sql, [updatedPatientVaccineData, updatedPatientVaccineData.patient_id,updatedPatientVaccineData.vaccine_id], (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error updating row:' + err));
            } else {
                resolve();
            }
        });
    });
}

async function getAllPatientVaccines() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = 'SELECT * FROM PatientVaccines';
        connection.query(sql, (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function getPatientVaccineByPatientId(patient_id, vaccine_id) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = `SELECT * FROM PatientVaccines WHERE patient_id = ${patient_id} AND vaccine_id=${vaccine_id}`;
        connection.query(sql, (err, result) => {
            connection.end();
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
}

module.exports = {
    createPatientVaccines,
    deletePatientVaccine,
    updatePatientVaccine,
    getAllPatientVaccines,
    getPatientVaccineByPatientId
};
