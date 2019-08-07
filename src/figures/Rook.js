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

        this.rookMoves(board, checkForColor, moves);

        const response = this.isPinned(board, king, currentX, currentY);
        return this.handerIsPinnedResponse(response, moves);
    }

    posibleTakeMoves(board, currentX, currentY) {
        return this.possibleMoves(board, currentX, currentY, false);
    }
}