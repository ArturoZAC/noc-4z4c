import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDataSource {

  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log('Mongo Log created:', newLog.id)
  }
  async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: severityLevel,
    })

    return logs.map( LogEntity.fromObject );
  }

}