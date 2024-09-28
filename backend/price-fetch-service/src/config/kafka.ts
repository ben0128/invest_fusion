import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'price-fetch-service',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'price-fetch-group' });

export { kafka, producer, consumer };