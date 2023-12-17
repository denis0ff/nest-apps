import { RmqOptions, Transport } from '@nestjs/microservices';

export const RMQ_CONFIG = {
  SERVER_URL: process.env.RMQ_MEETUP_URL || 'amqp://localhost:5672',
  QUEUE_MEETUP: process.env.RMQ_MEETUP_QUEUE || 'QUEUE_MEETUP',
  QUEUE_AUTH: process.env.RMQ_MEETUP_QUEUE || 'QUEUE_AUTH',
  SERVICE_MEETUP: 'SERVICE_MEETUP',
  SERVICE_AUTH: 'SERVICE_AUTH',
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

export const rmqOptionsMeetup: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [RMQ_CONFIG.SERVER_URL],
    queue: RMQ_CONFIG.QUEUE_MEETUP,
    queueOptions: { durable: false },
    noAck: true,
  },
};

export const rmqOptionsAuth: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [RMQ_CONFIG.SERVER_URL],
    queue: RMQ_CONFIG.QUEUE_AUTH,
    queueOptions: { durable: false },
    noAck: true,
  },
};

export const clientRmqOptionsMeetup = {
  name: RMQ_CONFIG.SERVICE_MEETUP,
  ...rmqOptionsMeetup,
};

export const clientRmqOptionsAuth = {
  name: RMQ_CONFIG.SERVICE_AUTH,
  ...rmqOptionsAuth,
};
