import Figure from './Figure';
import constants from '../utils/constants';

export default class Rook extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = constants.ROOK;
        this.isMoved = false;
    }

    figureMoves(board, checkForColor, king) {
        const currentX = this.x;
        const currentY = this.y;

        const moves = this.rookMoves(board, checkForColor);

        if (checkForColor) {
            const response = Figure.isPinned(board, king, currentX, currentY, this.color);
            return Figure.handerIsPinnedResponse(response, moves);
        }

        return moves;
    }
}
