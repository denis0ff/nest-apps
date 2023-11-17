import { RmqOptions, Transport } from '@nestjs/microservices';

export const RMQ_CONFIG = {
  SERVER_URL: process.env.RMQ_MEETUP_URL || 'amqp://localhost:5672',
  MEETUP_QUEUE: process.env.RMQ_MEETUP_QUEUE || 'MEETUP_QUEUE',
  SERVICE_NAME: 'GATEWAY',
};

export enum RmqMessages {
  // MEETUPS MESSAGES
  GET_ALL_MEETUPS = 'GET_ALL_MEETUPS',
  GET_MEETUP_BY_ID = 'GET_MEETUP_BY_ID',
  CREATE_MEETUP = 'CREATE_MEETUP',
  UPDATE_MEETUP_BY_ID = 'UPDATE_MEETUP_BY_ID',
  DELETE_MEETUP_BY_ID = 'DELETE_MEETUP_BY_ID',

  // TAGS MESSAGES
  GET_ALL_TAGS = 'GET_ALL_TAGS',
  GET_TAG_BY_ID = 'GET_TAG_BY_ID',
  CREATE_TAG = 'CREATE_TAG',
  UPDATE_TAG_BY_ID = 'UPDATE_TAG_BY_ID',
  DELETE_TAG_BY_ID = 'DELETE_TAG_BY_ID',

  // AUTH MESSAGES
  CREATE_USER = 'CREATE_USER',
  LOGIN_USER = 'LOGIN_USER',
  VALIDATE_USER = 'VALIDATE_USER',

  // USER_MESSAGES
  GET_ALL_USERS = 'GET_ALL_USERS',
  GET_USER_BY_ID = 'GET_USER_BY_ID',
  DELETE_USER_BY_ID = 'DELETE_USER_BY_ID',
}

export const rmqOptions: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [RMQ_CONFIG.SERVER_URL],
    queue: RMQ_CONFIG.MEETUP_QUEUE,
    queueOptions: { durable: false },
    noAck: true,
  },
};

export const clientRmqOptions = {
  name: RMQ_CONFIG.SERVICE_NAME,
  ...rmqOptions,
};
