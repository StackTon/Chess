import Figure from './Figure';
import constants from '../utils/constants';

export default class Knight extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = constants.KNIGHT;
        this.isMoved = false;
    }

    figureMoves(board, checkForColor = true, king) {
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
            const response = Figure.isPinned(board, king, currentX, currentY);
            return Figure.handerIsPinnedResponse(response, moves);
        }

        return moves;
    }

    canMoveToSpaceRequest({ requset, moves, x, y }) {
        const req = requset;
        req.x = this.x + x;
        req.y = this.y + y;
        if (Figure.canMoveToSpace(req).canMoveToSpace) {
            moves.push({ x: req.x, y: req.y });
        }
    }
}
