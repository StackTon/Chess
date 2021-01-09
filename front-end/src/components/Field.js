import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';
import constants from '../utils/constants';

const Field = (props) => {
    const { currentSpace, currnetTurn, lastMove } = props;
    const { blackThreat, whiteThreat, figure, color } = currentSpace;
    const figureName = figure.name;
    const figureColor = figure.color;

    let isThisPossibleMove = false;
    let figureClassName = 'figure';
    let spaceClassName = `field ${color}`;

    const isXActive = props.x === props.activeFigureCoordinates.x;
    const isYActive = props.y === props.activeFigureCoordinates.y;
    if (isXActive && isYActive) {
        figureClassName += ' active-figure';
    }

    const isWhiteThreatenThisSpace = figureColor === constants.WHITE && blackThreat.length > 0;
    const isBlackThreatenThisSpace = figureColor === constants.BLACK && whiteThreat.length > 0;
    const isKingThreaten = isWhiteThreatenThisSpace || isBlackThreatenThisSpace;
    if (figureName === constants.KING && isKingThreaten) {
        figureClassName += ' threaten-king';
    }

    if (figureColor === currnetTurn) {
        figureClassName += ' cursor-pointer';
    }

    for (const position of props.possibleMoves) {
        if (position.x === props.x && position.y === props.y) {
            isThisPossibleMove = true;
            spaceClassName += ' cursor-pointer';
            break;
        }
    }

    const checkForLastToMove = lastMove.toX === props.x && lastMove.toY === props.y;
    const checkForLastFromMove = lastMove.fromX === props.x && lastMove.fromY === props.y;
    const checkForLastMove = checkForLastToMove || checkForLastFromMove;
    if (checkForLastMove) {
        spaceClassName += ' lastMove';
    }

    const spaceClickFunc = () => (isThisPossibleMove ? props.moveTo(props.x, props.y) : undefined);
    return (
        <div
            className={spaceClassName}
            onClick={spaceClickFunc}
            onKeyUp={spaceClickFunc}
            role="button"
        >
            {isThisPossibleMove ? <div className="possible-move" /> : <></>}
            {figureName
                ? (
                    <Figure
                        onClickFunc={() => {
                            if (currnetTurn === figureColor) {
                                return props.setActiveFigure(props.x, props.y);
                            }
                            return undefined;
                        }}
                        figureColor={figureColor}
                        figureName={figureName}
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
