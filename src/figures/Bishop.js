import Figure from './Figure';

export default class Bishop extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'Bishop';
    }

    possibleMoves(board, checkForColor = true, king) {
        const moves = [];
        const currentX = this.x;
        const currentY = this.y;

        let upLeftMove = true;
        let upRightMove = true;
        let downRightMove = true;
        let downLeftMove = true;

        for (let i = 1; i <= 8; i++) {
            // up left moves
            if (upLeftMove) {
                upLeftMove = super.canMoveToSpace({ board: board, x: currentX - i, y: currentY - i, color: this.color, moves: moves, checkForColor: checkForColor });
            }

            // up right moves
            if (upRightMove) {
                upRightMove = super.canMoveToSpace({ board: board, x: currentX + i, y: currentY - i, color: this.color, moves: moves, checkForColor: checkForColor });
            }

            // down right moves
            if (downRightMove) {
                downRightMove = super.canMoveToSpace({ board: board, x: currentX + i, y: currentY + i, color: this.color, moves: moves, checkForColor: checkForColor });
            }

            // down left moves
            if (downLeftMove) {
                downLeftMove = super.canMoveToSpace({ board: board, x: currentX - i, y: currentY + i, color: this.color, moves: moves, checkForColor: checkForColor });
            }
        }

        let isPinned = false;
        if(king) {
            isPinned = super.isPinned(board, king, currentX, currentY);
        }
        if (isPinned === false) {
            return moves;
        } else {
            return super.returnEqualElemetsFromTwoArrays(moves, isPinned);
        }
    }

    posibleTakeMoves(board, currentX, currentY) {
        return this.possibleMoves(board, currentX, currentY, false);
    }
}