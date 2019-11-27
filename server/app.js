import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(cors());
app.use(express.static('./public'));

app.get('/stocks', (req, res) => {
  const stocks = 'https://financialmodelingprep.com/api/v3/company/stock/list';
  fetch(stocks)
    .then((data) => {
      data.json().then((resp) => {
        res.status(200).send(resp);
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

export default app;
