import Figure from './Figure';

export default class Queen extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'Queen';
    }

    figureMoves(board, checkForColor = true, king) {
        const currentX = this.x;
        const currentY = this.y;

        const rookMoves = this.rookMoves(board, checkForColor);
        const bishopMoves = this.bishopMoves(board, checkForColor);

        const moves = [...rookMoves, ...bishopMoves];

        if (checkForColor) {
            const response = Figure.isPinned(board, king, currentX, currentY);
            return Figure.handerIsPinnedResponse(response, moves);
        }

        return moves;
    }
}
