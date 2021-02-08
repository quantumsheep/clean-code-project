import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export function start() {
  app.listen(3000, () => console.log(`Listening on http://localhost:3000`));
}
