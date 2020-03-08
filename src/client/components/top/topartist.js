import React, {useEffect, useState, useRef} from 'react';

const TopArtist = props => {
    useEffect(() => {}, [props.item]);

    const renderItem = () => {
        if (props.item.type == 'artist') {
            return (
                <li className="item">
                    <div className="item-number">{props.number}</div>
                    <img src={props.item.images[1].url}></img>
                    <div className="item-text">
                        <span className="artist">{props.item.name}</span>
                    </div>
                </li>
            );
        }
    };

    return <React.Fragment>{renderItem()}</React.Fragment>;
};

export default TopArtist;
