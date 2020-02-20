import React, {Fragment, useEffect} from 'react';

const Top = () => {
    useEffect(() => {
        document.title = 'Spotify Stats';
    }, []);
    return (
        <main>
            <div id="top-wrapper"></div>
        </main>
    );
};

export default Top;
