const express = require('express')
const app = express();
const deleteAllEmployeeByCompanyId = require('./handlers/index')

deleteAllEmployeeByCompanyId()

//middleware
app.use(express.json()) //this middleware is for json-data

//Routes
const restservice = require('./rest-service');
app.use('/', restservice );



PORT = 9092
app.listen(PORT, ()=>{
    console.log("Employee service is listening on port", PORT);
})
