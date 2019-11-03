import React, { Component } from 'react';

// classes
import Board from './bord/Board';

import figureFactory from './utils/figureFactory';

// components
import Field from './components/Field';
import Promotion from './components/Promotion';

import './App.css';

import constants from './utils/constants';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: new Board(),
            activeFigureCoordinates: {
                x: -1,
                y: -1,
            },
            possibleMoves: [],
            lastMove: {
                fromX: -1,
                fromY: -1,
                toX: -1,
                toY: -1,
                figureName: '',
            },
            promotionMove: {
                x: -1,
                y: -1,
                promotion: false,
                color: '',
            },
            whiteKing: {
                x: 4,
                y: 7,
            },
            blackKing: {
                x: 4,
                y: 0,
            },
            currnetTurn: constants.WHITE,
        };

        this.setActiveFigure = this.setActiveFigure.bind(this);
        this.moveTo = this.moveTo.bind(this);
        this.promotionPawn = this.promotionPawn.bind(this);
        this.cleanBlackAndWhiteThreats = this.cleanBlackAndWhiteThreats.bind(this);
        this.calculatePossibleMovesForAllFigures = this.calculatePossibleMovesForAllFigures.bind(this);
        this.calculateMoves = this.calculateMoves.bind(this);
    }

    componentDidMount() {
        this.calculatePossibleMovesForAllFigures(this.state);
    }

    setActiveFigure(x, y) {
        if (this.state.activeFigureCoordinates.x === x && this.state.activeFigureCoordinates.y === y) {
            this.setState({ activeFigureCoordinates: { x: -1, y: -1 }, possibleMoves: [] });
        } else {
            const currnetFigure = this.state.board.boardSpaces[y][x].figure;
            const { possibleMoves } = currnetFigure;

            this.setState({ possibleMoves, activeFigureCoordinates: { x, y } });
        }
    }

    moveTo(x, y) {
        this.setState((state) => {
            const currnetFigure = state.board.boardSpaces[state.activeFigureCoordinates.y][state.activeFigureCoordinates.x].figure;

            const { boardSpaces } = state.board;

            if (currnetFigure.color === constants.WHITE) {
                state.currnetTurn = constants.BLACK;
            } else {
                state.currnetTurn = constants.WHITE;
            }

            if (currnetFigure.isMoved === false) {
                if (currnetFigure.name === constants.KING) {
                    if (x === 2) { // left castlig
                        boardSpaces[y][3].figure = state.board.boardSpaces[y][0].figure;
                        boardSpaces[y][3].figure.x = 3;
                        boardSpaces[y][0].figure = {};
                    } else if (x === 6) { // right castlig
                        boardSpaces[y][5].figure = state.board.boardSpaces[y][0].figure;
                        boardSpaces[y][5].figure.x = 5;
                        boardSpaces[y][7].figure = {};
                    }
                }
                currnetFigure.isMoved = true;
            }

            // en pasan move
            if (currnetFigure.name === constants.PAWN && Math.abs(state.activeFigureCoordinates.x - x) === 1 && Math.abs(state.activeFigureCoordinates.y - y) === 1 && Object.keys(state.board.boardSpaces[y][x].figure).length === 0) {
                boardSpaces[state.activeFigureCoordinates.y][x].figure = {};
            }

            // pawn promotion
            if (currnetFigure.name === constants.PAWN && currnetFigure.finalPoint === y) {
                state.possibleMoves = { x, y, promotion: true, color: currnetFigure.color };
            }

            boardSpaces[y][x].figure = currnetFigure;
            boardSpaces[state.activeFigureCoordinates.y][state.activeFigureCoordinates.x].figure = {};
            state.lastMove = {
                fromX: state.activeFigureCoordinates.x,
                fromY: state.activeFigureCoordinates.y,
                toX: x,
                toY: y,
                figureName: currnetFigure.name,
            };

            currnetFigure.x = x;
            currnetFigure.y = y;

            if (currnetFigure.name === constants.KING) {
                if (currnetFigure.color === constants.BLACK) {
                    state.blackKing = { x, y };
                } else if (currnetFigure.color === constants.WHITE) {
                    state.whiteKing = { x, y };
                }
            }

            state.activeFigureCoordinates = { x: -1, y: -1 };
            state.possibleMoves = [];

            this.calculatePossibleMovesForAllFigures(state);

            if (state.board.whiteMovesCount === 0 || state.board.blackMovesCount === 0) {
                state.currnetTurn = '';
            }

            return state;
        });
    }

    promotionPawn(figure) {
        const { x, y, color } = this.state.promotionMove;
        let promotionFigure = {};
        if (figure === constants.QUEEN) {
            promotionFigure = figureFactory(constants.QUEEN, color, x, y);
        } else if (figure === constants.BISHOP) {
            promotionFigure = figureFactory(constants.BISHOP, color, x, y);
        } else if (figure === constants.KNIGHT) {
            promotionFigure = figureFactory(constants.KNIGHT, color, x, y);
        } else if (figure === constants.ROOK) {
            promotionFigure = figureFactory(constants.ROOK, color, x, y);
        }

        this.setState((state) => {
            const st = state;
            st.promotionMove = { x: -1, y: -1, promotion: false, color: '' };
            st.board.boardSpaces[y][x].figure = promotionFigure;
            return st;
        });
    }

    cleanBlackAndWhiteThreats(state) {
        for (let i = 0; i < state.board.boardSpaces.length; i++) {
            const row = state.board.boardSpaces[i];
            for (let j = 0; j < row.length; j++) {
                const currentSpace = row[j];
                currentSpace.whiteThreat = [];
                currentSpace.blackThreat = [];
            }
        }
    }

    calculateMoves(state, checkForColor) {
        for (const row of state.board.boardSpaces) {
            for (const space of row) {
                const currnetFigure = space.figure;
                if (Object.keys(currnetFigure).length > 0) {
                    currnetFigure.calculatePossibleMoves(state.board, state[`${currnetFigure.color}King`], state.lastMove, checkForColor);
                }
            }
        }
    }

    calculatePossibleMovesForAllFigures(state) {
        state.board.whiteMovesCount = 0;
        state.board.blackMovesCount = 0;
        this.cleanBlackAndWhiteThreats(state);
        this.calculateMoves(state, false);
        this.calculateMoves(state, true);
    }

    render() {
        return (
            <div className="chess-board">
                <Promotion
                    color={this.state.promotionMove.color}
                    promotionPawn={this.promotionPawn}
                    promotionMove={this.state.promotionMove.promotion}
                />
                {this.state.board.boardSpaces.map((row, y) => (
                    <div className="row" key={row[y].id + row[y].color}>
                        {row.map((currentSpace, x) => (
                            <Field
                                currentSpace={currentSpace}
                                key={currentSpace.id}
                                y={y}
                                x={x}
                                activeFigureCoordinates={this.state.activeFigureCoordinates}
                                setActiveFigure={this.setActiveFigure}
                                possibleMoves={this.state.possibleMoves}
                                moveTo={this.moveTo}
                                lastMove={this.state.lastMove}
                                currnetTurn={this.state.currnetTurn}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}
