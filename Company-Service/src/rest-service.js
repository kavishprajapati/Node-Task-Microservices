const express = require('express')
const router = express.Router()
const Controller = require('./controllers')


router
    .get('/company', Controller.getAllCompanyAction)
    .get('/company/:id', Controller.getCompanyAction)
    .get('/company/:name', Controller.getCompanyByNameAction)
    .post('/company', Controller.createCompanyAction)
    .delete('/company/:id', Controller.deleteCompanyAction)
    .patch('/company/:id', Controller.updateCompanyAction)
    
module.exports = router





















// only with node.js

// const http = require('http');
// const url = require('url');
// const { getAllCompanyAction } = require('./controllers');

// // Create an HTTP server
// const server = http.createServer((req, res) => {
//     // Parse the URL
//     const parsedUrl = url.parse(req.url, true);
//     // console.log(parsedUrl);

//     // Retrieve the path from the parsed URL
//     const path = parsedUrl.pathname;
//     // console.log(path);

//     // Route the request based on the path
//     if (path === '/company' && req.method === 'GET') {
//         getAllCompanyAction(req, res);
//     } else {
//         res.statusCode = 404; // Handle unknown routes
//         res.end('Not Found');
//     }
// });

// const PORT = 9090;
// server.listen(PORT, () => {
//     console.log("Company service is listening on port", PORT);
// });
