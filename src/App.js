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
                x: '',
                y: ''
            },
            possibleMoves: [],
            lastMove: {
                fromX: '',
                fromY: '',
                toX: '',
                toY: '',
                figureName: ''
            },
            promotionMove: {
                x: '',
                y: '',
                promotion: false,
                color: ''
            },
            whiteKing: {
                x: 4,
                y: 7
            },
            blackKing: {
                x: 4,
                y: 0
            },
            currnetTurn: 'white'
        }

        this.setActiveFigure = this.setActiveFigure.bind(this);
        this.moveTo = this.moveTo.bind(this);
        this.clearActiveFigureAndPossibleMoves = this.clearActiveFigureAndPossibleMoves.bind(this);
        this.promotionPawn = this.promotionPawn.bind(this);
        this.cleanBlackAndWhiteThreats = this.cleanBlackAndWhiteThreats.bind(this);
        this.updateKingPosition = this.updateKingPosition.bind(this);
    }

    setActiveFigure(x, y) {
        if (this.state.activeFigureCoordinates.x === x && this.state.activeFigureCoordinates.y === y) {
            this.clearActiveFigureAndPossibleMoves();
        } else {
            let currnetFigure = this.state.board.boardSpaces[y][x].figure;
            let possibleMoves = currnetFigure.possibleMoves;

            if (currnetFigure.name === 'King' && possibleMoves.length === 0) {
                // TODO check all other figures moves if they can't move it's stale mate
            }

            // check if the king is in check
            let kingCoordinates = this.state[currnetFigure.color + 'King'];
            let opositeColor = currnetFigure.color === 'black' ? 'white' : 'black';
            let threatFigures = this.state.board.boardSpaces[kingCoordinates.y][kingCoordinates.x][opositeColor + 'Threat'];
            if (threatFigures.length === 1 && currnetFigure.name !== 'King') {
                const threatFigureX = threatFigures[0].x;
                const threatFigureY = threatFigures[0].y;
                possibleMoves = possibleMoves.filter(move => {
                    if (threatFigures[0].name === 'Knight' || threatFigures[0].name === 'Pawn') {
                        return move.x === threatFigureX && move.y === threatFigureY;
                    } else {
                        let x = kingCoordinates.x;
                        let y = kingCoordinates.y;
                        for (let i = 1; i <= 8; i++) {
                            if (threatFigureX === kingCoordinates.x) { // check up and down 
                                if (kingCoordinates.y > threatFigureY) { // down
                                    y -= 1;
                                } else if (kingCoordinates.y < threatFigureY) { // up
                                    y += 1;
                                }
                            } else if (threatFigureY === kingCoordinates.y) { // check rigth and left check
                                if (kingCoordinates.x > threatFigureX) { // left
                                    x -= 1;
                                } else if (kingCoordinates.x < threatFigureX) { // rigth
                                    x += 1
                                }
                            } else if (threatFigureX - threatFigureY === kingCoordinates.x - kingCoordinates.y && threatFigureY - threatFigureX === kingCoordinates.y - kingCoordinates.x) { // check up left and right down diagonal
                                if (kingCoordinates.y > threatFigureY) { // up left
                                    x -= 1;
                                    y -= 1;
                                } else if (kingCoordinates.y < threatFigureY) { // right down
                                    x += 1;
                                    y += 1;
                                }
                            } else if (threatFigureX + threatFigureY === kingCoordinates.x + kingCoordinates.y) { // check up right and down left diagonal
                                if (kingCoordinates.y > threatFigureY) { // up right
                                    x += 1;
                                    y -= 1;
                                } else if (kingCoordinates.y < threatFigureY) { // down left
                                    x -= 1;
                                    y += 1;
                                }
                            }

                            let currnetSpace = this.state.board.boardSpaces[y][x];

                            if (Object.keys(currnetSpace.figure).length !== 0) {
                                return x === move.x && y === move.y;
                            } else if(x === move.x && y === move.y) {
                                return true;
                            }
                        }
                        return false;
                    }
                });
            } else if (threatFigures.length === 2) {
                let possibleKingMoves = this.state.board[kingCoordinates.y][kingCoordinates.x].figure.possibleMoves;
                if (possibleKingMoves.length === 0) {
                    // TODO handle MATE
                    this.setState({ currnetTurn: 'mate' });
                }

                if (currnetFigure !== 'King') {
                    possibleMoves = [];
                }
            }
            this.setState({ possibleMoves: possibleMoves, activeFigureCoordinates: { x, y } });
        }
    }

    moveTo(x, y) {
        let currnetFigure = this.state.board.boardSpaces[this.state.activeFigureCoordinates.y][this.state.activeFigureCoordinates.x].figure;

        if (currnetFigure.color === 'white') {
            this.setState({ currnetTurn: 'black' });
        } else {
            this.setState({ currnetTurn: 'white' });
        }

        if (currnetFigure.isMoved === false) {
            if (currnetFigure.name === 'King') {
                if (x === 2) { // left castlig
                    this.state.board.boardSpaces[y][3].figure = this.state.board.boardSpaces[y][0].figure;
                    this.state.board.boardSpaces[y][0].figure = {};

                } else if (x === 6) { // right castlig
                    this.state.board.boardSpaces[y][5].figure = this.state.board.boardSpaces[y][0].figure;
                    this.state.board.boardSpaces[y][7].figure = {};
                }
            }
            currnetFigure.isMoved = true;
        }

        // en pasan move
        if (currnetFigure.name === 'Pawn' && Math.abs(this.state.activeFigureCoordinates.x - x) === 1 && Math.abs(this.state.activeFigureCoordinates.y - y) === 1 && Object.keys(this.state.board.boardSpaces[y][x].figure).length === 0) {
            this.state.board.boardSpaces[this.state.activeFigureCoordinates.y][x].figure = {};
        }

        // pawn promotion
        if (currnetFigure.name === 'Pawn' && currnetFigure.finalPoint === y) {
            this.setState({ promotionMove: { x: x, y: y, promotion: true, color: currnetFigure.color } });
        }

        this.setState({ lastMove: { fromX: this.state.activeFigureCoordinates.x, fromY: this.state.activeFigureCoordinates.y, toX: x, toY: y, figureName: currnetFigure.name } })

        this.state.board.boardSpaces[y][x].figure = currnetFigure;

        this.state.board.boardSpaces[this.state.activeFigureCoordinates.y][this.state.activeFigureCoordinates.x].figure = {};

        currnetFigure.x = x;
        currnetFigure.y = y;

        if (currnetFigure.name === 'King') {
            this.updateKingPosition(currnetFigure.color, x, y);
        }

        this.clearActiveFigureAndPossibleMoves();
    }

    promotionPawn(figure) {
        const color = this.state.promotionMove.color;
        const x = this.state.promotionMove.x;
        const y = this.state.promotionMove.y;
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

        this.state.board.boardSpaces[y][x].figure = promotionFigure;

        this.setState({ promotionMove: { x: '', y: '', promotion: false, color: '' } });
    }

    clearActiveFigureAndPossibleMoves() {
        this.setState({ activeFigureCoordinates: { x: '', y: '' }, possibleMoves: [] });
    }

    cleanBlackAndWhiteThreats() {
        for (let i = 0; i < this.state.board.boardSpaces.length; i++) {
            let row = this.state.board.boardSpaces[i];
            for (let j = 0; j < row.length; j++) {
                const currentSpace = row[j];
                currentSpace.whiteThreat = [];
                currentSpace.blackThreat = [];
            }
        }
    }

    updateKingPosition(color, x, y) {
        if (color === 'black') {
            this.setState({ blackKing: { x: x, y: y } });
        } else if (color === 'white') {
            this.setState({ whiteKing: { x: x, y: y } });
        }
    }

    render() {
        this.cleanBlackAndWhiteThreats();
        return (
            <div className="chess-board">
                <Promotion color={this.state.promotionMove.color} promotionPawn={this.promotionPawn} promotionMove={this.state.promotionMove.promotion} />
                {this.state.board.boardSpaces.map((row, y) => {
                    return (
                        <div className="row" key={y}>
                            {row.map((currnetSpace, x) => {
                                let currnetFigure = currnetSpace.figure;
                                if (Object.keys(currnetFigure).length > 0) {
                                    currnetFigure.calculatePossibleMoves(this.state.board, this.state[currnetFigure.color + 'King'], this.state.lastMove);
                                }

                                return <Field
                                    currnetSpace={currnetSpace}
                                    key={y + x}
                                    y={y}
                                    x={x}
                                    activeFigureCoordinates={this.state.activeFigureCoordinates}
                                    setActiveFigure={this.setActiveFigure}
                                    possibleMoves={this.state.possibleMoves}
                                    moveTo={this.moveTo}
                                    lastMove={this.state.lastMove}
                                    currnetTurn={this.state.currnetTurn}
                                />
                            })}
                        </div>
                    );
                })}
                {/* {console.log(this.state.board)} */}
            </div>
        );
    }
}