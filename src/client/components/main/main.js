import React, {useEffect, useState, useRef} from 'react';

const Main = () => {
    const done = useRef(false);

    const [data, setData] = useState(null);

    const getData = (type, time_range) => {
        fetch(`http://localhost:3000/api/top/${type}/${time_range}`)
            .then(response => response.json())
            .then(data => {
                if (!done.current) {
                    const title_d = type.charAt(0).toUpperCase() + type.slice(1);

                    document.title = `Spotify Stats - Top ${title_d}`;
                    setData(data.items);
                }
            });
    };

    useEffect(() => {
        getData('artists', 'medium_term');
        return () => {
            done.current = true;
        };
    }, []);
    return (
        <main>
            <div id="main-header">
                <div className="btn-default" onClick={() => getData('artists', 'medium_term')}>
                    Artists
                </div>
                <div className="btn-default" onClick={() => getData('tracks', 'medium_term')}>
                    Tracks
                </div>
            </div>
            <div id="main-wrapper"></div>
        </main>
    );
};

export default Main;
