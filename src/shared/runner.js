const {DefaultHelloService} = require("./DefaultHelloService");

const {HelloRequest} = require('./netifi/service_pb');
const {HelloServiceClient, HelloServiceServer} = require('./netifi/service_rsocket_pb');
const {Netifi} = require('netifi-js-client');
const generateName = require('./nameGenerator');
const QUICKSTART_SERVICE_NAME = "com.netifi.quickstart.service.HelloService";

function runHello(isServer, logFunction){

    const groupName = isServer ? "quickstart.servers" : "quickstart.clients";
    const destinationName = isServer ? generateName() : "client1";

    logFunction('Connecting gateway with group ' + groupName + ' and destination ' + destinationName);

    const netifiGateway = Netifi.create({
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
        netifiGateway.addService(QUICKSTART_SERVICE_NAME, new HelloServiceServer(new DefaultHelloService(serviceName, logFunction)));
        netifiGateway._connect();
    } else {
        // Connect to Netifi Netifi Platform
        const conn = netifiGateway.group("quickstart.servers");

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
