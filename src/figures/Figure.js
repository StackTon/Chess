import utils from '../utils/utils';

export default class Figure {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.possibleMoves = [];
    }

    static canMoveToSpace({ board, x, y, color, checkForColor }) {
        const response = {
            canMoveToSpace: false,
            lastMove: false,
        };

        if (!utils.checkIfCordinatesAreValid(x, y)) {
            return response;
        }

        const { figure } = board.boardSpaces[y][x];

        if (checkForColor === true && !utils.checkForColorDifrence(figure.color, color)) {
            return response;
        }
        response.canMoveToSpace = true;
        if (Object.keys(figure).length !== 0) {
            response.lastMove = true;
            return response;
        }
        return response;
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
        let moves = this.figureMoves(board, checkForColor, king, lastMove);

        // check if the king is in check
        const kingCoordinates = king;
        const opositeColor = this.color === 'black' ? 'white' : 'black';
        const threatFigures = board.boardSpaces[kingCoordinates.y][kingCoordinates.x][`${opositeColor}Threat`];
        if (threatFigures.length === 1 && this.name !== 'King') {
            const threatFigureX = threatFigures[0].x;
            const threatFigureY = threatFigures[0].y;
            moves = moves.filter((move) => {
                if (threatFigures[0].name === 'Knight' || threatFigures[0].name === 'Pawn') {
                    return move.x === threatFigureX && move.y === threatFigureY;
                }
                let kingX = kingCoordinates.x;
                let kingY = kingCoordinates.y;
                for (let i = 1; i <= 8; i++) {
                    if (threatFigureX === kingCoordinates.x) { // check up and down
                        if (kingCoordinates.y > threatFigureY) { // down
                            kingY -= 1;
                        } else if (kingCoordinates.y < threatFigureY) { // up
                            kingY += 1;
                        }
                    } else if (threatFigureY === kingCoordinates.y) { // check rigth and left check
                        if (kingCoordinates.x > threatFigureX) { // left
                            kingX -= 1;
                        } else if (kingCoordinates.x < threatFigureX) { // rigth
                            kingX += 1;
                        }
                    } else if (threatFigureX - threatFigureY === kingCoordinates.x - kingCoordinates.y && threatFigureY - threatFigureX === kingCoordinates.y - kingCoordinates.x) { // check up left and right down diagonal
                        if (kingCoordinates.y > threatFigureY) { // up left
                            kingX -= 1;
                            kingY -= 1;
                        } else if (kingCoordinates.y < threatFigureY) { // right down
                            kingX += 1;
                            kingY += 1;
                        }
                    } else if (threatFigureX + threatFigureY === kingCoordinates.x + kingCoordinates.y) { // check up right and down left diagonal
                        if (kingCoordinates.y > threatFigureY) { // up right
                            kingX += 1;
                            kingY -= 1;
                        } else if (kingCoordinates.y < threatFigureY) { // down left
                            kingX -= 1;
                            kingY += 1;
                        }
                    }

                    const currentSpace = board.boardSpaces[kingY][kingX];

                    if (Object.keys(currentSpace.figure).length !== 0) {
                        return kingX === move.x && kingY === move.y;
                    } if (kingX === move.x && kingY === move.y) {
                        return true;
                    }
                }
                return false;
            });
        } else if (threatFigures.length === 2) {
            const possibleKingMoves = board.boardSpaces[kingCoordinates.y][kingCoordinates.x].figure.possibleMoves;
            if (possibleKingMoves.length === 0) {
                // TODO handle MATE
            }

            if (this.name !== 'King') {
                moves = [];
            }
        }

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

    bishopMoves(board, checkForColor) {
        const currentX = this.x;
        const currentY = this.y;

        const moves = [];

        let upLeftMove = true;
        let upRightMove = true;
        let downRightMove = true;
        let downLeftMove = true;

        for (let i = 1; i <= 8; i++) {
            // up left moves
            if (upLeftMove) {
                const upLeftY = currentY - i;
                const upLeftX = currentX - i;

                const response = this.constructor.canMoveToSpace({
                    board,
                    x: upLeftX,
                    y: upLeftY,
                    color: this.color,
                    checkForColor,
                });

                upLeftMove = response.canMoveToSpace;

                if (response.canMoveToSpace) {
                    moves.push({ x: upLeftX, y: upLeftY });
                    upLeftMove = !response.lastMove;
                }
            }

            // up right moves
            if (upRightMove) {
                const upRightY = currentY - i;
                const upRightX = currentX + i;

                const response = this.constructor.canMoveToSpace({
                    board,
                    x: upRightX,
                    y: upRightY,
                    color: this.color,
                    checkForColor,
                });

                upRightMove = response.canMoveToSpace;

                if (response.canMoveToSpace) {
                    moves.push({ x: upRightX, y: upRightY });
                    upRightMove = !response.lastMove;
                }
            }

            // down right moves
            if (downRightMove) {
                const downRightY = currentY + i;
                const downRightX = currentX + i;

                const response = this.constructor.canMoveToSpace({
                    board,
                    x: downRightX,
                    y: downRightY,
                    color: this.color,
                    checkForColor,
                });

                downRightMove = response.canMoveToSpace;

                if (response.canMoveToSpace) {
                    moves.push({ x: downRightX, y: downRightY });
                    downRightMove = !response.lastMove;
                }
            }

            // down left moves
            if (downLeftMove) {
                const downLeftY = currentY + i;
                const downLefttX = currentX - i;

                const response = this.constructor.canMoveToSpace({
                    board,
                    x: downLefttX,
                    y: downLeftY,
                    color: this.color,
                    checkForColor,
                });

                downLeftMove = response.canMoveToSpace;

                if (response.canMoveToSpace) {
                    moves.push({ x: downLefttX, y: downLeftY });
                    downLeftMove = !response.lastMove;
                }
            }

            if (!upLeftMove && !upRightMove && !downRightMove && !downLeftMove) {
                break;
            }
        }

        return moves;
    }

    rookMoves(board, checkForColor) {
        const currentX = this.x;
        const currentY = this.y;

        const moves = [];

        let upMove = true;
        let rightMove = true;
        let downMove = true;
        let leftMove = true;

        for (let i = 1; i <= 8; i++) {
            // up moves
            if (upMove) {
                const upY = currentY - i;
                const upX = currentX;

                const response = this.constructor.canMoveToSpace({
                    board,
                    x: upX,
                    y: upY,
                    color: this.color,
                    checkForColor,
                });

                upMove = response.canMoveToSpace;

                if (response.canMoveToSpace) {
                    moves.push({ x: upX, y: upY });
                    upMove = !response.lastMove;
                }
            }

            // right moves
            if (rightMove) {
                const rightY = currentY;
                const rightX = currentX + i;

                const response = this.constructor.canMoveToSpace({
                    board,
                    x: rightX,
                    y: rightY,
                    color: this.color,
                    checkForColor,
                });

                rightMove = response.canMoveToSpace;

                if (response.canMoveToSpace) {
                    moves.push({ x: rightX, y: rightY });
                    rightMove = !response.lastMove;
                }
            }

            // down moves
            if (downMove) {
                const downY = currentY + i;
                const downX = currentX;

                const response = this.constructor.canMoveToSpace({
                    board,
                    x: downX,
                    y: downY,
                    color: this.color,
                    checkForColor,
                });

                downMove = response.canMoveToSpace;

                if (response.canMoveToSpace) {
                    moves.push({ x: downX, y: downY });
                    downMove = !response.lastMove;
                }
            }

            // left moves
            if (leftMove) {
                const leftY = currentY;
                const leftX = currentX - i;

                const response = this.constructor.canMoveToSpace({
                    board,
                    x: leftX,
                    y: leftY,
                    color: this.color,
                    checkForColor,
                });

                leftMove = response.canMoveToSpace;

                if (response.canMoveToSpace) {
                    moves.push({ x: leftX, y: leftY });
                    leftMove = !response.lastMove;
                }
            }

            if (!upMove && !rightMove && !downMove && !leftMove) {
                break;
            }
        }

        return moves;
    }

    checkIfSpaceContainsFigure(board, x, y) {
        if (!utils.checkIfCordinatesAreValid(x, y)) {
            return false;
        }

        const { figure } = board.boardSpaces[y][x];

        if (Object.keys(figure).length === 0) {
            return false;
        }

        return true;
    }

    isThisSpaceThreaten(board, x, y) {
        const space = board.boardSpaces[y][x];

        if (this.color === 'black') {
            return space.whiteThreat.length > 0;
        }
        return space.blackThreat.length > 0;
    }
}
