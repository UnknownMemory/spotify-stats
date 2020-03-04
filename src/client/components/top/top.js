import React, {useEffect, useState, useRef, Fragment} from 'react';

const Top = props => {
    const renderItem = () => {
        if (props.type == 'tracks') {
            return <li className="item">{props.item.name}</li>;
        } else if (props.type == 'artists') {
            return <li className="item">{props.item.name}</li>;
        }
    };

    return <Fragment>{renderItem()}</Fragment>;
};

export default Top;
