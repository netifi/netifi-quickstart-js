const {HelloResponse, PongResponse} = require('./netifi/service_pb');
const {
    Single
} = require('rsocket-flowable');

function DefaultHelloService(serviceName, logFunction) {
    this.serviceName = serviceName;

    this.sayHello = function(message){
        logFunction("Received Hello from " + message.getName());
        logFunction("Responding...");
        const resp = new HelloResponse();
        resp.setMessage("Hello, " + message.getName() + "! from " + this.serviceName);
        return Single.of(resp);
    };

    this.ping = function(pingRequest){
        logFunction("Received Ping message:" + pingRequest.getMessage());
        logFunction("Responding...");
        const resp = new PongResponse();
        resp.setMessage("Pong from " + this.serviceName);
        return Single.of(resp);
    }
}

//DefaultHelloService.constructor = DefaultHelloService;

module.exports = {DefaultHelloService};
