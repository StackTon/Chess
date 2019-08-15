import React from 'react';
import PropTypes from 'prop-types';

import Figure from './Figure';

import chessFiguresPictures from '../chessFiguresPictures';

const Field = (props) => {
    let isThisPossibleMove = false;
    let figureClassName = 'figure';
    let spaceClassName = `field ${props.currentSpace.color}`;

    if (props.x === props.activeFigureCoordinates.x && props.y === props.activeFigureCoordinates.y) {
        figureClassName += ' active-figure';
    }

    if (props.currentSpace.figure.name === 'King' && ((props.currentSpace.blackThreat.length > 0 && props.currentSpace.figure.color === 'white') || (props.currentSpace.whiteThreat.length > 0 && props.currentSpace.figure.color === 'black'))) {
        figureClassName += ' threaten-king';
    }

    if (props.currentSpace.figure.color === props.currnetTurn) {
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
        <div
            className={spaceClassName}
            onClick={() => (isThisPossibleMove ? props.moveTo(props.x, props.y) : undefined)}
            onKeyUp={() => (isThisPossibleMove ? props.moveTo(props.x, props.y) : undefined)}
            role="button"
        >
            {isThisPossibleMove ? <div className="possible-move" /> : <></>}
            {chessFiguresPictures[props.currentSpace.figure.color + props.currentSpace.figure.name]
                ? (
                    <Figure
                        onClickFunc={() => (props.currnetTurn === props.currentSpace.figure.color ? props.setActiveFigure(props.x, props.y) : undefined)}
                        figureColor={props.currentSpace.figure.color}
                        figureName={props.currentSpace.figure.name}
                        className={figureClassName}
                    />
                ) : <></>}
        </div>
    );
};

Field.propTypes = {
    currentSpace: PropTypes.shape({
        color: PropTypes.string,
        whiteThreat: PropTypes.arrayOf(
            PropTypes.shape({
                x: PropTypes.number,
                y: PropTypes.number,
                color: PropTypes.string,
                name: PropTypes.string,
                possibleMoves: PropTypes.arrayOf(
                    PropTypes.shape({
                        x: PropTypes.number,
                        y: PropTypes.number,
                    }),
                ),
            }),
        ),
        blackThreat: PropTypes.arrayOf(
            PropTypes.shape({
                x: PropTypes.number,
                y: PropTypes.number,
                color: PropTypes.string,
                name: PropTypes.string,
                possibleMoves: PropTypes.arrayOf(
                    PropTypes.shape({
                        x: PropTypes.number,
                        y: PropTypes.number,
                    }),
                ),
            }),
        ),
        figure: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
            color: PropTypes.string,
            isMoved: PropTypes.bool,
            isThreaten: PropTypes.bool,
            name: PropTypes.string,
            finalPoint: PropTypes.number,
            normalMoves: PropTypes.func,
            takeMoves: PropTypes.func,
            possibleMoves: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.number,
                    y: PropTypes.number,
                }),
            ),
        }),
    }),
    y: PropTypes.number,
    x: PropTypes.number,
    activeFigureCoordinates: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    setActiveFigure: PropTypes.func,
    possibleMoves: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }),
    ),
    moveTo: PropTypes.func,
    lastMove: PropTypes.shape({
        toX: PropTypes.number,
        toY: PropTypes.number,
        fromX: PropTypes.number,
        fromY: PropTypes.number,
        figureName: PropTypes.string,
    }),
    currnetTurn: PropTypes.string,
};

export default Field;
