import figure from './figure';
import constants from '../utils/constants';

const knight = Object.create(figure);

knight.init = function init(color, x, y) {
    this.initFigure(color, x, y);
    this.name = constants.KNIGHT;
    this.isMoved = false;
};

knight.figureMoves = function figureMoves(board, checkForColor = true, king) {
    const moves = [];
    const currentX = this.x;
    const currentY = this.y;

    const requset = {
        board,
        x: currentX,
        y: currentY,
        color: this.color,
        checkForColor,
    };

    const knightMoves = [
        { x: -1, y: -2 },
        { x: 1, y: -2 },
        { x: 2, y: -1 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
        { x: -1, y: 2 },
        { x: -2, y: 1 },
        { x: -2, y: -1 },
    ];

    for (const { x, y } of knightMoves) {
        this.canMoveToSpaceRequest({
            requset,
            moves,
            x,
            y,
        });
    }

    if (checkForColor) {
        const response = this.isPinned(board, king, currentX, currentY, this.color);
        return this.handerIsPinnedResponse(response, moves);
    }

    return moves;
};

knight.canMoveToSpaceRequest = function canMoveToSpaceRequest({ requset, moves, x, y }) {
    const req = requset;
    req.x = this.x + x;
    req.y = this.y + y;
    if (this.canMoveToSpace(req).canMoveToSpace) {
        moves.push({ x: req.x, y: req.y });
    }
};

export default knight;
