const {HelloResponse} = require('./netifi/service_pb');
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
}

//DefaultHelloService.constructor = DefaultHelloService;

module.exports = {DefaultHelloService};
