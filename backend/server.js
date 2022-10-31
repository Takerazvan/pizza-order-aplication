const express = require('express');

const fs = require('fs');
const path = require('path');
const fileReader = require('./fileReader');
const fileWriter = require('./fileWriter');

const filePath = path.join(`${__dirname}/pizza.json`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 9000;

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});
app.get('/api/pizza ', (req, res) => {
    res.sendFile(path.join());
});
app.use('/public', express.static(`${__dirname}/../frontend/public`));

async function getData() {
    const myData = await fileReader(filePath);
    return JSON.parse(myData.toString());
}

app.listen(port, (_) => console.log(`http://127.0.0.1:${port}`));
