import figure from './figure';
import constants from '../utils/constants';

const rook = Object.create(figure);

rook.init = function init(color, x, y) {
    this.initFigure(color, x, y);
    this.name = constants.ROOK;
    this.isMoved = false;
};

rook.figureMoves = function figureMoves(board, checkForColor, king) {
    const currentX = this.x;
    const currentY = this.y;

    const moves = this.rookMoves(board, checkForColor);

    if (checkForColor) {
        const response = this.isPinned(board, king, currentX, currentY, this.color);
        return this.handerIsPinnedResponse(response, moves);
    }

    return moves;
};

export default rook;
