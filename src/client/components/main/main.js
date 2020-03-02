import React, {useEffect, useState, useRef} from 'react';
import MobileMenu from './mobilemenu';
import {CSSTransition} from 'react-transition-group';

const Main = () => {
    const done = useRef(false);

    const [data, setData] = useState(null);
    const [type, setType] = useState('artists');
    const [timeRange, setTimeRange] = useState('medium_term');
    const [filterMenu, setFilterMenu] = useState(false);

    const handleType = btnType => {
        setType(btnType);
        getData(btnType, timeRange);
    };

    const handleTimeRange = btnRange => {
        setTimeRange(btnRange);
        getData(type, btnRange);
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
            <div className="main-header">
                <div className="spotify-logo">
                    <img src="/static/img/spotify_logo.png" alt="" />
                    Spotify Stats
                </div>
                <button className="btn-default no-border" onClick={() => setFilterMenu(true)}>
                    <i className="filter-list" className="material-icons">
                        menu
                    </i>
                </button>
            </div>
            <CSSTransition in={filterMenu} timeout={200} classNames="overlay">
                <div></div>
            </CSSTransition>

            <MobileMenu
                timeRange={timeRange}
                type={type}
                isVisible={filterMenu}
                setIsVisible={setFilterMenu}
                handleTimeRange={handleTimeRange}
                handleType={handleType}></MobileMenu>

            <div className="main-wrapper"></div>
            <div className="main-footer">
                <button className="btn-default no-border">
                    <i className="material-icons">arrow_downward</i>
                    Share
                </button>
            </div>
        </main>
    );
};

export default Main;
