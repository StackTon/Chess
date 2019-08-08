import utils from '../utils/utils';

export default class Figure {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.possibleMoves = [];
    }

    canMoveToSpace({ board: board, x: x, y: y, color: color, moves: moves, checkForColor: checkForColor = true }) {
        if (!utils.checkIfCordinatesAreValid(x, y)) {
            return false;
        }

        let figure = board.boardSpaces[y][x].figure;

        if (checkForColor === true && !utils.checkForColorDifrence(figure.color, color)) {
            return false;
        }

        if (Object.keys(figure).length !== 0) {
            moves.push({ x: x, y: y });
            return false;
        } else {
            moves.push({ x: x, y: y });
            return true;
        }
    }

    isPinned(board, king, fromX, fromY) {
        const response = {
            isPinned: false,
            possibleMoves: []
        };
        let currentFigureColor = board.boardSpaces[fromY][fromX].figure.color;
        let possibleMoves = [];
        let isStraightMove = false;

        for (let i = 1; i <= 8; i++) {
            let x = king.x;
            let y = king.y;
            if (fromX === king.x) { // check up and down 
                if (king.y > fromY) { // down
                    y -= i;
                } else if (king.y < fromY) { // up
                    y += i;
                }
            } else if (fromY === king.y) { // check rigth and left check
                if (king.x > fromX) { // left
                    x -= i;
                } else if (king.x < fromX) { // rigth
                    x += i
                }
            } else if (fromX - fromY === king.x - king.y && fromY - fromX === king.y - king.x) { // check up left and right down diagonal
                if (king.y > fromY) { // up left
                    x -= i;
                    y -= i;
                } else if (king.y < fromY) { // right down
                    x += i;
                    y += i;
                }
            } else if (fromX + fromY === king.x + king.y) { // check up right and down left diagonal
                if (king.y > fromY) { // up right
                    x += i;
                    y -= i;
                } else if (king.y < fromY) { // down left
                    x -= i;
                    y += i;
                }
            } else {
                return response;
            }

            let currnetSpace = board.boardSpaces[y][x];

            if (Object.keys(currnetSpace.figure).length !== 0) {
                if (x !== fromX || y !== fromY) {
                    return response;
                } else {
                    break;
                }
            }
        }

        for (let i = 1; i <= 8; i++) {
            let currnetSpace;

            if (fromX === king.x) { // check up and down 
                isStraightMove = true;
                if (king.y > fromY && utils.checkIfCordinatesAreValid(fromY - i, fromX)) { // down
                    currnetSpace = board.boardSpaces[fromY - i][fromX];
                    possibleMoves.push({ y: fromY - i, x: fromX });
                } else if (king.y < fromY && utils.checkIfCordinatesAreValid(fromY + i, fromX)) { // up
                    currnetSpace = board.boardSpaces[fromY + i][fromX];
                    possibleMoves.push({ y: fromY + i, x: fromX });
                }
            } else if (fromY === king.y) { // check rigth and left check
                isStraightMove = true;
                if (king.x > fromX && utils.checkIfCordinatesAreValid(fromY, fromX - i)) { // left
                    currnetSpace = board.boardSpaces[fromY][fromX - i];
                    possibleMoves.push({ y: fromY, x: fromX - i });
                } else if (king.x < fromX && utils.checkIfCordinatesAreValid(fromY, fromX + i)) { // rigth
                    currnetSpace = board.boardSpaces[fromY][fromX + i];
                    possibleMoves.push({ y: fromY, x: fromX + i });
                }
            } else if (fromX - fromY === king.x - king.y && fromY - fromX === king.y - king.x) { // check up left and right down diagonal
                if (king.y < fromY && utils.checkIfCordinatesAreValid(fromY + i, fromX + i)) { // up left
                    currnetSpace = board.boardSpaces[fromY + i][fromX + i];
                    possibleMoves.push({ y: fromY + i, x: fromX + i });
                } else if (king.y > fromY && utils.checkIfCordinatesAreValid(fromY - i, fromX - i)) { // down right
                    currnetSpace = board.boardSpaces[fromY - i][fromX - i];
                    possibleMoves.push({ y: fromY - i, x: fromX - i });
                }
            } else if (fromX + fromY === king.x + king.y) { // check up right and down left diagonal
                if (king.y > fromY && utils.checkIfCordinatesAreValid(fromY - i, fromX + i)) { // up right
                    currnetSpace = board.boardSpaces[fromY - i][fromX + i];
                    possibleMoves.push({ y: fromY - i, x: fromX + i });
                } else if (king.y < fromY && utils.checkIfCordinatesAreValid(fromY + i, fromX - i)) { // down left
                    currnetSpace = board.boardSpaces[fromY + i][fromX - i];
                    possibleMoves.push({ y: fromY + i, x: fromX - i });
                }
            } else {
                return response;
            }

            if (currnetSpace === undefined) {
                return response;
            }

            if (Object.keys(currnetSpace.figure).length !== 0) {
                if (isStraightMove && (currnetSpace.figure.name === 'Queen' || currnetSpace.figure.name === 'Rook') && currentFigureColor !== currnetSpace.figure.color) {
                    response.isPinned = true;
                    response.possibleMoves = possibleMoves
                    return response;
                } else if (!isStraightMove && (currnetSpace.figure.name === 'Queen' || currnetSpace.figure.name === 'Bishop') && currentFigureColor !== currnetSpace.figure.color) {
                    response.isPinned = true;
                    response.possibleMoves = possibleMoves
                    return response;
                } else {
                    return response;
                }
            }

            let lastX = possibleMoves[possibleMoves.length - 1].x;
            let lastY = possibleMoves[possibleMoves.length - 1].y;

            if (lastX === 7 || lastX === 0 || lastY === 7 || lastY === 0) {
                return response;
            }
        }
    }

    calculatePossibleMoves(board, king, lastMove, checkForColor) {
        let moves = this.figureMoves(board, checkForColor, king, lastMove);

        if (checkForColor) {
            this.possibleMoves = moves;
        } else {
            for (const move of moves) {
                let space = board.boardSpaces[move.y][move.x];
                if (this.color === 'black') {
                    space.blackThreat.push(this);
                } else if (this.color === 'white') {
                    space.whiteThreat.push(this);
                }
            }
        }
    }

    handerIsPinnedResponse(response, moves) {
        if (response.isPinned === false) {
            return moves;
        } else {
            return utils.returnEqualElemetsFromTwoArrays(moves, response.possibleMoves);
        }
    }

    bishopMoves(board, checkForColor, moves) {
        const currentX = this.x;
        const currentY = this.y;

        let upLeftMove = true;
        let upRightMove = true;
        let downRightMove = true;
        let downLeftMove = true;

        for (let i = 1; i <= 8; i++) {
            // up left moves
            if (upLeftMove) {
                upLeftMove = this.canMoveToSpace({ board: board, x: currentX - i, y: currentY - i, color: this.color, moves: moves, checkForColor: checkForColor });
            }

            // up right moves
            if (upRightMove) {
                upRightMove = this.canMoveToSpace({ board: board, x: currentX + i, y: currentY - i, color: this.color, moves: moves, checkForColor: checkForColor });
            }

            // down right moves
            if (downRightMove) {
                downRightMove = this.canMoveToSpace({ board: board, x: currentX + i, y: currentY + i, color: this.color, moves: moves, checkForColor: checkForColor });
            }

            // down left moves
            if (downLeftMove) {
                downLeftMove = this.canMoveToSpace({ board: board, x: currentX - i, y: currentY + i, color: this.color, moves: moves, checkForColor: checkForColor });
            }

            if (!upLeftMove && !upRightMove && !downRightMove && !downLeftMove) {
                break;
            }
        }
    }

    rookMoves(board, checkForColor, moves) {
        const currentX = this.x;
        const currentY = this.y;

        // up moves
        for (let i = currentY - 1; i >= 0; i--) {
            let currnetMove = this.canMoveToSpace({ board: board, x: currentX, y: i, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }

        // right moves
        for (let i = currentX + 1; i < 8; i++) {
            let currnetMove = this.canMoveToSpace({ board: board, x: i, y: currentY, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }

        // down moves
        for (let i = currentY + 1; i < 8; i++) {
            let currnetMove = this.canMoveToSpace({ board: board, x: currentX, y: i, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }

        // left moves
        for (let i = currentX - 1; i >= 0; i--) {
            let currnetMove = this.canMoveToSpace({ board: board, x: i, y: currentY, color: this.color, moves: moves, checkForColor: checkForColor });
            if (!currnetMove) {
                break;
            }
        }
    }

    isThisSpaceThreaten(board, x, y) {
        let space = board.boardSpaces[y][x];

        if (this.color === 'black') {
            return space.whiteThreat.length > 0;
        } else if (this.color === 'white') {
            return space.blackThreat.length > 0;
        }
    }
}