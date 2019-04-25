const {runHello} = require('../shared/runner');

const runAsClient = process.argv[2] === 'true';
console.log("Args: " + JSON.stringify(process.argv));
console.log("Arg I'm looking for: " + process.argv[2]);
console.log("I'm a client: " + runAsClient);

global.WebSocket = global.WebSocket || require('ws');



//Run the Hello Service, as-server by default, client subscriber provided in case running as client
runHello(!runAsClient , console.log);

const http = require('http');
http
    .createServer(function(req, res) {
        res.write("I'm just waiting for Netifi messages!");
        res.end();
    })
    .listen(9091);
