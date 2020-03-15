import express from 'express';
import bodyParser from 'body-parser';
import APP_ROOT from 'app-root-path';
import request from 'request';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
const stateKey = 'spotify_auth_state';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(express.static(APP_ROOT + '/dist'))
    .use(cookieParser())
    .use(cors())
    .use('/static', express.static(APP_ROOT + '/src/client/public'));

app.get('/spotify-login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-top-read';
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: CLIENT_ID,
                scope: scope,
                redirect_uri: CALLBACK_URL,
                state: state
            })
    );
});

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
    if (state === null || state !== storedState) {
        res.redirect(
            '/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                })
        );
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: CALLBACK_URL,
                grant_type: 'authorization_code'
            },
            headers: {
                Authorization: 'Basic ' + new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token;
                const refresh_token = body.refresh_token;
                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        Authorization: 'Bearer ' + access_token
                    },
                    json: true
                };

                request.get(options, (error, response, body) => {
                    console.log(body);
                });

                res.cookie('access_token', access_token, {
                    httpOnly: true,
                    domain: req.hostname,
                    maxAge: 3600000,
                    sameSite: true
                }).cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    domain: req.hostname,
                    sameSite: true
                });

                res.redirect('/');
            } else {
                res.redirect(
                    '/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        })
                );
            }
        });
    }
});

app.get('/refresh_token', async (req, res) => {
    const refresh_token = req.cookies.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: 'Basic ' + new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };
    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;

            res.cookie('access_token', access_token, {
                httpOnly: true,
                maxAge: 3600000,
                domain: req.hostname,
                sameSite: true
            });

            res.redirect('/login');
        }
    });
});

app.get('/api/is-authenticated', async (req, res) => {
    if (req.cookies.access_token && req.cookies.refresh_token) {
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({
                isAuthenticated: true
            })
        );
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({
                isAuthenticated: false
            })
        );
    }
});

app.get('/api/top/:type/:time_range', async (req, res) => {
    const access_token = req.cookies.access_token;
    const options = {
        url: 'https://api.spotify.com/v1/me/top/' + req.params.type + '?time_range=' + req.params.time_range,
        headers: {
            Authorization: 'Bearer ' + access_token
        },
        json: true
    };

    request.get(options, (error, response, body) => {
        if (body.error && body.error.status == 401) {
            res.redirect('/refresh_token');
        } else {
            res.send(JSON.stringify(body));
        }
    });
});

app.get('/*', (req, res) => {
    res.sendFile(APP_ROOT + '/dist/index.html');
});

app.listen(process.env.PORT, () => {
    console.log(app.get('env'));
    console.log(`Express server started at ${process.env.PORT}`);
});
