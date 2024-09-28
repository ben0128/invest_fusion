import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'user-auth-service',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'user-auth-group' });

export { kafka, producer, consumer };