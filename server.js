const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleWare/errorHandle');
const connectDb = require('./config/dbConnection');

dotenv.config();

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
