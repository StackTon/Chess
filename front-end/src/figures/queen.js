import figure from './figure';
import constants from '../utils/constants';

const queen = Object.create(figure);

queen.init = function init(color, x, y) {
    this.initFigure(color, x, y);
    this.name = constants.QUEEN;
};

queen.figureMoves = function figureMoves(board, checkForColor = true, king) {
    const currentX = this.x;
    const currentY = this.y;

    const rookMoves = this.rookMoves(board, checkForColor);
    const bishopMoves = this.bishopMoves(board, checkForColor);

    const moves = [...rookMoves, ...bishopMoves];

    if (checkForColor) {
        const response = this.isPinned(board, king, currentX, currentY, this.color);
        return this.handerIsPinnedResponse(response, moves);
    }

    return moves;
};

export default queen;
