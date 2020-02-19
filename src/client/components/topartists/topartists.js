import React, {Fragment, useEffect} from 'react';

const TopArtists = () => {
    useEffect(() => {
        document.title = 'Spotify Stats - Top Artists';
    }, []);
    return (
        <main>
            <div id="top-wrapper"></div>
        </main>
    );
};

export default TopArtists;
