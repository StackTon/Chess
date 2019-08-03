import Figure from './Figure';

export default class Rook extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'Rook';
        this.isMoved = false;
    }

    possibleMoves(board, currentX, currentY, checkForColor = true, king) {
        let moves = [];

        // up moves
        for (let i = currentY - 1; i >= 0; i--) {
            let currnetMove = super.canMoveToSpace({ board: board, x: currentX, y: i, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }

        // right moves
        for (let i = currentX + 1; i < 8; i++) {
            let currnetMove = super.canMoveToSpace({ board: board, x: i, y: currentY, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }

        // down moves
        for (let i = currentY + 1; i < 8; i++) {
            let currnetMove = super.canMoveToSpace({ board: board, x: currentX, y: i, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }

        // left moves
        for (let i = currentX - 1; i >= 0; i--) {
            let currnetMove = super.canMoveToSpace({ board: board, x: i, y: currentY, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }

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