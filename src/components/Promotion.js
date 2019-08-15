import React from 'react';
import PropTypes from 'prop-types';

import Figure from './Figure';

const Promotion = (props) => {
    if (props.promotionMove) {
        const figureClassName = 'figure cursor-pointer';
        return (
            <div className="promotion-bord">
                <div className="promotion-figures">
                    <Figure
                        promotionPawn={() => props.promotionPawn('Queen')}
                        figureName="Queen"
                        figureColor={props.color}
                        className={figureClassName}
                    />
                    <Figure
                        promotionPawn={() => props.promotionPawn('Bishop')}
                        figureName="Bishop"
                        figureColor={props.color}
                        className={figureClassName}
                    />
                    <Figure
                        promotionPawn={() => props.promotionPawn('Knight')}
                        figureName="Knight"
                        figureColor={props.color}
                        className={figureClassName}
                    />
                    <Figure
                        promotionPawn={() => props.promotionPawn('Rook')}
                        figureName="Rook"
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
