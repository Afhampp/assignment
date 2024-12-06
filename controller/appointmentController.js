const fs = require('fs');
const APPOINTMENT_FILE = './appointments.txt';

// Save appointments to appointments.txt
const saveAppointmentsToFile = (appointments) => {
    if (!fs.existsSync(APPOINTMENT_FILE)) {
        fs.writeFileSync(APPOINTMENT_FILE, '[]', 'utf-8');
    }
    
    
    const existingAppointments = JSON.parse(fs.readFileSync(APPOINTMENT_FILE, 'utf-8'));

    const updatedAppointments = [...existingAppointments, ...appointments];

    fs.writeFileSync(APPOINTMENT_FILE, JSON.stringify(updatedAppointments, null, 2), 'utf-8');
};

const loadAppointmentsFromFile = () => {
    if (fs.existsSync(APPOINTMENT_FILE)) {
        const data = fs.readFileSync(APPOINTMENT_FILE, 'utf-8');
        return JSON.parse(data);
    }
    return [];
};

module.exports = {
    saveAppointmentsToFile,
    loadAppointmentsFromFile,
};
