import express from 'express';

require('dotenv').config()
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(process.env.PORT, function () {
    console.log(`Express server started at http://localhost:${process.env.PORT}`)
})