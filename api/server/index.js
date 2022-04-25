const express = require('express');
const { notFoundError, internalServerError } = require('../etc/error-handler');
const router = require('../routes');

const server = express();

// accept body with content-type application/json
server.use(express.json());

// logging on each API hit
server.use((req, _res, next) => {
    console.log('accessing', req.method, req.originalUrl);
    next();
});

// register routes in this prefix
server.use('/api', router);

// get avaliable paths
const registeredPath = [];
server._router.stack.forEach(middleware => {
    if (middleware.route) {
        // paths registered directly on the server
        const route = middleware.route;
        !registeredPath.includes(route.path) && registeredPath.push(route.path);
    } else if (middleware.name === 'router') {
        // paths registered on router 
        middleware.handle.stack.forEach(handler => {
            const route = handler.route;
            route && !registeredPath.includes(route.path) && registeredPath.push(route.path);
        });
    }
});

// save this in express app to use in middleware
server.set('registeredPath', registeredPath);


/** make sure to put code below after all available routes **/

// handle 404. 
server.use(notFoundError);

/**
 * handle uncaught error, except promise rejection.
 * You must cath promise rejection by yourself
 */
server.use((err, req, res, next) => {
    internalServerError(err, res);
})

module.exports = server;
