import { LogEntity, LogServerityLevel } from "./log.entity"

describe('LogEntity', () => {

  const dataObj = {
    message: 'Hola Mundo',
    level: LogServerityLevel.high,
    origin: 'log.entity.test.ts'
  }

  test('should create a LogEntity instance', () => {


    const log = new LogEntity( dataObj );

    expect( log ).toBeInstanceOf( LogEntity );
    expect( log.message ).toBe( dataObj.message );
    expect( log.level ).toBe( dataObj.level );
    expect( log.origin ).toBe( dataObj.origin );
    expect( log.createdAt ).toBeInstanceOf( Date );


  })


  test('should create a LogEntity instance from Json', () => {
    const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-12-15T18:49:30.304Z","origin":"check-service.ts"}`
    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf( LogEntity );
    expect( log.message ).toBe( "Service https://google.com working" );
    expect( log.level ).toBe( LogServerityLevel.low );
    expect( log.origin ).toBe( "check-service.ts" );
    expect( log.createdAt ).toBeInstanceOf( Date );


  })

  test('should create a LogEntity instance from Object', () => {
    const log = LogEntity.fromObject( dataObj );

    expect( log ).toBeInstanceOf( LogEntity );
    expect( log.message ).toBe( dataObj.message );
    expect( log.level ).toBe( dataObj.level );
    expect( log.origin ).toBe( dataObj.origin );
    expect( log.createdAt ).toBeInstanceOf( Date );
  })


})