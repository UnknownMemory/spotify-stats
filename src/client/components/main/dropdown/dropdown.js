import React, {useState, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';

const Dropdown = props => {
    const [current, setCurrent] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        if (isOpen == false) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const options = Object.entries(props.options).map(([key, value], index) => {
        return (
            <button
                className={current == value ? 'selected-option' : null}
                key={index}
                onClick={() => {
                    props.selected(key);
                    setIsOpen(false);
                }}>
                {value}
            </button>
        );
    });

    useEffect(() => {
        for (let [key, value] of Object.entries(props.options)) {
            if (key == props.current) {
                setCurrent(value);
            }
        }
    }, [props.current]);

    return (
        <CSSTransition in={isOpen} timeout={100} classNames="dropdown-options-open">
            <div className="dropdown">
                <div className="dropdown-main" onClick={() => toggleOpen(true)}>
                    <span className="dropdown-text">{props.dropdownText}:</span>
                    <span className="dropdown-selected-options">{current}</span>
                    <i className="material-icons">keyboard_arrow_down</i>
                </div>

                <div className="dropdown-options">{options}</div>
            </div>
        </CSSTransition>
    );
};

export default Dropdown;
