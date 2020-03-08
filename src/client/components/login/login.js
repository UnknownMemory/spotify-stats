import React, {useEffect} from 'react';

const Login = () => {
    useEffect(() => {
        document.title = 'Spotify Stats - Login';
    }, []);
    return (
        <React.Fragment>
            <div className="login-wrapper">
                <h1>Spotify Stats</h1>
                <a className="btn-default" href="/spotify-login">
                    Log with Spotify
                </a>
            </div>
        </React.Fragment>
    );
};

export default Login;
