const mysql = require('mysql');

function createDB(){
    const config = {
        host: '127.0.0.1',
        user: 'root',
        password: 't0527607564',
    };
    
    const connection = mysql.createConnection(config);
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL');
        connection.query("CREATE DATABASE HMO", function (err, result) {
            if (err) throw err;
            console.log("Database created");
            connection.end();
        });
    });
}


// Create the Patients table
const createPatientsTable = () => {
    const config = {
        host: '127.0.0.1',
        user: 'root',
        password: 't0527607564',
        database:'HMO'
    };
    
    const connection = mysql.createConnection(config);
    const createPatientsTable = `
        CREATE TABLE IF NOT EXISTS Patients (
            id INT  PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            street VARCHAR(255) NOT NULL,
            house_number INT NOT NULL,
            birth_date DATE NOT NULL,
            phone VARCHAR(20),
            mobile_phone VARCHAR(20),
            positive_test_date DATE,
            recovery_date DATE
        )
    `;

    connection.query(createPatientsTable, (err, result) => {
        if (err) {
            console.error('Error creating Patients table:', err);
            return;
        }
        console.log('Patients table created successfully');
        connection.end();
    });
    
};

//create the vaccines table
const createVaccinesTable = () => {
    const config = {
        host: '127.0.0.1',
        user: 'root',
        password: 't0527607564',
        database:'HMO'
    };
    
    const connection = mysql.createConnection(config);

    const sql = `
        CREATE TABLE IF NOT EXISTS Vaccines (
            id INT PRIMARY KEY,
            manufacturer_name VARCHAR(255) NOT NULL
        )
    `;
    
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating Vaccines table:', err);
            return;
        }
        console.log('Vaccines table created successfully');
    });
};

//create the patientVaccines table
const createPatientVaccinesTable = () => {
    const config = {
        host: '127.0.0.1',
        user: 'root',
        password: 't0527607564',
        database:'HMO'
    };
    
    const connection = mysql.createConnection(config);

    const sql = `
        CREATE TABLE IF NOT EXISTS PatientVaccines (
            patient_id INT,
            vaccine_id INT,
            vaccination_date DATE,
            PRIMARY KEY (patient_id, vaccine_id),
            FOREIGN KEY (patient_id) REFERENCES Patients(id),
            FOREIGN KEY (vaccine_id) REFERENCES Vaccines(id)
        )
    `;
    
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating PatientVaccines table:', err);
            return;
        }
        console.log('PatientVaccines table created successfully');
    });
};
module.exports ={
    createPatientsTable,
    createVaccinesTable,
    createPatientVaccinesTable,
    createDB
} ;

