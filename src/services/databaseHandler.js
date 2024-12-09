
const connection = require("../config/databaseConfig")

async function getPatients(){
    const [rows] = await connection.query("SELECT * FROM patients")
    return rows
}

async function getPatient(id) {
    const [rows] = await connection.query(`
        SELECT *
        FROM patients
        WHERE id = ?
    `, [id])
    return rows[0]
}
async function getPatientEmail(email) {
    const [rows] = await connection.query(`
        SELECT *
        FROM patients
        WHERE email = ?
    `, [email])
    return rows[0]
}

async function addPatient(name, email, phone, photoUrl){
    // Check if patient doesn't exists already
    const patient = await getPatientEmail(email);
    if (patient){
        return null
    }
    // Create new Patient
    const [rows] = await connection.query(`
        INSERT INTO patients (name, email, phone, photo_url)
        VALUES(?,?,?,?)
    `, [name, email, phone, photoUrl])
    return rows
}

module.exports = {getPatients, getPatient, getPatientEmail, addPatient}