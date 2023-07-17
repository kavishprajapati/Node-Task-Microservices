const express = require('express')
const app = express();

//middleware
app.use(express.json()) //this middleware is for json-data

//Routes
const restservice = require('./rest-service');
app.use('/', restservice );


PORT = 9090
app.listen(PORT, ()=>{
    console.log("company service is listening on port", PORT);
})
    