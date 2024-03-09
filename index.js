require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = {
	origin: process.env.FE_PORT,
	credentials: true,
};
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

require('./app/routes')(app);

app.get('/', (request, response) => response.send(process.env.TEST));
app.listen(process.env.PORT, () =>
	console.log(`Listening: port ${process.env.PORT}`)
);
