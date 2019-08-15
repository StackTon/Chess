import Figure from './Figure';

export default class Bishop extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'Bishop';
    }

    figureMoves(board, checkForColor = true, king) {
        const moves = [];
        const currentX = this.x;
        const currentY = this.y;

        this.bishopMoves(board, checkForColor, moves, super.canMoveToSpace);

        if (checkForColor) {
            const response = Figure.isPinned(board, king, currentX, currentY);
            return Figure.handerIsPinnedResponse(response, moves);
        }

        return moves;
    }
}
