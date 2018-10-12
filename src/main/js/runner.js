const {DefaultHelloService} = require("./DefaultHelloService");

const {HelloRequest} = require('./proteus/service_pb');
const {HelloServiceClient, HelloServiceServer} = require('./proteus/service_rsocket_pb');
const {Proteus} = require('proteus-js-client');
const generateName = require('./nameGenerator');
const QUICKSTART_SERVICE_NAME = "io.netifi.proteus.quickstart.service.HelloService";

function runHello(isServer, logFunction){

    const groupName = isServer ? "quickstart.servers" : "quickstart.clients";
    const destinationName = isServer ? generateName() : "client1";

    logFunction('Connecting gateway with group ' + groupName + ' and destination ' + destinationName);

    const proteusGateway = Proteus.create({
        setup: {
            group: groupName,
            destination: destinationName,
            accessKey: 9007199254740991,
            accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
        },
        transport: {
            url: "ws://localhost:8101/",
        },
    });

    if(isServer){
        const serviceName = "helloservice-" + destinationName;
        proteusGateway.addService(QUICKSTART_SERVICE_NAME, new HelloServiceServer(new DefaultHelloService(serviceName, logFunction)));
        proteusGateway._connect();
    } else {
        // Connect to Netifi Proteus Platform
        const conn = proteusGateway.group("quickstart.servers");

        // Create Client to Communicate with the HelloService (included example service)
        const client = new HelloServiceClient(conn);

        // Create Request to HelloService
        const request = new HelloRequest();
        request.setName("World");

        console.log("Sending 'World' to HelloService...");

        // Call the HelloService
        client.sayHello(request).subscribe({
            onComplete: response => {
                logFunction("Hello Service responded with: " + response.getMessage());
            },
            onError: error => {
                logFunction("Hello Service responded with error: " + error);
            }
        });
    }

}

module.exports = {runHello};
