import Redis from 'ioredis';
import { responseEntity } from '../../helpers/response.entity.js';

export const handler = async () => {
  console.log('before client creation');
  const config = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    lazyConnect: true
  };
  console.dir(config);
  const redis = new Redis(config);
  console.log('before connect');
  await redis.connect();
  await redis.set('token', Math.random().toString(16));
  console.log('set token OK');
  const token = await redis.get('token');
  console.log('get token OK');
  console.log('Token returned => ' + token);
  await redis.quit();
  console.log('Redis quited');
  return responseEntity({ access_token: token }).status(200).build();
};
