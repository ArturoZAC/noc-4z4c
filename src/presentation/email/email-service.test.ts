import nodemailer from "nodemailer"
import { EmailService, SendMailOptions } from "./email-service"

describe('EmailService', () => {

  const mockSendMail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  })

  const emailService = new EmailService();

  test('should send Email', async () => {

    const options: SendMailOptions = {
      to: 'arturoyz2105@gmail.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>'
    }

    await emailService.sendEmail( options );
    expect( mockSendMail ).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "arturoyz2105@gmail.com"
    })
  })

  test('should send email with attachements', async () => {
    const email = 'arturoyz2105@gmail.com';
    await emailService.sendEmailWithSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject:  "Logs del Servidor",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: 'logs-all.log', path: './logs/logs-all.log'},
        { filename: 'logs-high.log', path: './logs/logs-high.log'},
        { filename: 'logs-medium.log', path: './logs/logs-medium.log'},
      ])
    })

  })



})