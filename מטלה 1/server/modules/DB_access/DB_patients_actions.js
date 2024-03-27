const mysql = require('mysql');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: 't0527607564',
    database: 'HMO'
};

async function createPatient(patientData) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = 'INSERT INTO Patients SET ?';
        connection.query(sql, patientData, (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error inserting new patient:' + err));
            } else {
                resolve(result.insertId);
            }
        });
    });
}

async function deletePatient(id) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = `DELETE FROM Patients WHERE id = ${id}`;
        connection.query(sql, (err, result) => {
            connection.end();
            if (err) {
                reject(new Error(`Error deleting patient with id:${id}` + err));
            } else {
                resolve();
            }
        });
    });
}

async function updatePatient(updatedPatientData) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = 'UPDATE Patients SET ? WHERE id = ?';
        connection.query(sql, [updatedPatientData, updatedPatientData.id], (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error updating row:' + err));
            } else {
                resolve();
            }
        });
    });
}

async function getAllPatients() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = 'SELECT * FROM Patients';
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

async function getPatientById(id) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = `SELECT * FROM Patients WHERE id = ${id}`;
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

async function getPatientVaccinesById(id) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = `SELECT * FROM PatientVaccines WHERE patient_id = ${id}`;
        connection.query(sql, (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error getting specific row:' + err));
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    createPatient,
    deletePatient,
    updatePatient,
    getAllPatients,
    getPatientById,
    getPatientVaccinesById
};
