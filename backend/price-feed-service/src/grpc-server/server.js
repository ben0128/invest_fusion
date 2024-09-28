import * as grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
const packageDefinition = protoLoader.loadSync('../../../protos/example.proto', {});
import { loadPackageDefinition } from '@grpc/grpc-js';
const exampleProto = loadPackageDefinition(packageDefinition).example;

function sayHello(call, callback) {
  callback(null, { message: 'Hello ' + call.request.name });
}

function main() {
  const server = new grpc.Server();
  console.log('exampleProto', exampleProto.BenService);
  server.addService(exampleProto.ExampleService.service, { SayHello: sayHello });
  server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error(`Server failed to bind: ${error.message}`);
      return;
    }
  })
  // 目前BUN 還不支援TRPC
  // server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
  //   if (error) {
  //     console.error(`Server failed to bind: ${error.message}`);
  //     return;
  //   }
  //   server.start();
  //   console.log(`Server running at 127.0.0.1:${port}`);
  // });
}

main();
