require('dotenv').config();
const mongoose = require('mongoose');

async function test() {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Database connected:', connect.connection.host, connect.connection.name);
    process.exit(0);
  } catch (err) {
    console.error('ERROR_CONNECTING:', err);
    process.exit(1);
  }
}

test();
