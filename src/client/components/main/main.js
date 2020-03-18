import React, {useEffect, useState, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import MobileMenu from './mobilemenu';
import TopArtist from '../top/topartist';
import TopTrack from '../top/toptrack';
import Dropdown from './dropdown/dropdown';

const Main = () => {
    const done = useRef(false);

    const [data, setData] = useState(null);
    const [type, setType] = useState('artists');
    const [timeRange, setTimeRange] = useState('medium_term');
    const [filterMenu, setFilterMenu] = useState(false);

    const timeRangeName = {long_term: 'all time', medium_term: 'the last 6 months', short_term: 'the last 4 weeks'};

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
        <React.Fragment>
            <div className="main-header">
                <div className="spotify-logo">
                    <img src="/static/img/spotify_logo.png" alt="" />
                    Spotify Stats
                </div>
                <button className="btn-default no-border menu-btn" onClick={() => setFilterMenu(true)}>
                    <i className="filter-list" className="material-icons">
                        menu
                    </i>
                </button>
                <div className="dropdown-filter">
                    <Dropdown
                        dropdownText="Type"
                        options={{artists: 'Artists', tracks: 'Tracks'}}
                        current={type}
                        selected={handleType}></Dropdown>
                    <Dropdown
                        dropdownText="Time range"
                        options={{
                            long_term: 'All time',
                            medium_term: 'Last 6 months',
                            short_term: 'Last 4 weeks'
                        }}
                        current={timeRange}
                        selected={handleTimeRange}></Dropdown>
                </div>
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

            <div className="main-wrapper">
                <h1>{`Top ${type} of ${timeRangeName[timeRange]}`}</h1>
                <ul>
                    {data
                        ? data.map((item, index) => {
                              if (type == 'artists') {
                                  return <TopArtist key={item.id} number={index + 1} item={item} />;
                              } else if (type == 'tracks') {
                                  return <TopTrack key={item.id} number={index + 1} item={item} />;
                              }
                          })
                        : null}
                </ul>
            </div>
        </React.Fragment>
    );
};

export default Main;
