const express = require('express');
const { notFoundError, handleError } = require('./etc/error-handler');
const { customLog, registerAvailablePath } = require('./etc/middleware');
const gql = require('./graphql/sample-1');
const gql2 = require('./graphql/sample-2');
const router = require('./routes');

const server = express();

// accept body with content-type application/json
server.use(express.json());
server.use(customLog);

// register routes with this prefix
server.use('/api', router);

// register graphQL
server.use('/graphql', gql);
server.use('/graphql-2', gql2);

// excluding graphQL path, because don't know how
registerAvailablePath(server);

/** make sure to put code below after all available routes **/

// handle 404. 
server.use(notFoundError);

// handle uncaught error
server.use(handleError);

module.exports = server;
