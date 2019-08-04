import Figure from './Figure';

export default class Knight extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'Knight';
        this.isMoved = false;
    }

    possibleMoves(board, currentX, currentY, checkForColor = true, king) {
        let moves = [];

        // up left move
        super.canMoveToSpace({ board: board, x: currentX - 1, y: currentY - 2, color: this.color, moves: moves, checkForColor: checkForColor });

        // up right move
        super.canMoveToSpace({ board: board, x: currentX + 1, y: currentY - 2, color: this.color, moves: moves, checkForColor: checkForColor });

        // right up move
        super.canMoveToSpace({ board: board, x: currentX + 2, y: currentY - 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // righy down move
        super.canMoveToSpace({ board: board, x: currentX + 2, y: currentY + 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // down left move
        super.canMoveToSpace({ board: board, x: currentX + 1, y: currentY + 2, color: this.color, moves: moves, checkForColor: checkForColor });

        // down right move
        super.canMoveToSpace({ board: board, x: currentX - 1, y: currentY + 2, color: this.color, moves: moves, checkForColor: checkForColor });

        // left down move
        super.canMoveToSpace({ board: board, x: currentX - 2, y: currentY + 1, color: this.color, moves: moves, checkForColor: checkForColor });

        // left up move
        super.canMoveToSpace({ board: board, x: currentX - 2, y: currentY - 1, color: this.color, moves: moves, checkForColor: checkForColor });


        let checkIfKingIsInCheckAndMoves = true;
        if(king) {
            checkIfKingIsInCheckAndMoves = super.checkIfKingIsInCheckAfterMove(board, king, currentX, currentY);
        }
        if (checkIfKingIsInCheckAndMoves === true) {
            return moves;
        } else {
            return super.returnEqualElemetsFromTwoArrays(moves, checkIfKingIsInCheckAndMoves);
        }
    }

    posibleTakeMoves(board, currentX, currentY) {
        return this.possibleMoves(board, currentX, currentY, false);
    }
}