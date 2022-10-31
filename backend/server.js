const express = require('express');
const path = require('path');
const fileReader = require('./FileReader');
const fileWriter = require('./FileWriter.js');

const filePath = path.join(`${__dirname}/pizza.json`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 9000;

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});
app.get('/api/pizza', async (req, res) => {
    res.send(JSON.parse(await fileReader(filePath)).pizza);
});
app.use('/public', express.static(`${__dirname}/../frontend/public`));

app.listen(port, () => console.log(`http://127.0.0.1:${port}`));
