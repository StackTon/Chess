import React from 'react';
import PropTypes from 'prop-types';

import chessFiguresPictures from '../chessFiguresPictures';

const Figure = (props) => (
    <img
        src={chessFiguresPictures[props.figureColor + props.figureName]}
        className={props.className}
        alt={props.figureName}
        onClick={props.onClickFunc}
        onKeyUp={props.onClickFunc}
        role="button"
    />
);

Figure.propTypes = {
    onClickFunc: PropTypes.func,
    figureName: PropTypes.string,
    figureColor: PropTypes.string,
    className: PropTypes.string,
};

export default Figure;
