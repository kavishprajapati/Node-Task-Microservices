module.exports = function makeDeleteAllEmployeeByCompanyId({ deleteEmployeesByCompanyId, Kafka }) {
  return async function deleteAllEmployeesByCompanyId() {
    const kafka = new Kafka({
      clientId: 'employee-service',
      brokers: ['localhost:9093'],
    });

    const consumer = kafka.consumer({ groupId: 'employee-group' });

    const run = async () => {
      await consumer.connect();
      await consumer.subscribe({ topic: 'company-events' });

      await consumer.run({
        eachMessage: async ({ topic, message }) => {
          if (topic === 'company-events' && message.value) {
            const eventData = JSON.parse(message.value);

            if (eventData.eventType === 'CompanyDeleted' && eventData.companyId) {
              // Pass the company ID to the deleteEmployeesByCompanyId use-case
              await deleteEmployeesByCompanyId({ companyId: eventData.companyId });
            }
          }
        },
      });
    };

    run().catch((error) => {
      console.error('Error occurred while running the consumer:', error);
    });
  };
};
