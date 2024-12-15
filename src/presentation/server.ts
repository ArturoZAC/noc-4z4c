import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service.multiple";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

// const emailService = new EmailService();

export class Server {
  
  public static start() {
    console.log('Server started...')

    //MANDAR EMAIL

    //** Official Code **//
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository,
    // ).execute('arturoyz2105@gmail.com');
    
    // emailService.sendEmailWithSystemLogs('arturoyz2105@gmail.com');


    CronService.createJob(
      '*/5 * * * * *',
      () => {
        // const date = new Date();
        // console.log('5 seconds', date)
        const url = 'https://google.com'
        new CheckServiceMultiple(
          [fsLogRepository, mongoLogRepository, postgresLogRepository],
          () => console.log(`${ url } is ok`),
          ( error ) => console.log( error ),
        ).execute( url );
      }
    );

  }
}