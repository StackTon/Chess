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
        this.canMoveToSpace({ board: board, x: currentX - 1, y: currentY - 2, color: this.color, moves: moves, checkForColor: checkForColor });

        // up right move
        this.canMoveToSpace({ board: board, x: currentX + 1, y: currentY - 2, color: this.color, moves: moves, checkForColor: checkForColor });

        // right up move
        this.canMoveToSpace({ board: board, x: currentX + 2, y: currentY - 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // righy down move
        this.canMoveToSpace({ board: board, x: currentX + 2, y: currentY + 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // down left move
        this.canMoveToSpace({ board: board, x: currentX + 1, y: currentY + 2, color: this.color, moves: moves, checkForColor: checkForColor });

        // down right move
        this.canMoveToSpace({ board: board, x: currentX - 1, y: currentY + 2, color: this.color, moves: moves, checkForColor: checkForColor });

        // left down move
        this.canMoveToSpace({ board: board, x: currentX - 2, y: currentY + 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // left up move
        this.canMoveToSpace({ board: board, x: currentX - 2, y: currentY - 1, color: this.color, moves: moves, checkForColor: checkForColor });


        if(checkForColor) {
            const response = this.isPinned(board, king, currentX, currentY);
            return this.handerIsPinnedResponse(response, moves);
        }
        
        return moves;
    }
}