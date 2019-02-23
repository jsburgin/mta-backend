import bodyParser from 'body-parser';
import helmet from 'helmet';
import app from '../index';

jest.mock('body-parser');
jest.mock('express', () => require('jest-express'));
jest.mock('helmet');

describe('App: Server Setup', () => {
  it('Should setup middleware', () => {
    expect(app.use).toHaveBeenCalledTimes(4);
  });

  it('Should setup body-parser', () => {
    expect(bodyParser.urlencoded).toHaveBeenCalledTimes(1);
    expect(bodyParser.json).toHaveBeenCalledTimes(1);

    // @ts-ignore
    expect(bodyParser.urlencoded.mock.calls[0][0]).toMatchObject({
      extended: true,
    });

    expect(app.use).toHaveBeenNthCalledWith(2, 'mock-urlencoded');
    expect(app.use).toHaveBeenNthCalledWith(3, 'mock-json');
  });

  it('Should setup helmet', () => {
    expect(helmet).toHaveBeenCalledTimes(1);
    expect(app.use).toHaveBeenNthCalledWith(1, 'mock-helmet');
  });
});