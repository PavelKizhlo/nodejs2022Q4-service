import * as dotenv from 'dotenv';
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config({ path: path.join(__dirname, '.env') });

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export default {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
} as TypeOrmModuleOptions;
