
const express = require('express');
const routerPatient = require("./routes/patient")
const routerEmail = require("./routes/email")

const app = express()
const port = 3000


app.use(routerPatient);
app.use(routerEmail);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})