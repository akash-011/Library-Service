const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const books = require('./src/routes/books');

const app = express();

require('dotenv').config()

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB'));


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}


app.use('/api/books', books);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))
