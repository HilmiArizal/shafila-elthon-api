const PORT = process.env.PORT || 8000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotEnv = require('dotenv');
const Database = require('./Database');

dotEnv.config({ path: 'config.env' });
Database();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const { ReservationRouter } = require('./Router');
app.use('/api/reservation', ReservationRouter);

app.get('/', (req, res) => {
    res.send("SERVER HAS BEEN ACTIVE")
});

app.listen(PORT, () => console.log(`PORT ACTIVE IN ${PORT}`));
