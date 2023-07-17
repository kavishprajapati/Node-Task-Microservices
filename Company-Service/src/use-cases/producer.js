const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "company-service",
  brokers: ["localhost:9093"],
});

const producer = kafka.producer();

module.exports = producer;
