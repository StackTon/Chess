import Figure from './Figure';
import utils from '../utils/utils';
import constants from '../utils/constants';

export default class Pawn extends Figure {
    constructor(color, x, y, finalPoint) {
        super(color, x, y);
        this.name = constants.PAWN;
        this.finalPoint = finalPoint;
        this.isMoved = false;
    }

    figureMoves(board, checkForColor = true, king, lastMove) {
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
    }

    normalMoves(board, king, lastMove, addToY) {
        const currentX = this.x;
        const currentY = this.y;
        const moves = [];
        // up move
        const upMove = this.constructor.canMoveToSpace({
            board,
            x: currentX,
            y: currentY + addToY,
            color: this.color,
            moves,
            frontMove: true,
        });
        if (upMove && this.isMoved === false) {
            // double up move
            this.constructor.canMoveToSpace({
                board,
                x: currentX,
                y: currentY + (addToY * 2),
                color: this.color,
                moves,
                frontMove: true,
            });
        }

        // left take move
        this.constructor.canMoveToSpace({
            board,
            x: currentX - 1,
            y: currentY + addToY,
            color: this.color,
            moves,
            sideMove: true,
        });

        // right take move
        this.constructor.canMoveToSpace({
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
                this.constructor.canMoveToSpace({
                    board,
                    x: currentX - 1,
                    y: currentY + addToY,
                    color: this.color,
                    moves,
                    frontMove: true,
                });
            } else if (lastMove.toX === currentX + 1) { // right en pasan
                this.constructor.canMoveToSpace({
                    board,
                    x: currentX + 1,
                    y: currentY + addToY,
                    color: this.color,
                    moves,
                    frontMove: true,
                });
            }
        }

        const response = Figure.isPinned(board, king, currentX, currentY);
        return Figure.handerIsPinnedResponse(response, moves);
    }

    takeMoves(addToY) {
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
    }

    static canMoveToSpace({ board, x, y, color, moves, sideMove = false, frontMove = false }) {
        if (!utils.checkIfCordinatesAreValid(x, y)) {
            return false;
        }

        const { figure } = board.boardSpaces[y][x];

        if (!utils.checkForColorDifrence(figure.color, color)) {
            return false;
        }

        if (Object.keys(figure).length !== 0 && sideMove === true) {
            moves.push({ x, y });
        } else if (Object.keys(figure).length === 0 && frontMove === true) {
            moves.push({ x, y });
            return true;
        }

        return false;
    }
}
