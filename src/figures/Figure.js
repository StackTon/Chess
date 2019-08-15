import utils from '../utils/utils';

export default class Figure {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.possibleMoves = [];
    }

    static canMoveToSpace({ board, x, y, color, moves, checkForColor }) {
        if (!utils.checkIfCordinatesAreValid(x, y)) {
            return false;
        }

        const { figure } = board.boardSpaces[y][x];

        if (checkForColor === true && !utils.checkForColorDifrence(figure.color, color)) {
            return false;
        }

        if (Object.keys(figure).length !== 0) {
            moves.push({ x, y });
            return false;
        }
        moves.push({ x, y });
        return true;
    }

    static isPinned(board, king, fromX, fromY) {
        const response = {
            isPinned: false,
            possibleMoves: [],
        };
        const currentFigureColor = board.boardSpaces[fromY][fromX].figure.color;
        const possibleMoves = [];
        let isStraightMove = false;

        for (let i = 1; i <= 8; i++) {
            let { x, y } = king;
            if (fromX === king.x) {
                // check up and down
                if (king.y > fromY) {
                    // down
                    y -= i;
                } else if (king.y < fromY) {
                    // up
                    y += i;
                }
            } else if (fromY === king.y) {
                // check rigth and left check
                if (king.x > fromX) {
                    // left
                    x -= i;
                } else if (king.x < fromX) {
                    // rigth
                    x += i;
                }
            } else if (fromX - fromY === king.x - king.y && fromY - fromX === king.y - king.x) {
                // check up left and right down diagonal
                if (king.y > fromY) {
                    // up left
                    x -= i;
                    y -= i;
                } else if (king.y < fromY) {
                    // right down
                    x += i;
                    y += i;
                }
            } else if (fromX + fromY === king.x + king.y) {
                // check up right and down left diagonal
                if (king.y > fromY) {
                    // up right
                    x += i;
                    y -= i;
                } else if (king.y < fromY) {
                    // down left
                    x -= i;
                    y += i;
                }
            } else {
                return response;
            }

            if (!utils.checkIfCordinatesAreValid(y, x)) {
                return response;
            }

            const currnetSpace = board.boardSpaces[y][x];

            if (Object.keys(currnetSpace.figure).length !== 0) {
                if (x !== fromX || y !== fromY) {
                    return response;
                }
                break;
            }
        }

        for (let i = 1; i <= 8; i++) {
            let currnetSpace;

            if (fromX === king.x) {
                // check up and down
                isStraightMove = true;
                if (king.y > fromY && utils.checkIfCordinatesAreValid(fromY - i, fromX)) {
                    // down
                    currnetSpace = board.boardSpaces[fromY - i][fromX];
                    possibleMoves.push({ y: fromY - i, x: fromX });
                } else if (king.y < fromY && utils.checkIfCordinatesAreValid(fromY + i, fromX)) {
                    // up
                    currnetSpace = board.boardSpaces[fromY + i][fromX];
                    possibleMoves.push({ y: fromY + i, x: fromX });
                }
            } else if (fromY === king.y) {
                // check rigth and left check
                isStraightMove = true;
                if (king.x > fromX && utils.checkIfCordinatesAreValid(fromY, fromX - i)) {
                    // left
                    currnetSpace = board.boardSpaces[fromY][fromX - i];
                    possibleMoves.push({ y: fromY, x: fromX - i });
                } else if (king.x < fromX && utils.checkIfCordinatesAreValid(fromY, fromX + i)) {
                    // rigth
                    currnetSpace = board.boardSpaces[fromY][fromX + i];
                    possibleMoves.push({ y: fromY, x: fromX + i });
                }
            } else if (fromX - fromY === king.x - king.y && fromY - fromX === king.y - king.x) {
                // check up left and right down diagonal
                if (king.y < fromY && utils.checkIfCordinatesAreValid(fromY + i, fromX + i)) {
                    // up left
                    currnetSpace = board.boardSpaces[fromY + i][fromX + i];
                    possibleMoves.push({ y: fromY + i, x: fromX + i });
                } else if (king.y > fromY && utils.checkIfCordinatesAreValid(fromY - i, fromX - i)) {
                    // down right
                    currnetSpace = board.boardSpaces[fromY - i][fromX - i];
                    possibleMoves.push({ y: fromY - i, x: fromX - i });
                }
            } else if (fromX + fromY === king.x + king.y) {
                // check up right and down left diagonal
                if (king.y > fromY && utils.checkIfCordinatesAreValid(fromY - i, fromX + i)) {
                    // up right
                    currnetSpace = board.boardSpaces[fromY - i][fromX + i];
                    possibleMoves.push({ y: fromY - i, x: fromX + i });
                } else if (king.y < fromY && utils.checkIfCordinatesAreValid(fromY + i, fromX - i)) {
                    // down left
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
                    response.possibleMoves = possibleMoves;
                    return response;
                }
                if (!isStraightMove && (currnetSpace.figure.name === 'Queen' || currnetSpace.figure.name === 'Bishop') && currentFigureColor !== currnetSpace.figure.color) {
                    response.isPinned = true;
                    response.possibleMoves = possibleMoves;
                    return response;
                }
                return response;
            }

            const { lastX, lastY } = possibleMoves[possibleMoves.length - 1];
            if (lastX === 7 || lastX === 0 || lastY === 7 || lastY === 0) {
                return response;
            }
        }

        return true;
    }

    static handerIsPinnedResponse(response, moves) {
        if (response.isPinned === false) {
            return moves;
        }
        return utils.returnEqualElemetsFromTwoArrays(
            moves,
            response.possibleMoves,
        );
    }

    calculatePossibleMoves(board, king, lastMove, checkForColor) {
        const moves = this.figureMoves(board, checkForColor, king, lastMove);

        if (checkForColor) {
            this.possibleMoves = moves;
        } else {
            for (const move of moves) {
                const space = board.boardSpaces[move.y][move.x];
                if (this.color === 'black') {
                    space.blackThreat.push(this);
                } else if (this.color === 'white') {
                    space.whiteThreat.push(this);
                }
            }
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
                upLeftMove = this.constructor.canMoveToSpace({
                    board,
                    x: currentX - i,
                    y: currentY - i,
                    color: this.color,
                    moves,
                    checkForColor,
                });
            }

            // up right moves
            if (upRightMove) {
                upRightMove = this.constructor.canMoveToSpace({
                    board,
                    x: currentX + i,
                    y: currentY - i,
                    color: this.color,
                    moves,
                    checkForColor,
                });
            }

            // down right moves
            if (downRightMove) {
                downRightMove = this.constructor.canMoveToSpace({
                    board,
                    x: currentX + i,
                    y: currentY + i,
                    color: this.color,
                    moves,
                    checkForColor,
                });
            }

            // down left moves
            if (downLeftMove) {
                downLeftMove = this.constructor.canMoveToSpace({
                    board,
                    x: currentX - i,
                    y: currentY + i,
                    color: this.color,
                    moves,
                    checkForColor,
                });
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
            const currnetMove = this.constructor.canMoveToSpace({
                board,
                x: currentX,
                y: i,
                color: this.color,
                moves,
                checkForColor,
            });
            if (!currnetMove) {
                break;
            }
        }

        // right moves
        for (let i = currentX + 1; i < 8; i++) {
            const currnetMove = this.constructor.canMoveToSpace({
                board,
                x: i,
                y: currentY,
                color: this.color,
                moves,
                checkForColor,
            });
            if (!currnetMove) {
                break;
            }
        }

        // down moves
        for (let i = currentY + 1; i < 8; i++) {
            const currnetMove = this.constructor.canMoveToSpace({
                board,
                x: currentX,
                y: i,
                color: this.color,
                moves,
                checkForColor,
            });
            if (!currnetMove) {
                break;
            }
        }

        // left moves
        for (let i = currentX - 1; i >= 0; i--) {
            const currnetMove = this.constructor.canMoveToSpace({
                board,
                x: i,
                y: currentY,
                color: this.color,
                moves,
                checkForColor,
            });
            if (!currnetMove) {
                break;
            }
        }
    }

    isThisSpaceThreaten(board, x, y) {
        const space = board.boardSpaces[y][x];

        if (this.color === 'black') {
            return space.whiteThreat.length > 0;
        }
        return space.blackThreat.length > 0;
    }
}
