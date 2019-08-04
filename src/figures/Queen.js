import Figure from './Figure';

import Rook from './Rook';
import Bishop from './Bishop';

export default class Queen extends Figure {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'Queen';
    }

    possibleMoves(board, checkForColor = true, king) {
        const moves = [];
        const currentX = this.x;
        const currentY = this.y;

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

        let upLeftMove = true;
        let upRightMove = true;
        let downRightMove = true;
        let downLeftMove = true;


        for (let i = 1; i <= 8; i++) {
            // up left moves
            if (upLeftMove) {
                upLeftMove = super.canMoveToSpace({ board: board, x: currentX - i, y: currentY - i, color: this.color, moves: moves, checkForColor: checkForColor });
            }

            // up right moves
            if (upRightMove) {
                upRightMove = super.canMoveToSpace({ board: board, x: currentX + i, y: currentY - i, color: this.color, moves: moves, checkForColor: checkForColor });
            }

            // down right moves
            if (downRightMove) {
                downRightMove = super.canMoveToSpace({ board: board, x: currentX + i, y: currentY + i, color: this.color, moves: moves, checkForColor: checkForColor });
            }

            // down left moves
            if (downLeftMove) {
                downLeftMove = super.canMoveToSpace({ board: board, x: currentX - i, y: currentY + i, color: this.color, moves: moves, checkForColor: checkForColor });
            }

            if (!upLeftMove && !upRightMove && !downLeftMove && !downRightMove) {
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