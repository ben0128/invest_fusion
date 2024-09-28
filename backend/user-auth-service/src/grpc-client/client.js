import { loadPackageDefinition } from "@grpc/grpc-js";
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('example.proto', {});
const exampleProto = loadPackageDefinition(packageDefinition).example;

function main() {
  const client = new exampleProto.ExampleService('localhost:50051', grpc.credentials.createInsecure());

  client.SayHello({ name: 'World' }, (error, response) => {
    if (!error) {
      console.log('Greeting:', response.message);
    } else {
      console.error(error);
    }
  });
}

main();
