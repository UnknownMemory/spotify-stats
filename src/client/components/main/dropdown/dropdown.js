import React, {useRef, useEffect, Fragment} from 'react';
import {CSSTransition} from 'react-transition-group';

const Dropdown = props => {
    const options = Object.entries(props.options).map(([key, value]) => {
        return <button onClick={() => props.selected(key)}>{value}</button>;
    });

    return (
        <div className="dropdown">
            <span className="dropdown-text">{props.dropdownText}: </span>
            <span className="dropdown-selected-options"></span>
            <i className="material-icons">keyboard_arrow_down</i>
            <div className="dropdrown-options">{options}</div>
        </div>
    );
};

export default Dropdown;
