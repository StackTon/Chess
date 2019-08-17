import React, { Component } from 'react';

// classes
import Board from './bord/Board';
import Queen from './figures/Queen';
import Bishop from './figures/Bishop';
import Knight from './figures/Knight';
import Rook from './figures/Rook';

// components
import Field from './components/Field';
import Promotion from './components/Promotion';

import './App.css';

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
            currnetTurn: 'white',
        };

        this.setActiveFigure = this.setActiveFigure.bind(this);
        this.moveTo = this.moveTo.bind(this);
        this.clearActiveFigureAndPossibleMoves = this.clearActiveFigureAndPossibleMoves.bind(this);
        this.promotionPawn = this.promotionPawn.bind(this);
        this.cleanBlackAndWhiteThreats = this.cleanBlackAndWhiteThreats.bind(this);
        this.updateKingPosition = this.updateKingPosition.bind(this);
        this.calculatePossibleMovesForAllFigures = this.calculatePossibleMovesForAllFigures.bind(this);
        this.calculateMoves = this.calculateMoves.bind(this);
    }

    setActiveFigure(x, y) {
        if (this.state.activeFigureCoordinates.x === x && this.state.activeFigureCoordinates.y === y) {
            this.clearActiveFigureAndPossibleMoves();
        } else {
            const currnetFigure = this.state.board.boardSpaces[y][x].figure;
            let { possibleMoves } = currnetFigure;

            if (currnetFigure.name === 'King' && possibleMoves.length === 0) {
                // TODO check all other figures moves if they can't move it's stale mate
            }

            // check if the king is in check
            const kingCoordinates = this.state[`${currnetFigure.color}King`];
            const opositeColor = currnetFigure.color === 'black' ? 'white' : 'black';
            const threatFigures = this.state.board.boardSpaces[kingCoordinates.y][kingCoordinates.x][`${opositeColor}Threat`];
            if (threatFigures.length === 1 && currnetFigure.name !== 'King') {
                const threatFigureX = threatFigures[0].x;
                const threatFigureY = threatFigures[0].y;
                possibleMoves = possibleMoves.filter((move) => {
                    if (threatFigures[0].name === 'Knight' || threatFigures[0].name === 'Pawn') {
                        return move.x === threatFigureX && move.y === threatFigureY;
                    }
                    let kingX = kingCoordinates.x;
                    let kingY = kingCoordinates.y;
                    for (let i = 1; i <= 8; i++) {
                        if (threatFigureX === kingCoordinates.x) { // check up and down
                            if (kingCoordinates.y > threatFigureY) { // down
                                kingY -= 1;
                            } else if (kingCoordinates.y < threatFigureY) { // up
                                kingY += 1;
                            }
                        } else if (threatFigureY === kingCoordinates.y) { // check rigth and left check
                            if (kingCoordinates.x > threatFigureX) { // left
                                kingX -= 1;
                            } else if (kingCoordinates.x < threatFigureX) { // rigth
                                kingX += 1;
                            }
                        } else if (threatFigureX - threatFigureY === kingCoordinates.x - kingCoordinates.y && threatFigureY - threatFigureX === kingCoordinates.y - kingCoordinates.x) { // check up left and right down diagonal
                            if (kingCoordinates.y > threatFigureY) { // up left
                                kingX -= 1;
                                kingY -= 1;
                            } else if (kingCoordinates.y < threatFigureY) { // right down
                                kingX += 1;
                                kingY += 1;
                            }
                        } else if (threatFigureX + threatFigureY === kingCoordinates.x + kingCoordinates.y) { // check up right and down left diagonal
                            if (kingCoordinates.y > threatFigureY) { // up right
                                kingX += 1;
                                kingY -= 1;
                            } else if (kingCoordinates.y < threatFigureY) { // down left
                                kingX -= 1;
                                kingY += 1;
                            }
                        }

                        const currentSpace = this.state.board.boardSpaces[kingY][kingX];

                        if (Object.keys(currentSpace.figure).length !== 0) {
                            return kingX === move.x && kingY === move.y;
                        } if (kingX === move.x && kingY === move.y) {
                            return true;
                        }
                    }
                    return false;
                });
            } else if (threatFigures.length === 2) {
                const possibleKingMoves = this.state.board[kingCoordinates.y][kingCoordinates.x].figure.possibleMoves;
                if (possibleKingMoves.length === 0) {
                    // TODO handle MATE
                    this.setState({ currnetTurn: 'mate' });
                }

                if (currnetFigure !== 'King') {
                    possibleMoves = [];
                }
            }
            this.setState({ possibleMoves, activeFigureCoordinates: { x, y } });
        }
    }

    moveTo(x, y) {
        const currnetFigure = this.state.board.boardSpaces[this.state.activeFigureCoordinates.y][this.state.activeFigureCoordinates.x].figure;

        if (currnetFigure.color === 'white') {
            this.setState({ currnetTurn: 'black' });
        } else {
            this.setState({ currnetTurn: 'white' });
        }

        if (currnetFigure.isMoved === false) {
            if (currnetFigure.name === 'King') {
                if (x === 2) { // left castlig
                    this.setState((state) => {
                        const { boardSpaces } = state.board;
                        boardSpaces[y][3].figure = state.board.boardSpaces[y][0].figure;
                        boardSpaces[y][0].figure = {};
                        return boardSpaces;
                    });
                } else if (x === 6) { // right castlig
                    this.setState((state) => {
                        const { boardSpaces } = state.board;
                        boardSpaces[y][5].figure = state.board.boardSpaces[y][0].figure;
                        boardSpaces[y][7].figure = {};
                        return boardSpaces;
                    });
                }
            }
            currnetFigure.isMoved = true;
        }

        // en pasan move
        if (currnetFigure.name === 'Pawn' && Math.abs(this.state.activeFigureCoordinates.x - x) === 1 && Math.abs(this.state.activeFigureCoordinates.y - y) === 1 && Object.keys(this.state.board.boardSpaces[y][x].figure).length === 0) {
            this.setState((state) => {
                const { boardSpaces } = state.board;
                boardSpaces[state.activeFigureCoordinates.y][x].figure = {};
                return boardSpaces;
            });
        }

        // pawn promotion
        if (currnetFigure.name === 'Pawn' && currnetFigure.finalPoint === y) {
            this.setState({ promotionMove: { x, y, promotion: true, color: currnetFigure.color } });
        }

        this.setState((state) => ({
            lastMove: {
                fromX: state.activeFigureCoordinates.x,
                fromY: state.activeFigureCoordinates.y,
                toX: x,
                toY: y,
                figureName: currnetFigure.name,
            },
        }));


        this.setState((state) => {
            const { boardSpaces } = state.board;
            boardSpaces[y][x].figure = currnetFigure;
            boardSpaces[state.activeFigureCoordinates.y][state.activeFigureCoordinates.x].figure = {};
            return boardSpaces;
        });

        currnetFigure.x = x;
        currnetFigure.y = y;

        if (currnetFigure.name === 'King') {
            this.updateKingPosition(currnetFigure.color, x, y);
        }

        this.clearActiveFigureAndPossibleMoves();
    }

    promotionPawn(figure) {
        const { x, y, color } = this.state.promotionMove;
        let promotionFigure = {};
        if (figure === 'Queen') {
            promotionFigure = new Queen(color, x, y);
        } else if (figure === 'Bishop') {
            promotionFigure = new Bishop(color, x, y);
        } else if (figure === 'Knight') {
            promotionFigure = new Knight(color, x, y);
        } else if (figure === 'Rook') {
            promotionFigure = new Rook(color, x, y);
        }

        this.setState((state) => {
            const st = state;
            st.promotionMove = { x: -1, y: -1, promotion: false, color: '' };
            st.board.boardSpaces[y][x].figure = promotionFigure;
            return st;
        });
    }

    clearActiveFigureAndPossibleMoves() {
        this.setState({ activeFigureCoordinates: { x: -1, y: -1 }, possibleMoves: [] });
    }

    cleanBlackAndWhiteThreats() {
        for (let i = 0; i < this.state.board.boardSpaces.length; i++) {
            const row = this.state.board.boardSpaces[i];
            for (let j = 0; j < row.length; j++) {
                const currentSpace = row[j];
                currentSpace.whiteThreat = [];
                currentSpace.blackThreat = [];
            }
        }
    }

    calculateMoves(checkForColor) {
        for (const row of this.state.board.boardSpaces) {
            for (const space of row) {
                const currnetFigure = space.figure;
                if (Object.keys(currnetFigure).length > 0) {
                    currnetFigure.calculatePossibleMoves(this.state.board, this.state[`${currnetFigure.color}King`], this.state.lastMove, checkForColor);
                }
            }
        }
    }

    calculatePossibleMovesForAllFigures() {
        this.cleanBlackAndWhiteThreats();
        this.calculateMoves(false);
        this.calculateMoves(true);
    }

    updateKingPosition(color, x, y) {
        if (color === 'black') {
            this.setState({ blackKing: { x, y } });
        } else if (color === 'white') {
            this.setState({ whiteKing: { x, y } });
        }
    }

    render() {
        this.calculatePossibleMovesForAllFigures();
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
                {/* {console.log(this.state.board)} */}
            </div>
        );
    }
}
