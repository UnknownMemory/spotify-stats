import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const TopTrack = props => {
    useEffect(() => {}, [props.item]);

    const renderItem = () => {
        if (props.item.type == 'track') {
            return (
                <li className="item">
                    <div className="item-number">{props.number}</div>
                    <img src={props.item.album.images[1].url}></img>
                    <div className="item-text">
                        <span className="artist">{props.item.album.artists[0].name}</span>
                        <span>{props.item.name}</span>
                    </div>
                </li>
            );
        }
    };

    return <React.Fragment>{renderItem()}</React.Fragment>;
};

TopTrack.propTypes = {
    item: PropTypes.object
};

export default TopTrack;
