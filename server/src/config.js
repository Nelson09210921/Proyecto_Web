import { config } from 'dotenv';
config();

export default {
    config: {
      host: process.env.HOST,
      user: process.env.USER,
      pass: process.env.PASS,
      database: process.env.DATABASE,
      port: process.env.PORT,
      token: process.env.ACCESS_TOKEN,
    },
  };