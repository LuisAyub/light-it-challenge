const routerEmail = require('express').Router()
const setupEmail = require("../services/emailHandler")
const {getPatient} = require("../services/databaseHandler")

routerEmail.post("/send-email/:id", async (req, res) => {
    const patient = await getPatient(req.params.id);
    if (!patient){
        res.send("Patient not found").status(500);
    }
    const result = await setupEmail(patient)
    if (!Object.hasOwn(result, "error")) {
        res.send(`Post patient ${patient.name} Email Sent: ${result.info.messageId}`).status(200);
    } else {
        res.send("Error sending email: ", result.error).status(500);
    }
  }) 

  module.exports = routerEmail