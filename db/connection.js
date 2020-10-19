// mongoose - Database

const mongoose = require('mongoose');
const dotenv = require('../app.js');
const dbURL = process.env.MONGODB_URI;
mongoose.connect(dbURL);

mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we are connected!');
});


