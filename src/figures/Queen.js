import Figure from './Figure';

import Rook from './Rook';
import Bishop from './Bishop';
import utils from '../utils/utils';

export default class Queen extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'Queen';
    }

    possibleMoves(board, checkForColor = true, king) {
        const moves = [];
        const currentX = this.x;
        const currentY = this.y;

        this.rookMoves(board, checkForColor, moves);
        this.bishopMoves(board, checkForColor, moves);

        const response = this.isPinned(board, king, currentX, currentY);
        return this.handerIsPinnedResponse(response, moves);
    }

    posibleTakeMoves(board, currentX, currentY) {
        return this.possibleMoves(board, currentX, currentY, false);
    }
}