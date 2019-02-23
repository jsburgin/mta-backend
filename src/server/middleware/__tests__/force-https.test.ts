import {Request, Response} from 'express';
import forceHttps from '../force-https';

describe('Force HTTPS middleware', () => {
  let req: Request;
  let res: Response;
  let next: Function;

  beforeEach(() => {
    jest.resetAllMocks();
    // @ts-ignore
    req = {
      headers: {
        'x-forwarded-proto': 'http',
      },
      hostname: 'mta.joshburgin.io',
      url: '/api/test/it'
    };
    // @ts-ignore
    res = {
      redirect: jest.fn(),
    };
    next = jest.fn();
  });

  it('Should redirect on an http request', () => {
    forceHttps(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledTimes(1);

    // @ts-ignore
    expect(res.redirect.mock.calls[0][0])
      .toBe('https://mta.joshburgin.io/api/test/it');
  });

  it('Should pass through on an https request', () => {
    req.headers['x-forwarded-proto'] = 'https';
    forceHttps(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.redirect).not.toHaveBeenCalled();
  });
});
