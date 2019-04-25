# Netifi Quickstart - JavaScript

A tutorial on how to use this quickstart can be found on [netifi.com](https://www.netifi.com/getstarted-js).

## Regenerating the protocol buffers

If you make any edits to [service.proto](./proto/service.proto), you'll need to regenerate the generated protocol buffer JS files in order to use the changed protocol. First, install [protoc](https://github.com/protocolbuffers/protobuf/blob/master/src/README.md) to your system and make sure that it is in your $PATH. Then, you should be able to run `yarn protoc` to generate protocol buffer files for the messages and services.