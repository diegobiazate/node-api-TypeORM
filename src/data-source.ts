import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Room } from './entities/Room';
import { Video } from './entities/Video';

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  subscribers: [],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})