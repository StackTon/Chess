import Space from './Space';

// figures
import Pawn from '../figures/Pawn';
import Knight from '../figures/Knight';
import Bishop from '../figures/Bishop';
import Rook from '../figures/Rook';
import Queen from '../figures/Queen';
import King from '../figures/King';

export default class Board {
    constructor() {
        // super(this);
        this.boardSpaces = [];
        for (let row = 0; row < 8; row++) {
            const rowSpaces = [];

            for (let col = 0; col < 8; col++) {
                let spaceColor;
                if ((row + col) % 2 === 0) {
                    spaceColor = 'white';
                } else {
                    spaceColor = 'black';
                }

                let newFigire;

                let figureColor;

                if (row === 0) {
                    figureColor = 'black';
                } else if (row === 7) {
                    figureColor = 'white';
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
                    newFigire = new Pawn('black', col, row, 7);
                } else if (row === 6) { // white
                    newFigire = new Pawn('white', col, row, 0);
                } else {
                    newFigire = {};
                }

                rowSpaces.push(new Space(spaceColor, newFigire));
            }
            this.boardSpaces.push(rowSpaces);
        }
    }
}
