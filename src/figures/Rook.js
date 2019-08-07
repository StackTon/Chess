import Figure from './Figure';

export default class Rook extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'Rook';
        this.isMoved = false;
    }

    figureMoves(board, checkForColor = true, king) {
        const moves = [];
        const currentX = this.x;
        const currentY = this.y;

        this.rookMoves(board, checkForColor, moves);

        if(checkForColor) {
            const response = this.isPinned(board, king, currentX, currentY);
            return this.handerIsPinnedResponse(response, moves);
        }
        
        return moves;
    }
}