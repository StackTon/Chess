import Figure from './Figure';

import utils from '../utils/utils';

export default class Pawn extends Figure {
    constructor(color, x, y, finalPoint) {
        super(color, x, y);
        this.name = 'Pawn';
        this.finalPoint = finalPoint;
        this.isMoved = false;
    }

    possibleMoves(board, checkForColor, king, lastMove) {
        const moves = [];
        const currentX = this.x;
        const currentY = this.y;

        let addToY = 0;

        if (this.finalPoint === 0) {
            addToY = -1;
        } else {
            addToY = 1;
        }

        // up move
        let upMove = this.canMoveToSpace({ board: board, x: currentX, y: currentY + addToY, color: this.color, moves: moves, frontMove: true });
        if (upMove && this.isMoved === false) {
            // double up move
            this.canMoveToSpace({ board: board, x: currentX, y: currentY + (addToY * 2), color: this.color, moves: moves, frontMove: true });
        }

        // left take move
        this.canMoveToSpace({ board: board, x: currentX - 1, y: currentY + addToY, color: this.color, moves: moves, sideMove: true });

        // right take move
        this.canMoveToSpace({ board: board, x: currentX + 1, y: currentY + addToY, color: this.color, moves: moves, sideMove: true });

        // anpasan
        let movesMade = Math.abs(lastMove.fromY - lastMove.toY);
        if (lastMove.figureName === 'Pawn' && movesMade === 2 && lastMove.toY === currentY) {
            if (lastMove.toX === currentX - 1) { // left en pasan
                this.canMoveToSpace({ board: board, x: currentX - 1, y: currentY + addToY, color: this.color, moves: moves, frontMove: true });
            } else if (lastMove.toX === currentX + 1) { // right en pasan
                this.canMoveToSpace({ board: board, x: currentX + 1, y: currentY + addToY, color: this.color, moves: moves, frontMove: true });
            }
        }

        const response = this.isPinned(board, king, currentX, currentY);
        return this.handerIsPinnedResponse(response, moves);
    }

    canMoveToSpace({ board: board, x: x, y: y, color: color, moves: moves, sideMove: sideMove = false, frontMove: frontMove = false }) {
        if (!utils.checkIfCordinatesAreValid(x, y)) {
            return false;
        }

        let figure = board.boardSpaces[y][x].figure;

        if (!utils.checkForColorDifrence(figure.color, color)) {
            return false;
        }

        if (Object.keys(figure).length !== 0 && sideMove === true) {
            moves.push({ x: x, y: y });
        } else if (Object.keys(figure).length === 0 && frontMove === true) {
            moves.push({ x: x, y: y });
            return true;
        }

        return false;
    }

    posibleTakeMoves(board, currentX, currentY) {
        const moves = [];

        let addToY = 0;

        if (this.finalPoint === 0) {
            addToY = -1;
        } else {
            addToY = 1;
        }

        let x1 = currentX - 1;
        let y1 = currentY + addToY;

        let x2 = currentX + 1;
        let y2 = currentY + addToY;

        if (utils.checkIfCordinatesAreValid(x1, y1)) {
            moves.push({ x: x1, y: y1 });
        }

        if (utils.checkIfCordinatesAreValid(x2, y2)) {
            moves.push({ x: x2, y: y2 });
        }

        return moves;
    }
}