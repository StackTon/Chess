import React from 'react';

import chessFiguresPictures from '../chessFiguresPictures';

export default (props) => {
    let isThisPossibleMove = false;
    let figureClassName = 'figure';
    let spaceClassName = 'field ' + props.currnetSpace.color;

    if (props.x === props.activeFigureCoordinates.x && props.y === props.activeFigureCoordinates.y) {
        figureClassName += ' active-figure';
    }

    if (props.currnetSpace.figure.name === 'King' && ((props.currnetSpace.blackThreat.length > 0 && props.currnetSpace.figure.color === 'white') || (props.currnetSpace.whiteThreat.length > 0 && props.currnetSpace.figure.color === 'black'))) {
        figureClassName += ' threaten-king';
    }

    if (props.currnetSpace.figure.color === props.currnetTurn) {
        figureClassName += ' cursor-pointer';
    }

    for (const position of props.possibleMoves) {
        if (position.x === props.x && position.y === props.y) {
            isThisPossibleMove = true;
            spaceClassName += ' cursor-pointer';
            break;
        }
    }

    if ((props.lastMove.fromX === props.x && props.lastMove.fromY === props.y) || (props.lastMove.toX === props.x && props.lastMove.toY === props.y)) {
        spaceClassName += ' lastMove';
    }

    return (
        <div className={spaceClassName} onClick={() => isThisPossibleMove ? props.moveTo(props.x, props.y) : undefined}>
            {isThisPossibleMove ? <div className="possible-move"></div> : <></>}
            {chessFiguresPictures[props.currnetSpace.figure.color + props.currnetSpace.figure.name] ?
                <img
                    src={chessFiguresPictures[props.currnetSpace.figure.color + props.currnetSpace.figure.name]}
                    className={figureClassName}
                    onClick={() => props.currnetTurn === props.currnetSpace.figure.color ? props.setActiveFigure(props.x, props.y) : undefined}
                /> : <></>}
        </div>
    )
}