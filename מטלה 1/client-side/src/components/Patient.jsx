import React, { useState } from 'react';
import styles from '../styles/Patient.module.css';

function Patient({ currentPatient, patients, setPatients, setActivePatient }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPatient, setEditedPatient] = useState({ ...currentPatient });

    async function handleDelete() {
        try {
            const response = await fetch(`http://localhost:3000/Patients/${currentPatient.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete patient');
            }
            const updatedPatients = patients.filter(p => p.id != currentPatient.id);
            setPatients(updatedPatients);
            setActivePatient(null);

            console.log('Patient deleted successfully');
            // Optionally, handle any further logic here after successful deletion
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditVaccine = (index, field, value) => {
        const updatedVaccines = [...editedPatient.vaccines];
        updatedVaccines[index][field] = value;
        setEditedPatient(prevState => ({
            ...prevState,
            vaccines: updatedVaccines
        }));
    };

    const handleAddVaccine = () => {
        setEditedPatient(prevState => ({
            ...prevState,
            vaccines: [...prevState.vaccines, { vaccine_id: '', vaccination_date: '' }]
        }));
    };

    const handleSave = async () => {
        try {
            handleSaveVaccines();
            const { vaccines, ...patientWithoutVaccines } = editedPatient;
            const response = await fetch(`http://localhost:3000/Patients/${currentPatient.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(patientWithoutVaccines)
            });
            if (!response.ok) {
                throw new Error('Failed to update patient');
            }
            const updatedPatients = patients.map(patient =>
                patient.id === currentPatient.id ? editedPatient : patient
            );
            setPatients(updatedPatients);
            setActivePatient(editedPatient);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    };
    
    const handleSaveVaccines = async () => {
        if (currentPatient.vaccines.length < editedPatient.vaccines.length) {
            for (let index = currentPatient.vaccines.length; index < editedPatient.vaccines.length; index++) {
                try {
                    const response = await fetch(`http://localhost:3000/PatientVaccines/${currentPatient.id}/${editedPatient.vaccines[index].vaccine_id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ...editedPatient.vaccines[index],
                            vaccine_id: parseInt(editedPatient.vaccines[index].vaccine_id),
                            patient_id: currentPatient.id
                        })
                    });
                    if (!response.ok) {
                        throw new Error('Failed to create the vaccine');
                    }
                }
                catch (error) {
                    console.error('Error updating patient:', error);
                }

            }
        }
    }

    const handleCancel = () => {
        setIsEditing(false);
        setEditedPatient({ ...currentPatient });
    };

    const handleExit = () => {
        setActivePatient(null);
    }

    return (
        <div className={styles.patientContainer}>
            <button onClick={handleExit}>✖️</button>
            <h3>Patient Details</h3>
            {!isEditing ? (
                <div>
                    <p><strong>ID:</strong> {currentPatient.id}</p>
                    <p><strong>First Name:</strong> {currentPatient.first_name}</p>
                    <p><strong>Last Name:</strong> {currentPatient.last_name}</p>
                    <p><strong>City:</strong> {currentPatient.city}</p>
                    <p><strong>Street:</strong> {currentPatient.street}</p>
                    <p><strong>House Number:</strong> {currentPatient.house_number}</p>
                    <p><strong>Birth Date:</strong> {currentPatient.birth_date}</p>
                    <p><strong>Phone:</strong> {currentPatient.phone}</p>
                    <p><strong>Mobile Phone:</strong> {currentPatient.mobile_phone}</p>
                    <p><strong>Positive Test Date:</strong> {currentPatient.positive_test_date}</p>
                    <p><strong>Recovery Date:</strong> {currentPatient.recovery_date}</p>
                    {currentPatient.vaccines != null && currentPatient.vaccines.length !== 0 &&
                        <div>
                            <h3>Corona Vaccines</h3>
                            {currentPatient.vaccines.map((vaccine, index) => (
                                <div key={vaccine.id}>
                                    <p>Vaccine ID: {vaccine.vaccine_id}</p>
                                    <p>Vaccination Date: {vaccine.vaccination_date}</p>
                                </div>
                            ))}
                        </div>
                    }
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ) : (
                <div>
                    {/* Editable fields */}
                    <input type="text" name="first_name" maxLength="50" value={editedPatient.first_name} onChange={handleChange} />
                    <input type="text" name="last_name" maxLength="50" value={editedPatient.last_name} onChange={handleChange} />
                    <input type="text" name="city" maxLength="50" value={editedPatient.city} onChange={handleChange} />
                    <input type="text" name="street" maxLength="50" value={editedPatient.street} onChange={handleChange} />
                    <input type="text" name="house_number" min="1" max="9999" value={editedPatient.house_number} onChange={handleChange} />
                    <input type="date" name="birth_date" value={editedPatient.birth_date} onChange={handleChange} />
                    <input type="text" name="phone" maxLength="9" value={editedPatient.phone} onChange={handleChange} />
                    <input type="text" name="mobile_phone" maxLength="10" value={editedPatient.mobile_phone} onChange={handleChange} />
                    <input type="date" name="positive_test_date" value={editedPatient.positive_test_date} onChange={handleChange} />
                    <input type="date" name="recovery_date" value={editedPatient.recovery_date} onChange={handleChange} />


                    {/* Edit Vaccines */}
                    <h2>Edit Vaccines</h2>
                    {editedPatient.vaccines.map((vaccine, index) => (
                        <div key={index}>
                            <input type="text" value={vaccine.vaccine_id} onChange={(e) => handleEditVaccine(index, 'vaccine_id', e.target.value)} />
                            <input type="date" value={vaccine.vaccination_date} onChange={(e) => handleEditVaccine(index, 'vaccination_date', e.target.value)} />
                        </div>
                    ))}
                    <button onClick={handleAddVaccine}>Add Vaccine</button>

                    {/* Buttons */}
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Patient;
