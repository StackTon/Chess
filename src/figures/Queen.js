import Figure from './Figure';

export default class Queen extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'Queen';
    }

    figureMoves(board, checkForColor = true, king) {
        const moves = [];
        const currentX = this.x;
        const currentY = this.y;

        this.rookMoves(board, checkForColor, moves);
        this.bishopMoves(board, checkForColor, moves);

        if (checkForColor) {
            const response = Figure.isPinned(board, king, currentX, currentY);
            return Figure.handerIsPinnedResponse(response, moves);
        }

        return moves;
    }
}
