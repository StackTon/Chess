import Figure from './Figure';
import constants from '../utils/constants';

export default class Queen extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = constants.QUEEN;
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
