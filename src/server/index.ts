import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import forceHttps from './middleware/force-https';

const app: express.Application = express();
const isProd = config.get('env') === 'production';
const port: string = process.env.PORT || config.get('port');
const router = express.Router();

if (isProd) {
  app.use(forceHttps);
}

app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(router);
app.listen(port);

export default app;
