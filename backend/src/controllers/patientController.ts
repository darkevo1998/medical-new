import { Request, Response } from 'express';
import Patient from '../models/patientModel';
import User from '../models/userModel'; // Import the User (doctor) model

const createPatient = async (req: Request, res: Response): Promise<void> => {
  const { name, dob, contact, doctors } = req.body;

  // Find doctor(s) by name
  const doctor = await User.findOne({
    where: { name: doctors, role: 'Doctor' },
  });

  if (!doctor) {
    res.status(400).json({ error: 'Doctor not found' });
    return; // Ensure the function returns after sending a response
  }

  // Create the patient with the associated doctor
  const patient = await Patient.create({
    name,
    dob,
    contact,
    doctorId: doctor.id, // Link the patient with the doctor's id
  });

  res.status(201).json(patient); // Send the newly created patient as the response
};

const getPatients = async (req: Request, res: Response): Promise<void> => {
  try {
    const patients = await Patient.findAll({
      include: [
        {
          model: User, // Include the doctor information in the patient record
          attributes: ['name', 'email'], // Include doctor name and email in response
        },
      ],
    });

    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(400).json({ error: 'Error fetching patients' });
  }
};

export { createPatient, getPatients };
