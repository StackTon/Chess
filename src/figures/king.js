import figure from './figure';
import utils from '../utils/utils';
import constants from '../utils/constants';

const king = Object.create(figure);

king.init = function init(color, x, y) {
    this.initFigure(color, x, y);
    this.name = constants.KING;
    this.isMoved = false;
    this.isThreaten = false;
};

king.figureMoves = function figureMoves(board, checkForColor = true) {
    const moves = [];
    const currentX = this.x;
    const currentY = this.y;

    // up left
    this.canMoveToSpace({
        board,
        x: currentX - 1,
        y: currentY - 1,
        color: this.color,
        moves,
        checkForColor,
    });

    // up
    this.canMoveToSpace({
        board,
        x: currentX,
        y: currentY - 1,
        color: this.color,
        moves,
        checkForColor,
    });

    // up right
    this.canMoveToSpace({
        board,
        x: currentX + 1,
        y: currentY - 1,
        color: this.color,
        moves,
        checkForColor,
    });

    // right
    const rightMove = this.canMoveToSpace({
        board,
        x: currentX + 1,
        y: currentY,
        color: this.color,
        moves,
        checkForColor,
    });

    // down right
    this.canMoveToSpace({
        board,
        x: currentX + 1,
        y: currentY + 1,
        color: this.color,
        moves,
        checkForColor,
    });

    // down
    this.canMoveToSpace({
        board,
        x: currentX,
        y: currentY + 1,
        color: this.color,
        moves,
        checkForColor,
    });

    // down left
    this.canMoveToSpace({
        board,
        x: currentX - 1,
        y: currentY + 1,
        color: this.color,
        moves,
        checkForColor,
    });

    // left
    const leftMove = this.canMoveToSpace({
        board,
        x: currentX - 1,
        y: currentY,
        color: this.color,
        moves,
        checkForColor,
    });

    if (this.isMoved === false) {
        if (rightMove && Object.keys(board.boardSpaces[currentY][6].figure).length === 0) {
            const rightRook = board.boardSpaces[currentY][7].figure;

            // right castlig
            if (rightRook.name === 'Rook' && rightRook.isMoved === false) {
                this.canMoveToSpace({
                    board,
                    x: currentX + 2,
                    y: currentY,
                    color: this.color,
                    moves,
                    checkForColor,
                });
            }
        }

        if (leftMove && Object.keys(board.boardSpaces[currentY][1].figure).length === 0) {
            const leftRook = board.boardSpaces[currentY][0].figure;

            // left castlig
            if (leftRook.name === 'Rook' && leftRook.isMoved === false) {
                this.canMoveToSpace({
                    board,
                    x: currentX - 2,
                    y: currentY,
                    color: this.color,
                    moves,
                    checkForColor,
                });
            }
        }
    }

    return moves;
};

king.canMoveToSpace = function canMoveToSpace({ board, x, y, color, moves, checkForColor = true }) {
    if (!utils.checkIfCordinatesAreValid(x, y)) {
        return false;
    }

    const opositeColor = this.color === constants.BLACK ? constants.WHITE : constants.BLACK;
    const kingsThrets = board.boardSpaces[this.y][this.x][`${opositeColor}Threat`];

    if (kingsThrets.length > 0) {
        for (let i = 0; i < kingsThrets.length; i++) {
            const currentFigure = kingsThrets[i].figure;
            if (currentFigure.x !== x || currentFigure.y !== y) {
                if (currentFigure.name !== constants.KNIGHT || currentFigure.name !== constants.PAWN) {
                    if (utils.checkIfTwoPointsAreOnTheSameLine(x, y, currentFigure.x, currentFigure.y)) {
                        return false;
                    }
                }
            }
        }
    }

    const currentFigure = board.boardSpaces[y][x].figure;

    if (checkForColor === true && !utils.checkForColorDifrence(currentFigure.color, color)) {
        return false;
    }

    if (this.isThisSpaceThreaten(board, x, y)) {
        return false;
    }

    if (Object.keys(currentFigure).length !== 0) {
        moves.push({ x, y });
        return false;
    }
    moves.push({ x, y });
    return true;
};

export default king;
