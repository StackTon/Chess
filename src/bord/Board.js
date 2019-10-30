import Space from './Space';
import figureFactory from '../utils/figureFactory';
import constatns from '../utils/constants';

export default class Board {
    constructor() {
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

                if (row === 0 || row === 7) {
                    if (col === 0 || col === 7) {
                        newFigire = figureFactory(constatns.ROOK, figureColor, col, row);
                    } else if (col === 1 || col === 6) {
                        newFigire = figureFactory(constatns.KNIGHT, figureColor, col, row);
                    } else if (col === 2 || col === 5) {
                        newFigire = figureFactory(constatns.BISHOP, figureColor, col, row);
                    } else if (col === 3) {
                        newFigire = figureFactory(constatns.QUEEN, figureColor, col, row);
                    } else if (col === 4) {
                        newFigire = figureFactory(constatns.KING, figureColor, col, row);
                    }
                } else if (row === 1) {
                    newFigire = figureFactory(constatns.PAWN, constatns.BLACK, col, row, 7);
                } else if (row === 6) {
                    newFigire = figureFactory(constatns.PAWN, constatns.WHITE, col, row, 0);
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
