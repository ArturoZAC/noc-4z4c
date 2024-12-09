import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-log";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

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


    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     // const date = new Date();
    //     // console.log('5 seconds', date)
    //     const url = 'https://google.com'
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log(`${ url } is ok`),
    //       ( error ) => console.log( error ),
    //     ).execute( url );
    //   }
    // );

  }
}