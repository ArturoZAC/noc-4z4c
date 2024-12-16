import 'dotenv/config'
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo';
import { PrismaClient } from '@prisma/client';

(async() => {
  main();
})();

async function main(){

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,  
    dbName: envs.MONGO_DB_NAME     
  });

  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: 'Test message desde Prisma',
  //     origin: 'App.ts',
  //     level: 'HIGH'
  //   }
  // });
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: 'HIGH'
  //   }
  // })

  // console.log(logs)

  Server.start();
}