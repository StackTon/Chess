import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';
import constants from '../utils/constants';

const Promotion = (props) => {
    if (props.promotionMove) {
        const figureClassName = 'figure cursor-pointer';
        return (
            <div className="promotion-bord">
                <div className="promotion-figures">
                    <Figure
                        promotionPawn={() => props.promotionPawn(constants.QUEEN)}
                        figureName={constants.QUEEN}
                        figureColor={props.color}
                        className={figureClassName}
                    />
                    <Figure
                        promotionPawn={() => props.promotionPawn(constants.BISHOP)}
                        figureName={constants.BISHOP}
                        figureColor={props.color}
                        className={figureClassName}
                    />
                    <Figure
                        promotionPawn={() => props.promotionPawn(constants.KNIGHT)}
                        figureName={constants.KNIGHT}
                        figureColor={props.color}
                        className={figureClassName}
                    />
                    <Figure
                        promotionPawn={() => props.promotionPawn(constants.ROOK)}
                        figureName={constants.ROOK}
                        figureColor={props.color}
                        className={figureClassName}
                    />
                </div>
            </div>
        );
    }
    return <></>;
};

Promotion.propTypes = {
    color: PropTypes.string,
    promotionPawn: PropTypes.func,
    promotionMove: PropTypes.bool,
};

export default Promotion;
