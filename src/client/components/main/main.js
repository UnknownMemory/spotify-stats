import React, {useEffect, useState, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';

const Main = () => {
    const done = useRef(false);

    const [data, setData] = useState(null);
    const [type, setType] = useState('artists');
    const [timeRange, setTimeRange] = useState('medium_term');
    const [filterMenu, setFilterMenu] = useState(false);

    const handleType = btnType => {
        setType(btnType);
        getData(type, timeRange);
    };

    const handleTimeRange = btnRange => {
        setTimeRange(btnRange);
        getData(type, timeRange);
    };

    const getData = (apiType, apiTimeRange) => {
        fetch(`http://localhost:3000/api/top/${apiType}/${apiTimeRange}`)
            .then(response => response.json())
            .then(data => {
                if (!done.current) {
                    const title_d = apiType.charAt(0).toUpperCase() + apiType.slice(1);
                    document.title = `Spotify Stats - Top ${title_d}`;

                    setData(data.items);
                }
            });
    };

    useEffect(() => {
        getData(type, timeRange);
        return () => {
            done.current = true;
        };
    }, []);
    return (
        <main>
            <div id="main-header">
                <div id="spotify-logo">
                    <img src="/static/img/spotify_logo.png" alt="" />
                    Spotify Stats
                </div>
                <button className="btn-default no-border" onClick={() => setFilterMenu(true)}>
                    <i id="filter-list" className="material-icons">
                        menu
                    </i>
                </button>
            </div>

            <CSSTransition in={filterMenu} timeout={200} classNames="filter-menu">
                <div id="mobile-filter">
                    <div id="filters">
                        <div id="time-range">
                            <div className="filter-title">Time range</div>
                            <ul>
                                <li
                                    className={timeRange == 'long_term' ? 'selected' : null}
                                    onClick={() => handleTimeRange('long_term')}>
                                    All time
                                    {timeRange == 'long_term' ? <i className="material-icons">done</i> : null}
                                </li>
                                <li
                                    className={timeRange == 'medium_term' ? 'selected' : null}
                                    onClick={() => handleTimeRange('medium_term')}>
                                    Last 6 months
                                    {timeRange == 'medium_term' ? <i className="material-icons">done</i> : null}
                                </li>
                                <li
                                    className={timeRange == 'short_term' ? 'selected' : null}
                                    onClick={() => handleTimeRange('short_term')}>
                                    Last 4 weeks
                                    {timeRange == 'short_term' ? <i className="material-icons">done</i> : null}
                                </li>
                            </ul>
                        </div>
                        <div id="type">
                            <div className="filter-title">Type</div>
                            <ul>
                                <li
                                    className={type == 'artists' ? 'selected' : null}
                                    onClick={() => handleType('artists')}>
                                    Artists
                                    {type == 'artists' ? <i className="material-icons">done</i> : null}
                                </li>
                                <li
                                    className={type == 'tracks' ? 'selected' : null}
                                    onClick={() => handleType('tracks')}>
                                    Tracks
                                    {type == 'tracks' ? <i className="material-icons">done</i> : null}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CSSTransition>

            <div id="main-wrapper"></div>
            <div id="main-footer">
                <button className="btn-default no-border">
                    <i className="material-icons">arrow_downward</i>
                    Share
                </button>
            </div>
        </main>
    );
};

export default Main;
