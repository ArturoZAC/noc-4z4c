import { LogEntity } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"
import { SendEmailLogs } from "./send-email-log"

describe('SendEmailLogs', () => {

  const mockEmailService = {
    sendEmailWithSystemLogs: jest.fn().mockReturnValue(true)
  }

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  )

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should call sendEmail and saveLog', async () => {

    const result = await sendEmailLogs.execute('arturoyz2105@gmail.com');
    expect( result ).toBe(true);
    expect(mockEmailService.sendEmailWithSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith( expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Log email sent",
      origin: "send-email-log.ts",
    })
  })


  test('should log in case of error', async () => {

    mockEmailService.sendEmailWithSystemLogs.mockResolvedValue(false)

    const result = await sendEmailLogs.execute('arturoyz2105@gmail.com');
    expect( result ).toBe(false);
    expect(mockEmailService.sendEmailWithSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith( expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error: Email log not sent",
      origin: "send-email-log.ts",
    })
  })

})