import Figure from './Figure';

export default class Knight extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'Knight';
        this.isMoved = false;
    }

    figureMoves(board, checkForColor = true, king) {
        const moves = [];
        const currentX = this.x;
        const currentY = this.y;

        // up left move
        Figure.canMoveToSpace({
            board,
            x: currentX - 1,
            y: currentY - 2,
            color: this.color,
            moves,
            checkForColor,
        });

        // up right move
        Figure.canMoveToSpace({
            board,
            x: currentX + 1,
            y: currentY - 2,
            color: this.color,
            moves,
            checkForColor,
        });

        // right up move
        Figure.canMoveToSpace({
            board,
            x: currentX + 2,
            y: currentY - 1,
            color: this.color,
            moves,
            checkForColor,
        });

        // righy down move
        Figure.canMoveToSpace({
            board,
            x: currentX + 2,
            y: currentY + 1,
            color: this.color,
            moves,
            checkForColor,
        });

        // down left move
        Figure.canMoveToSpace({
            board,
            x: currentX + 1,
            y: currentY + 2,
            color: this.color,
            moves,
            checkForColor,
        });

        // down right move
        Figure.canMoveToSpace({
            board,
            x: currentX - 1,
            y: currentY + 2,
            color: this.color,
            moves,
            checkForColor,
        });

        // left down move
        Figure.canMoveToSpace({
            board,
            x: currentX - 2,
            y: currentY + 1,
            color: this.color,
            moves,
            checkForColor,
        });

        // left up move
        Figure.canMoveToSpace({
            board,
            x: currentX - 2,
            y: currentY - 1,
            color: this.color,
            moves,
            checkForColor,
        });

        if (checkForColor) {
            const response = Figure.isPinned(board, king, currentX, currentY);
            return Figure.handerIsPinnedResponse(response, moves);
        }

        return moves;
    }
}
