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
                    <li className={type == 'artists' ? 'selected' : null} onClick={() => handleType('artists')}>
                        Artists
                        {type == 'artists' ? <i className="material-icons">done</i> : null}
                    </li>
                    <li className={type == 'tracks' ? 'selected' : null} onClick={() => handleType('tracks')}>
                        Tracks
                        {type == 'tracks' ? <i className="material-icons">done</i> : null}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</CSSTransition>;
