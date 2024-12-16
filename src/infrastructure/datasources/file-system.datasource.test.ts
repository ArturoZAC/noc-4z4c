import fs from "fs"
import path from "path"
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

describe('FileSystemDatasource', () => {
  const logPath = path.join(__dirname, '../../../logs');

  beforeEach( () => {
    fs.rmSync( logPath, {recursive: true, force: true})
  })

  test('should create log files if they do not exits', () => {

    new FileSystemDatasource();
    const files = fs.readdirSync( logPath );
    expect( files ).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])

  })

  test('should save a log in logs-all.log', () => {

    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'test',
      level: LogServerityLevel.low,
      origin: 'file-system.datasource.test.ts'
    })

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    expect(allLogs).toContain( JSON.stringify(log) );


  })

  test('should save a log in logs-all.log and logs-medium.log', () => {

    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'test',
      level: LogServerityLevel.medium,
      origin: 'file-system.datasource.test.ts'
    })

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
    expect(allLogs).toContain( JSON.stringify(log) );
    expect(mediumLogs).toContain( JSON.stringify(log) );


  })

  test('should save a log in logs-all.log and logs-high.log', () => {

    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'test',
      level: LogServerityLevel.high,
      origin: 'file-system.datasource.test.ts'
    })

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
    expect(allLogs).toContain( JSON.stringify(log) );
    expect(highLogs).toContain( JSON.stringify(log) );


  })


  test('should return all logs', async () => {

    const logDatasource = new FileSystemDatasource();
    const logLow = new LogEntity({
      message: 'log-low',
      level: LogServerityLevel.low,
      origin: 'low'
    }) 
    
    const logMedium = new LogEntity({
      message: 'log-low',
      level: LogServerityLevel.medium,
      origin: 'medium'
    }) 

    const logHigh = new LogEntity({
      message: 'log-low',
      level: LogServerityLevel.high,
      origin: 'high'
    }) 

    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedium);
    await logDatasource.saveLog(logHigh);

    const logsLow = await logDatasource.getLogs(LogServerityLevel.low);
    const logsMedium = await logDatasource.getLogs(LogServerityLevel.medium);
    const logsHigh = await logDatasource.getLogs(LogServerityLevel.high);

    expect( logsLow ).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh]))
    expect( logsMedium ).toEqual( expect.arrayContaining([logMedium]))
    expect( logsHigh ).toEqual( expect.arrayContaining([logHigh]))
  })

  test('should not throw an error if path exists', () => {
    new FileSystemDatasource(),
    new FileSystemDatasource(),

    expect(true).toBeTruthy();
  })

  test('should throw an error if severity level is not defined', async () => {
    const logDatasource = new FileSystemDatasource();
    const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogServerityLevel;

    try {
      await logDatasource.getLogs(customSeverityLevel)
    } catch (error) {
      const errorString = `${ error }`;

      expect(errorString).toContain(`${customSeverityLevel} not implemented`);
    }
  })


})