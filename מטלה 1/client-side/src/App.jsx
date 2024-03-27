import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from 'react'
import Patient from './components/Patient'
import AddPatient from './components/AddPatient'
import styles from './styles/Patient.module.css'

function App() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addPatientStatus, setaddPatientStatus] = useState(false);
  const [activePatient, setActivePatient] = useState(null);
  const [notVaccinated, setNotVaccinated] = useState(0);



  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3000/Patients');
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const data = await response.json();

        // Loop through the patients and fetch vaccines for each patient
        const patientsWithVaccines = await Promise.all(data.map(async (patient) => {
          const vaccinesResponse = await fetch(`http://localhost:3000/Patients/${patient.id}/vaccines`);
          if (!vaccinesResponse.ok) {
            throw new Error(`Failed to fetch vaccines for patient ${patient.id}`);
          }
          const vaccinesData = await vaccinesResponse.json();
          return { ...patient, vaccines: vaccinesData }; // Add vaccines to patient object
        }));
        let count=0;
        patientsWithVaccines.forEach(p => {
          if(p.vaccines.length==0||p.vaccines==null){
            count++;
          }
        });
        setNotVaccinated(count);
        setPatients(patientsWithVaccines);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
      finally{
        
      }
    };

    fetchPatients();
  }, []);

  const handleAdd = () => {
    setaddPatientStatus(true);
  };

  const handleOpenPatienrWindow = (p_id) => {
    const currentPatient = patients.find((p) => p.id == p_id);
    setActivePatient(currentPatient);
  }

  return (
    <>
      <h1>Welcome To The HMO</h1>
      <button onClick={handleAdd}>Add Patient</button>
      <div className={styles.patientsContainer}>
        {patients.map((p) => {
          return <div className={styles.patient} key={p.id} onClick={() => { handleOpenPatienrWindow(p.id); }}>
            <h2>Id: {p.id}</h2>
            <h2>FirstName: {p.first_name}</h2>
            <h2>LastName: {p.last_name}</h2>
          </div>
        })}
      </div>
      {addPatientStatus && <AddPatient setNotVaccinated={setNotVaccinated} patients={patients} setPatients={setPatients} setaddPatientStatus={setaddPatientStatus} />}
      {loading && <h2>Loading Patients</h2>}
      {activePatient != null &&
        <Patient currentPatient={activePatient} patients={patients} setPatients={setPatients} setActivePatient={setActivePatient} />
      }
      <h1>HMO members who are not vaccinated at all: {notVaccinated}</h1>
    </>
  )
}

export default App
