const { Module } = require("vm");

function validatePatientInput(patient) {
    if (!patient || typeof patient !== 'object') {
        return false;
    }
    // Check for required fields
    const requiredFields = ['id', 'first_name', 'last_name', 'city', 'street', 'house_number', 'birth_date', 'phone', 'mobile_phone', 'positive_test_date', 'recovery_date'];
    for (const field of requiredFields) {
        if (!(field in patient)) {
            return false;
        }
    }
    // ID number should be exactly 9 digits
    if (!/^\d{9}$/.test(patient.id)) {
        return false;
    }
    // Check if house_number is a positive integer
    if (!Number.isInteger(patient.house_number) || patient.house_number <= 0) {
        return false;
    }
    // Check if birth_date, positive_test_date, and recovery_date are valid dates
    if (!isValidDate(patient.birth_date) || !isValidDate(patient.positive_test_date) || !isValidDate(patient.recovery_date)) {
        return false;
    }
    // Check if phone and mobile_phone are valid phone numbers (optional)
    
    return true;
}

function validateVaccineData(vaccineData) {
    // Check if vaccineData is an object
    if (typeof vaccineData !== 'object' || vaccineData === null) {
        return false;
    }

    // Check if vaccineData has the required properties
    if (!('id' in vaccineData) || !('manufacturer_name' in vaccineData)) {
        return false;
    }

    // Check if id is a non-negative integer
    if (typeof vaccineData.id !== 'number' || !Number.isInteger(vaccineData.id) || vaccineData.id < 0) {
        return false;
    }

    // Check if manufacturer_name is a non-empty string
    if (typeof vaccineData.manufacturer_name !== 'string' || vaccineData.manufacturer_name.trim() === '') {
        return false;
    }

    // Validation passed
    return true;
}

function validatePatientVaccineData(patientVaccineData) {
    // Check if patientVaccineData is an object
    if (typeof patientVaccineData !== 'object' || patientVaccineData === null) {
        return false;
    }

    // Check if patientVaccineData has the required properties
    if (!('patient_id' in patientVaccineData) || !('vaccine_id' in patientVaccineData) || !('vaccination_date' in patientVaccineData)) {
        return false;
    }

    // Check if patient_id and vaccine_id are non-negative integers
    if (typeof patientVaccineData.patient_id !== 'number' || !Number.isInteger(patientVaccineData.patient_id) || patientVaccineData.patient_id < 0 ||
        typeof patientVaccineData.vaccine_id !== 'number' || !Number.isInteger(patientVaccineData.vaccine_id) || patientVaccineData.vaccine_id < 0) {
            return false;
        }

    // Check if vaccination_date is a valid date string
    if (typeof patientVaccineData.vaccination_date !== 'string' || isNaN(Date.parse(patientVaccineData.vaccination_date))) {
        return false;
    }

    // Validation passed
    return true;
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

module.exports = {
    validatePatientInput,
    validateVaccineData,
    validatePatientVaccineData
};