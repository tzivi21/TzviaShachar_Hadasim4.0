import React, { useState } from 'react';
import styles from '../styles/AddPatient.module.css';

function AddPatient({ patients, setPatients, setaddPatientStatus,setNotVaccinated }) {
    const [newPatient, setNewPatient] = useState({
        id: '',
        first_name: '',
        last_name: '',
        city: '',
        street: '',
        house_number: '',
        birth_date: '',
        phone: '',
        mobile_phone: '',
        positive_test_date: '',
        recovery_date: '',
        vaccines: []
    });

    const handleExit = () => {
        setaddPatientStatus(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPatient((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddVaccine = () => {
        setNewPatient((prevState) => ({
            ...prevState,
            vaccines: [...prevState.vaccines, { vaccine_id: '', vaccination_date: '' }]
        }));
    };

    const handleRemoveVaccine = (index) => {
        const updatedVaccines = newPatient.vaccines.filter((_, i) => i !== index);
        setNewPatient((prevState) => ({
            ...prevState,
            vaccines: updatedVaccines
        }));
    };

    const handleEditVaccine = (index, field, value) => {
        const updatedVaccines = [...newPatient.vaccines];
        updatedVaccines[index][field] = value;
        setNewPatient((prevState) => ({
            ...prevState,
            vaccines: updatedVaccines
        }));
    };

    const handleSave = async () => {
        try {
            const { vaccines, ...patientWithoutVaccines } = newPatient;
            const responsePatient = await fetch(`http://localhost:3000/Patients/${Number(patientWithoutVaccines.id)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...patientWithoutVaccines,
                    id: Number(newPatient.id),
                    house_number: Number(newPatient.house_number),
                    phone: Number(newPatient.phone),
                    mobile_phone: Number(newPatient.mobile_phone)
                })
            });

            if (!responsePatient.ok) {
                throw new Error('Failed to add new patient');
            }

            const addedPatient = await responsePatient.json();
            if(newPatient.vaccines.length==0){
                setNotVaccinated((prev)=>prev+1);
            }
            // If vaccines are added, iterate over each vaccine and add it for the new patient
            if (newPatient.vaccines.length > 0) {
                for (let index = 0; index < newPatient.vaccines.length; index++) {
                    try {
                        const responseVaccine = await fetch(`http://localhost:3000/PatientVaccines/${addedPatient.id}/${newPatient.vaccines[index].vaccine_id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                ...newPatient.vaccines[index],
                                vaccine_id:Number(newPatient.vaccines[index].vaccine_id),
                                patient_id: addedPatient.id
                            })
                        });

                        if (!responseVaccine.ok) {
                            throw new Error('Failed to add the vaccine');
                        }
                    } catch (error) {
                        console.error('Error adding vaccine:', error);
                    }
                }
            }

            setPatients([...patients, newPatient]);
            setaddPatientStatus(false);

            console.log('New patient and vaccines added successfully');
        } catch (error) {
            console.error('Error adding new patient:', error);
        }
    };

    return (
        <div className={styles.AddPatientContainer}>
            <button onClick={handleExit} className={styles.exit}>✖️</button>
            <h3>Add New Patient</h3>
            <input type="text" name="id" maxLength="9" placeholder="id" value={newPatient.id} onChange={handleChange} />
            <input type="text" name="first_name" maxLength="50" placeholder="First Name" value={newPatient.first_name} onChange={handleChange} />
            <input type="text" name="last_name" maxLength="50" placeholder="Last Name" value={newPatient.last_name} onChange={handleChange} />
            <input type="text" name="city" maxLength="30" placeholder="City" value={newPatient.city} onChange={handleChange} />
            <input type="text" name="street" maxLength="30" placeholder="Street" value={newPatient.street} onChange={handleChange} />
            <input type="text" name="house_number" minLength={1} placeholder="House Number" value={newPatient.house_number} onChange={handleChange} />
            <input type="date" name="birth_date" placeholder="Birth Date" value={newPatient.birth_date} onChange={handleChange} />
            <input type="text" name="phone" maxLength="9" placeholder="Phone" value={newPatient.phone} onChange={handleChange} />
            <input type="text" name="mobile_phone" maxLength="10" placeholder="Mobile Phone" value={newPatient.mobile_phone} onChange={handleChange} />
            <input type="date" name="positive_test_date" placeholder="Positive Test Date" value={newPatient.positive_test_date} onChange={handleChange} />
            <input type="date" name="recovery_date" placeholder="Recovery Date" value={newPatient.recovery_date} onChange={handleChange} />
            <h3>Add Vaccines</h3>
            {newPatient.vaccines.map((vaccine, index) => (
                <div key={index}>
                    <input type="text" placeholder="Vaccine ID" value={vaccine.vaccine_id} onChange={(e) => handleEditVaccine(index, 'vaccine_id', e.target.value)} />
                    <input type="date" placeholder="Vaccination Date" value={vaccine.vaccination_date} onChange={(e) => handleEditVaccine(index, 'vaccination_date', e.target.value)} />
                    <button onClick={() => handleRemoveVaccine(index)}>Remove</button>
                </div>
            ))}
            <button onClick={handleAddVaccine}>Add Vaccine</button>

            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default AddPatient;
