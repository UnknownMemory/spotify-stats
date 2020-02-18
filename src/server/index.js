import express from 'express';
import bodyParser from 'body-parser';
import APP_ROOT from 'app-root-path';

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(APP_ROOT + '/dist/client'));

app.get('/*', (req, res, next) => {
    res.sendFile(APP_ROOT + '/dist/client/index.html');
});

app.listen(process.env.PORT, () => {
    console.log(
        `Express server started at http://localhost:${process.env.PORT}`
    );
});
