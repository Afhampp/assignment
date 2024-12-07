const express = require('express');
const router = express.Router();
const path = require('path');
const { saveAppointmentsToFile, loadAppointmentsFromFile } = require('../controller/appointmentController');

let appointments = loadAppointmentsFromFile();

// Serving static HTML page
router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../view', 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving file:', err);
            res.status(500).send('Error serving file.');
        }
    });
});

router.post('/submit-booking', (req, res) => {
    const { name, phone, service, time, date, notes } = req.body;
    const newAppointment = { name, phone, service, time, date, notes };

    appointments.push(newAppointment);

    saveAppointmentsToFile(appointments);


    res.json({ message: 'Appointment successfully created/modified.' });
});



// Route to handle canceling an appointment
router.post('/cancel-appointment', (req, res) => {
    const { phone } = req.body;
    const index = appointments.findIndex((appt) => appt.phone === phone);

    if (index >= 0) {
        appointments.splice(index, 1);
        saveAppointmentsToFile(appointments);
        res.send('Appointment successfully canceled.');
    } else {
        res.status(404).send('Appointment not found.');
    }
});

module.exports = router;
