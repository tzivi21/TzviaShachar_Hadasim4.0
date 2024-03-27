const mysql = require('mysql');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: 't0527607564',
    database: 'HMO'
};

async function createVaccine(vaccineData) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = 'INSERT INTO Vaccines SET ?';
        connection.query(sql, vaccineData, (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error inserting new vaccine:' + err));
            } else {
                resolve(result.insertId);
            }
        });
    });
}

async function deleteVaccine(id) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = `DELETE FROM Vaccines WHERE id = ${id}`;
        connection.query(sql, (err, result) => {
            connection.end();
            if (err) {
                reject(new Error(`Error deleting vaccine with id:${id}` + err));
            } else {
                resolve();
            }
        });
    });
}

async function updateVaccine(updatedVaccineData) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = 'UPDATE Vaccines SET ? WHERE id = ?';
        connection.query(sql, [updatedVaccineData, updatedVaccineData.id], (err, result) => {
            connection.end();
            if (err) {
                reject(new Error('Error updating row:' + err));
            } else {
                resolve();
            }
        });
    });
}

async function getAllVaccines() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = 'SELECT * FROM Vaccines';
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

async function getVaccineById(id) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        const sql = `SELECT * FROM Vaccines WHERE id = ${id}`;
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
    createVaccine,
    deleteVaccine,
    updateVaccine,
    getAllVaccines,
    getVaccineById
};
