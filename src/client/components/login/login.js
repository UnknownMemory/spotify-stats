import React, {useEffect, Fragment} from 'react';

const Login = () => {
    useEffect(() => {
        document.title = 'Spotify Stats - Login';
    }, []);
    return (
        <Fragment>
            <div className="login-wrapper">
                <h1>Spotify Stats</h1>
                <a className="btn-default" href="/spotify-login">
                    Log with Spotify
                </a>
            </div>
        </Fragment>
    );
};

export default Login;
