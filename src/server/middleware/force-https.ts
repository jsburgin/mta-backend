import {Request, Response} from 'express';

/**
 * Middleware to redirect all requests to https
 * @param req the express request object
 * @param res the express response object
 * @param next express next callback
 */
const forceHttps = (req: Request, res: Response, next: Function) => {
  if (req.headers && req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(['https://', req.hostname, req.url].join(''));
  }

  next();
};

export default forceHttps;
