import figure from './figure';
import constants from '../utils/constants';

const bishop = Object.create(figure);

bishop.init = function init(color, x, y) {
    this.initFigure(color, x, y);
    this.name = constants.BISHOP;
};

bishop.figureMoves = function figureMoves(board, checkForColor = true, king) {
    const currentX = this.x;
    const currentY = this.y;

    const moves = this.bishopMoves(board, checkForColor);

    if (checkForColor) {
        const response = this.isPinned(board, king, currentX, currentY, this.color);
        return this.handerIsPinnedResponse(response, moves);
    }

    return moves;
};

export default bishop;
