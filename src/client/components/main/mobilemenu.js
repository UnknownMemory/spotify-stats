import React, {useRef, useEffect, Fragment} from 'react';
import {CSSTransition} from 'react-transition-group';

const MobileMenu = props => {
    const isOn = useRef(null);

    const handleClickListener = () => {
        if (isOn.current && !isOn.current.contains(event.target)) {
            props.setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickListener), false;
        return () => document.removeEventListener('click', handleClickListener, false);
    }, [props.isVisible]);

    return (
        <CSSTransition in={props.isVisible} timeout={200} classNames="filter-menu">
            <div className="mobile-filter" ref={isOn}>
                <div className="filters">
                    <div className="time-range">
                        <div className="filter-title">Time range</div>
                        <ul>
                            <li
                                className={props.timeRange == 'long_term' ? 'selected' : null}
                                onClick={() => props.handleTimeRange('long_term')}>
                                All time
                                {props.timeRange == 'long_term' ? <i className="material-icons">done</i> : null}
                            </li>
                            <li
                                className={props.timeRange == 'medium_term' ? 'selected' : null}
                                onClick={() => props.handleTimeRange('medium_term')}>
                                Last 6 months
                                {props.timeRange == 'medium_term' ? <i className="material-icons">done</i> : null}
                            </li>
                            <li
                                className={props.timeRange == 'short_term' ? 'selected' : null}
                                onClick={() => props.handleTimeRange('short_term')}>
                                Last 4 weeks
                                {props.timeRange == 'short_term' ? <i className="material-icons">done</i> : null}
                            </li>
                        </ul>
                    </div>
                    <div className="type">
                        <div className="filter-title">Type</div>
                        <ul>
                            <li
                                className={props.type == 'artists' ? 'selected' : null}
                                onClick={() => props.handleType('artists')}>
                                Artists
                                {props.type == 'artists' ? <i className="material-icons">done</i> : null}
                            </li>
                            <li
                                className={props.type == 'tracks' ? 'selected' : null}
                                onClick={() => props.handleType('tracks')}>
                                Tracks
                                {props.type == 'tracks' ? <i className="material-icons">done</i> : null}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default MobileMenu;
