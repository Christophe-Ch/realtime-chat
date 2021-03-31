const messageHandler = require("./messageHandler");
const disconnectionHandler = require("./onDisconnectionHandler");

module.exports = [messageHandler, disconnectionHandler];
