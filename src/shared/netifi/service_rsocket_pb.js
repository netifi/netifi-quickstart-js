// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var service_pb = require('./service_pb.js');

var HelloServiceClient = function () {
  function HelloServiceClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.sayHelloTrace = rsocket_rpc_tracing.traceSingle(tracer, "HelloService", {"rsocket.rpc.service": "com.netifi.quickstart.service.HelloService"}, {"method": "sayHello"}, {"rsocket.rpc.role": "client"});
    this.sayHelloMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "HelloService", {"service": "com.netifi.quickstart.service.HelloService"}, {"method": "sayHello"}, {"role": "client"});
  }
  // Returns a Hello World Message
  HelloServiceClient.prototype.sayHello = function sayHello(message, metadata) {
    const map = {};
    return this.sayHelloMetrics(
      this.sayHelloTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('com.netifi.quickstart.service.HelloService', 'SayHello', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return service_pb.HelloResponse.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  return HelloServiceClient;
}();

exports.HelloServiceClient = HelloServiceClient;

var HelloServiceServer = function () {
  function HelloServiceServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.sayHelloTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "HelloService", {"rsocket.rpc.service": "com.netifi.quickstart.service.HelloService"}, {"method": "sayHello"}, {"rsocket.rpc.role": "server"});
    this.sayHelloMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "HelloService", {"service": "com.netifi.quickstart.service.HelloService"}, {"method": "sayHello"}, {"role": "server"});
    this._channelSwitch = (payload, restOfMessages) => {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      let deserializedMessages;
      switch(method){
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    };
  }
  HelloServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  HelloServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'SayHello':
          return this.sayHelloMetrics(
            this.sayHelloTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .sayHello(service_pb.HelloRequest.deserializeBinary(binary), payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                }).subscribe(subscriber);
              }
            )
          )
        );
        default:
          return rsocket_flowable.Single.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Single.error(error);
    }
  };
  HelloServiceServer.prototype.requestStream = function requestStream(payload) {
    return rsocket_flowable.Flowable.error(new Error('requestStream() is not implemented'));
  };
  HelloServiceServer.prototype.requestChannel = function requestChannel(payloads) {
    return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
      new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
    );
  };
  HelloServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return HelloServiceServer;
}();

exports.HelloServiceServer = HelloServiceServer;

