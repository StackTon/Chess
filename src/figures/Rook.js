import Figure from './Figure';

export default class Rook extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'Rook';
        this.isMoved = false;
    }

    possibleMoves(board, checkForColor = true, king) {
        const moves = [];
        const currentX = this.x;
        const currentY = this.y;

        // up moves
        for (let i = currentY - 1; i >= 0; i--) {
            let currnetMove = super.canMoveToSpace({ board: board, x: currentX, y: i, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }

        // right moves
        for (let i = currentX + 1; i < 8; i++) {
            let currnetMove = super.canMoveToSpace({ board: board, x: i, y: currentY, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }

        // down moves
        for (let i = currentY + 1; i < 8; i++) {
            let currnetMove = super.canMoveToSpace({ board: board, x: currentX, y: i, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }

        // left moves
        for (let i = currentX - 1; i >= 0; i--) {
            let currnetMove = super.canMoveToSpace({ board: board, x: i, y: currentY, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }

        const response = super.isPinned(board, king, currentX, currentY);
        if (response.isPinned === false) {
            return moves;
        } else {
            return super.returnEqualElemetsFromTwoArrays(moves, response.possibleMoves);
        }
    }

    posibleTakeMoves(board, currentX, currentY) {
        return this.possibleMoves(board, currentX, currentY, false);
    }
}