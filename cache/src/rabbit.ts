import amqp from 'amqplib'
export const queue = 'cache_update'
const connection = await amqp.connect('amqp://rabbitmq:5672')
export const channel = await connection.createChannel()
