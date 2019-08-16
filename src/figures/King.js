import Figure from './Figure';

import utils from '../utils/utils';

export default class King extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'King';
        this.isMoved = false;
        this.isThreaten = false;
    }

    figureMoves(board, checkForColor = true) {
        const moves = [];
        const currentX = this.x;
        const currentY = this.y;

        // up left
        this.canMoveToSpace({
            board,
            x: currentX - 1,
            y: currentY - 1,
            color: this.color,
            moves,
            checkForColor,
        });

        // up
        this.canMoveToSpace({
            board,
            x: currentX,
            y: currentY - 1,
            color: this.color,
            moves,
            checkForColor,
        });

        // up right
        this.canMoveToSpace({
            board,
            x: currentX + 1,
            y: currentY - 1,
            color: this.color,
            moves,
            checkForColor,
        });

        // right
        const rightMove = this.canMoveToSpace({
            board,
            x: currentX + 1,
            y: currentY,
            color: this.color,
            moves,
            checkForColor,
        });

        if (this.isMoved === false && rightMove === true && Object.keys(board.boardSpaces[currentY][6].figure).length === 0) {
            const rightRook = board.boardSpaces[currentY][7].figure;

            // right castlig
            if (rightRook.name === 'Rook' && rightRook.isMoved === false) {
                this.canMoveToSpace({
                    board,
                    x: currentX + 2,
                    y: currentY,
                    color: this.color,
                    moves,
                    checkForColor,
                });
            }
        }

        // down right
        this.canMoveToSpace({
            board,
            x: currentX + 1,
            y: currentY + 1,
            color: this.color,
            moves,
            checkForColor,
        });

        // down
        this.canMoveToSpace({
            board,
            x: currentX,
            y: currentY + 1,
            color: this.color,
            moves,
            checkForColor,
        });

        // down left
        this.canMoveToSpace({
            board,
            x: currentX - 1,
            y: currentY + 1,
            color: this.color,
            moves,
            checkForColor,
        });

        // left
        const leftMove = this.canMoveToSpace({
            board,
            x: currentX - 1,
            y: currentY,
            color: this.color,
            moves,
            checkForColor,
        });
        if (this.isMoved === false && leftMove === true && Object.keys(board.boardSpaces[currentY][1].figure).length === 0) {
            const leftRook = board.boardSpaces[currentY][0].figure;
            // left castlig
            if (leftRook.name === 'Rook' && leftRook.isMoved === false) {
                this.canMoveToSpace({
                    board,
                    x: currentX - 2,
                    y: currentY,
                    color: this.color,
                    moves,
                    checkForColor,
                });
            }
        }

        return moves;
    }

    canMoveToSpace({ board, x, y, color, moves, checkForColor: checkForColor = true }) {
        if (!utils.checkIfCordinatesAreValid(x, y)) {
            return false;
        }

        const { figure } = board.boardSpaces[y][x];

        if (checkForColor === true && !utils.checkForColorDifrence(figure.color, color)) {
            return false;
        }

        if (this.isThisSpaceThreaten(board, x, y)) {
            return false;
        }

        if (Object.keys(figure).length !== 0) {
            moves.push({ x, y });
            return false;
        }
        moves.push({ x, y });
        return true;
    }
}
