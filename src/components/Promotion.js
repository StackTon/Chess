import React from 'react';

import chessFiguresPictures from '../chessFiguresPictures';

export default (props) => {
    if (props.promotionMove) {
        return (
            <div className="promotion-bord">
                <div className="promotion-figures">
                    <img
                        src={chessFiguresPictures[`${props.color}Queen`]}
                        className="figure cursor-pointer"
                        onClick={() => props.promotionPawn('Queen')}
                    />
                    <img
                        src={chessFiguresPictures[`${props.color}Bishop`]}
                        className="figure cursor-pointer"
                        onClick={() => props.promotionPawn('Bishop')}
                    />
                    <img
                        src={chessFiguresPictures[`${props.color}Knight`]}
                        className="figure cursor-pointer"
                        onClick={() => props.promotionPawn('Knight')}
                    />
                    <img
                        src={chessFiguresPictures[`${props.color}Rook`]}
                        className="figure cursor-pointer"
                        onClick={() => props.promotionPawn('Rook')}
                    />
                </div>
            </div>
        );
    }
    return <></>;
};
