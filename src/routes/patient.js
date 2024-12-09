const routerPatient = require('express').Router()
const {upload, validatePatient} = require("../middlewares/validationPatient")
const {getPatient, getPatients, addPatient, getPatientEmail} = require("../services/databaseHandler")
const setupEmail = require("../services/emailHandler")

routerPatient.get("/patient/:id?", async (req, res) => {
    const id = req.params.id;
    if (!id){
      const patients = await getPatients();
      res.send(`Get patients ${JSON.stringify(patients)}`)
    } else {
      const patient = await getPatient(id);
      res.send(`Get patient ${JSON.stringify(patient)}`)
    }
  })
  
routerPatient.post("/patient/",upload.single('photoDocument'), validatePatient, async (req, res) => {
    const patient = await addPatient(req.body.name, req.body.email, req.body.phone, req.file.originalname);
    if (patient){
        console.log("patient created successfully")
        const patient = await getPatientEmail(req.body.email);
        if (!patient){
            res.send("Patient not found").status(500);
        }
        // Send welcome email
        const result = await setupEmail(patient)
        if (!Object.hasOwn(result, "error")) {
            res.send(`Post patient ${patient.name} Email Sent: ${result.info.messageId}`).status(200);
        } else {
            res.send("Error sending email: ", result.error).status(500);
        }
    } else{
        res.send("Patient already exists").status(500)
    }
  })
  
module.exports = routerPatient