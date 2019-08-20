import Space from './Space';

// figures
import Pawn from '../figures/Pawn';
import Knight from '../figures/Knight';
import Bishop from '../figures/Bishop';
import Rook from '../figures/Rook';
import Queen from '../figures/Queen';
import King from '../figures/King';

import constatns from '../utils/constants';

export default class Board {
    constructor() {
        // super(this);
        this.boardSpaces = [];
        this.whiteMovesCount = 0;
        this.blackMovesCount = 0;
        for (let row = 0; row < 8; row++) {
            const rowSpaces = [];

            for (let col = 0; col < 8; col++) {
                let spaceColor;
                if ((row + col) % 2 === 0) {
                    spaceColor = constatns.WHITE;
                } else {
                    spaceColor = constatns.BLACK;
                }

                let newFigire;
                let figureColor;

                if (row === 0) {
                    figureColor = constatns.BLACK;
                } else if (row === 7) {
                    figureColor = constatns.WHITE;
                }

                if (row === 0 || row === 7) { // black
                    if (col === 0 || col === 7) {
                        newFigire = new Rook(figureColor, col, row);
                    } else if (col === 1 || col === 6) {
                        newFigire = new Knight(figureColor, col, row);
                    } else if (col === 2 || col === 5) {
                        newFigire = new Bishop(figureColor, col, row);
                    } else if (col === 3) {
                        newFigire = new Queen(figureColor, col, row);
                    } else if (col === 4) {
                        newFigire = new King(figureColor, col, row);
                    }
                } else if (row === 1) {
                    newFigire = new Pawn(constatns.BLACK, col, row, 7);
                } else if (row === 6) { // white
                    newFigire = new Pawn(constatns.WHITE, col, row, 0);
                } else {
                    newFigire = {};
                }

                rowSpaces.push(new Space(row + col, spaceColor, newFigire));
            }
            this.boardSpaces.push(rowSpaces);
        }
    }

    resetMovesCount() {
        this.whiteMovesCount = 0;
        this.blackMovesCount = 0;
    }
}
