import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'price-distribution-service',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'price-distribution-group' });

export { kafka, consumer };
