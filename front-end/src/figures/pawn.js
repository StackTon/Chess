import figure from './figure';
import utils from '../utils/utils';
import constants from '../utils/constants';

const pawn = Object.create(figure);

pawn.init = function init(color, x, y, finalPoint) {
    this.initFigure(color, x, y);
    this.name = constants.PAWN;
    this.finalPoint = finalPoint;
    this.isMoved = false;
};

pawn.figureMoves = function figureMoves(board, checkForColor = true, king, lastMove) {
    let addToY = 0;

    if (this.finalPoint === 0) {
        addToY = -1;
    } else {
        addToY = 1;
    }
    if (checkForColor) {
        return this.normalMoves(board, king, lastMove, addToY);
    }
    return this.takeMoves(addToY);
};

pawn.normalMoves = function normalMoves(board, king, lastMove, addToY) {
    const currentX = this.x;
    const currentY = this.y;
    const moves = [];
    // up move
    const upMove = this.canMoveToSpace({
        board,
        x: currentX,
        y: currentY + addToY,
        color: this.color,
        moves,
        frontMove: true,
    });
    if (upMove && this.isMoved === false) {
        // double up move
        this.canMoveToSpace({
            board,
            x: currentX,
            y: currentY + (addToY * 2),
            color: this.color,
            moves,
            frontMove: true,
        });
    }

    // left take move
    this.canMoveToSpace({
        board,
        x: currentX - 1,
        y: currentY + addToY,
        color: this.color,
        moves,
        sideMove: true,
    });

    // right take move
    this.canMoveToSpace({
        board,
        x: currentX + 1,
        y: currentY + addToY,
        color: this.color,
        moves,
        sideMove: true,
    });

    // anpasan
    const movesMade = Math.abs(lastMove.fromY - lastMove.toY);
    if (lastMove.figureName === 'Pawn' && movesMade === 2 && lastMove.toY === currentY) {
        if (lastMove.toX === currentX - 1) { // left en pasan
            this.canMoveToSpace({
                board,
                x: currentX - 1,
                y: currentY + addToY,
                color: this.color,
                moves,
                frontMove: true,
            });
        } else if (lastMove.toX === currentX + 1) { // right en pasan
            this.canMoveToSpace({
                board,
                x: currentX + 1,
                y: currentY + addToY,
                color: this.color,
                moves,
                frontMove: true,
            });
        }
    }

    const response = this.isPinned(board, king, currentX, currentY, this.color);
    return this.handerIsPinnedResponse(response, moves);
};

pawn.takeMoves = function takeMoves(addToY) {
    const currentX = this.x;
    const currentY = this.y;
    const moves = [];
    const x1 = currentX - 1;
    const y1 = currentY + addToY;

    const x2 = currentX + 1;
    const y2 = currentY + addToY;

    // up left
    if (utils.checkIfCordinatesAreValid(x1, y1)) {
        moves.push({ x: x1, y: y1 });
    }

    // up rigth
    if (utils.checkIfCordinatesAreValid(x2, y2)) {
        moves.push({ x: x2, y: y2 });
    }

    return moves;
};

pawn.canMoveToSpace = function canMoveToSpace({ board, x, y, color, moves, sideMove = false, frontMove = false }) {
    if (!utils.checkIfCordinatesAreValid(x, y)) {
        return false;
    }

    const currnetFigure = board.boardSpaces[y][x].figure;

    if (!utils.checkForColorDifrence(currnetFigure.color, color)) {
        return false;
    }

    if (Object.keys(currnetFigure).length !== 0 && sideMove === true) {
        moves.push({ x, y });
    } else if (Object.keys(currnetFigure).length === 0 && frontMove === true) {
        moves.push({ x, y });
        return true;
    }

    return false;
};

export default pawn;
