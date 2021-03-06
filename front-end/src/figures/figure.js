import utils from '../utils/utils';
import constants from '../utils/constants';

export default {
    initFigure(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.possibleMoves = [];
    },

    canMoveToSpace({ board, x, y, color, checkForColor }) {
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
    },

    isPinned(board, king, fromX, fromY, color) {
        const response = {
            isPinned: false,
            possibleMoves: [],
        };

        const request = [king.x, king.y, fromX, fromY];
        if (!utils.checkIfTwoPointsAreOnTheSameLine(...request)) {
            return response;
        }

        const movesBetweenFigureAndKing = utils.getAllPointsBetweenTwoPoints(...request);
        let isFigureOnKingLine = false;

        for (let i = 0; i < movesBetweenFigureAndKing.length; i++) {
            const spaceCoordinates = movesBetweenFigureAndKing[i];
            const currnetFigire = board.boardSpaces[spaceCoordinates.y][spaceCoordinates.x].figure;
            if (Object.keys(currnetFigire).length !== 0) {
                if (currnetFigire.x === fromX && currnetFigire.y === fromY) {
                    isFigureOnKingLine = true;
                } else {
                    return response;
                }
            }
        }

        if (isFigureOnKingLine) {
            const opositeColor = color === constants.BLACK ? constants.WHITE : constants.BLACK;
            const threats = board.boardSpaces[fromY][fromX][`${opositeColor}Threat`];
            if (threats.length === 0) {
                return response;
            }
            for (let i = 0; i < threats.length; i++) {
                const figure = threats[i];
                if (figure.name === constants.QUEEN
                        || figure.name === constants.ROOK
                        || figure.name === constants.BISHOP) {
                    const req = [king.x, king.y, figure.x, figure.y];
                    if (utils.checkIfTwoPointsAreOnTheSameLine(...req)) {
                        response.isPinned = true;
                        response.possibleMoves = utils.getAllPointsBetweenTwoPoints(...req);
                        return response;
                    }
                }
            }
        }

        return response;
    },

    handerIsPinnedResponse(response, moves) {
        if (response.isPinned === false) {
            return moves;
        }
        return utils.returnEqualElemetsFromTwoArrays(
            moves,
            response.possibleMoves,
        );
    },

    calculatePossibleMoves(board, king, lastMove, checkForColor) {
        let moves = this.figureMoves(board, checkForColor, king, lastMove);

        // check if the king is in check
        const { x, y } = king;
        const opositeColor = this.color === constants.BLACK ? constants.WHITE : constants.BLACK;
        const threatFigures = board.boardSpaces[y][x][`${opositeColor}Threat`];
        if (threatFigures.length === 1 && this.name !== constants.KING) {
            const threatFigure = threatFigures[0];
            let stopCheckMoves = [];
            const threatFigureName = threatFigures[0].name;

            if (threatFigureName === constants.KNIGHT || threatFigureName === constants.PAWN) {
                stopCheckMoves.push({ x: threatFigure.x, y: threatFigure.y });
            } else {
                const request = [x, y, threatFigure.x, threatFigure.y];
                stopCheckMoves = utils.getAllPointsBetweenTwoPoints(...request);
            }

            moves = utils.returnEqualElemetsFromTwoArrays(moves, stopCheckMoves);
        }

        if (checkForColor) {
            this.possibleMoves = moves;
            board[`${this.color}MovesCount`] += moves.length;
        } else {
            for (const move of moves) {
                const space = board.boardSpaces[move.y][move.x];
                if (this.color === constants.BLACK) {
                    space.blackThreat.push(this);
                } else if (this.color === constants.WHITE) {
                    space.whiteThreat.push(this);
                }
            }
        }
    },

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

                const response = this.canMoveToSpace({
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

                const response = this.canMoveToSpace({
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

                const response = this.canMoveToSpace({
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

                const response = this.canMoveToSpace({
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
    },

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

                const response = this.canMoveToSpace({
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

                const response = this.canMoveToSpace({
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

                const response = this.canMoveToSpace({
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

                const response = this.canMoveToSpace({
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
    },

    checkIfSpaceContainsFigure(board, x, y) {
        if (!utils.checkIfCordinatesAreValid(x, y)) {
            return false;
        }

        const { figure } = board.boardSpaces[y][x];

        if (Object.keys(figure).length === 0) {
            return false;
        }

        return true;
    },

    isThisSpaceThreaten(board, x, y) {
        const space = board.boardSpaces[y][x];

        if (this.color === constants.BLACK) {
            return space.whiteThreat.length > 0;
        }
        return space.blackThreat.length > 0;
    },
};
