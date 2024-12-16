import { envs } from "./envs.plugin"

describe('envs.plugin.ts', () => {


  test('should return env options', () => {
    expect( envs ).toEqual( {
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'arturoyz2105@gmail.com',
      MAILER_SECRET_KEY: 'zgoa zbqi kews ldyn',
      PROD: false,
      MONGO_URL: 'mongodb://arturo:123456789@localhost:27018/',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'arturo',
      MONGO_PASS: '123456789'
    } )
  })

  test('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugin');
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }

  })


})