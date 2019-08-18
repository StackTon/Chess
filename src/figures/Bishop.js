import Figure from './Figure';
import constants from '../utils/constants';

export default class Bishop extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = constants.BISHOP;
    }

    figureMoves(board, checkForColor = true, king) {
        const currentX = this.x;
        const currentY = this.y;

        const moves = this.bishopMoves(board, checkForColor);

        if (checkForColor) {
            const response = Figure.isPinned(board, king, currentX, currentY);
            return Figure.handerIsPinnedResponse(response, moves);
        }

        return moves;
    }
}
