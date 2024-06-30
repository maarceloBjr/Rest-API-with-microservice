import amqp from 'amqplib'
export const queue = 'update_cache'
console.log('Connecting to RabbitMQ')
const connection = await amqp.connect('amqp://rabbitmq:5672')
console.log('Connected to RabbitMQ')
export const channel = await connection.createChannel()
