const express = require('express')
const app = express()

app.use(express.json())

const restService = require('./rest-service')
app.use('/', restService);

PORT = 3001
app.listen(PORT, ()=>{
    console.log("User Service is Listening on port", PORT);
})