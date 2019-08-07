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
        this.canMoveToSpace({ board: board, x: currentX - 1, y: currentY - 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // up
        this.canMoveToSpace({ board: board, x: currentX, y: currentY - 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // up right
        this.canMoveToSpace({ board: board, x: currentX + 1, y: currentY - 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // right
        let rightMove = this.canMoveToSpace({ board: board, x: currentX + 1, y: currentY, color: this.color, moves: moves, checkForColor: checkForColor });

        if (this.isMoved === false && rightMove === true && Object.keys(board.boardSpaces[currentY][6].figure).length === 0) {
            let rightRook = board.boardSpaces[currentY][7].figure;

            // right castlig
            if (rightRook.name === 'Rook' && rightRook.isMoved === false) {
                this.canMoveToSpace({ board: board, x: currentX + 2, y: currentY, color: this.color, moves: moves, checkForColor: checkForColor });
            }
        }

        // down right
        this.canMoveToSpace({ board: board, x: currentX + 1, y: currentY + 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // down
        this.canMoveToSpace({ board: board, x: currentX, y: currentY + 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // down left
        this.canMoveToSpace({ board: board, x: currentX - 1, y: currentY + 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // left
        let leftMove = this.canMoveToSpace({ board: board, x: currentX - 1, y: currentY, color: this.color, moves: moves, checkForColor: checkForColor });
        if (this.isMoved === false && leftMove === true && Object.keys(board.boardSpaces[currentY][1].figure).length === 0) {
            let leftRook = board.boardSpaces[currentY][0].figure;
            // left castlig
            if (leftRook.name === 'Rook' && leftRook.isMoved === false) {
                this.canMoveToSpace({ board: board, x: currentX - 2, y: currentY, color: this.color, moves: moves, checkForColor: checkForColor });
            }
        }

        return moves;
    }

    canMoveToSpace({ board: board, x: x, y: y, color: color, moves: moves, checkForColor: checkForColor = true }) {
        if (!utils.checkIfCordinatesAreValid(x, y)) {
            return false;
        }

        let figure = board.boardSpaces[y][x].figure;

        if (checkForColor === true && !utils.checkForColorDifrence(figure.color, color)) {
            return false;
        }

        if (this.isThisSpaceThreaten(board, x, y)) {
            return false;
        }

        if (Object.keys(figure).length !== 0) {
            moves.push({ x: x, y: y });
            return false;
        } else {
            moves.push({ x: x, y: y });
            return true;
        }
    }
}