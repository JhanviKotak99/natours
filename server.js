const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

//we handled async errors with catchasync but what about sync error
//this will handle all unexpected synchronous code error like console.log(x) when x is not defined
//should be placed at top before any error might occur to listen to the error and act
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful'));

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//incase passwordis wrong, unable to connect to db etc
//unhandledrejection basically means unfulfilled promises
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION ! 🔴 Shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
