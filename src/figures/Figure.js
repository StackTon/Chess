export default class Figure {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }

    checkIfCordinatesAreValid(x, y) {
        if (x > 7 || y > 7 || x < 0 || y < 0) {
            return false;
        } else {
            return true;
        }
    }

    checkForColorDifrence(color1, color2) {
        if (color1 === color2) {
            return false;
        } else {
            return true;
        }
    }

    canMoveToSpace({ board: board, x: x, y: y, color: color, moves: moves, checkForColor: checkForColor = true }) {
        if (!this.checkIfCordinatesAreValid(x, y)) {
            return false;
        }

        let figure = board.boardSpaces[y][x].figure;

        if (checkForColor === true && !this.checkForColorDifrence(figure.color, color)) {
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

    checkIfKingIsInCheckAfterMove(board, king, fromX, fromY) {
        let currentFigureColor = board.boardSpaces[fromY][fromX].figure.color;
        let possibleMoves = [];
        let isStraightMove = false;

        for (let i = 1; i <= 8; i++) {
            let x = king.x;
            let y = king.y;
            if (fromX === king.x) { // check up and down 
                if (king.y > fromY) { // down
                    y -= i;
                } else if(king.y < fromY) { // up
                    y += i;
                }
            } else if (fromY === king.y) { // check rigth and left check
                if (king.x > fromX) { // left
                    x -= i;
                } else if(king.x < fromX) { // rigth
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
                return true;
            }

            let currnetSpace = board.boardSpaces[y][x];

            if (Object.keys(currnetSpace.figure).length !== 0) {
                if (x !== fromX || y !== fromY) {
                    return true;
                } else {
                    break;
                }
            }
        }

        for (let i = 1; i <= 8; i++) {
            let currnetSpace;

            if (fromX === king.x) { // check up and down 
                isStraightMove = true;
                if (king.y > fromY && this.checkIfCordinatesAreValid(fromY - i, fromX)) { // down
                    currnetSpace = board.boardSpaces[fromY - i][fromX];
                    possibleMoves.push({ x: fromX, y: fromY - i });
                } else if (king.y < fromY && this.checkIfCordinatesAreValid(fromY + i, fromX)) { // up
                    currnetSpace = board.boardSpaces[fromY + i][fromX];
                    possibleMoves.push({ x: fromX, y: fromY + i });
                }
            } else if (fromY === king.y) { // check rigth and left check
                isStraightMove = true;
                if (king.x > fromX && this.checkIfCordinatesAreValid(fromY, fromX - i)) { // left
                    currnetSpace = board.boardSpaces[fromY][fromX - i];
                    possibleMoves.push({ x: fromX, y: fromY - i });
                } else if (king.x < fromX && this.checkIfCordinatesAreValid(fromY, fromX + i)) { // rigth
                    currnetSpace = board.boardSpaces[fromY][fromX + i];
                    possibleMoves.push({ x: fromX, y: fromY + i });
                }
            } else if (fromX - fromY === king.x - king.y && fromY - fromX === king.y - king.x) { // check up left and right down diagonal
                if (king.y < fromY && this.checkIfCordinatesAreValid(fromY + i, fromX + i)) { // up left
                    currnetSpace = board.boardSpaces[fromY + i][fromX + i];
                    possibleMoves.push({ x: fromX + i, y: fromY + i });
                } else if (king.y > fromY && this.checkIfCordinatesAreValid(fromY - i, fromX - i)) { // down right
                    currnetSpace = board.boardSpaces[fromY - i][fromX - i];
                    possibleMoves.push({ x: fromX - i, y: fromY - i });
                }
            } else if (fromX + fromY === king.x + king.y) { // check up right and down left diagonal
                if (king.y > fromY && this.checkIfCordinatesAreValid(fromY - i, fromX + i)) { // up right
                    currnetSpace = board.boardSpaces[fromY - i][fromX + i];
                    possibleMoves.push({ x: fromX - i, y: fromY + i });
                } else if (king.y < fromY && this.checkIfCordinatesAreValid(fromY + i, fromX - i)) { // down left
                    currnetSpace = board.boardSpaces[fromY + i][fromX - i];
                    possibleMoves.push({ x: fromX + i, y: fromY - i });
                }
            } else {
                return true;
            }

            if(currnetSpace === undefined) {
                return true;
            }

            if (Object.keys(currnetSpace.figure).length !== 0) {
                if (isStraightMove && (currnetSpace.figure.name === 'Queen' || currnetSpace.figure.name === 'Rook') && currentFigureColor !== currnetSpace.figure.color) {
                    return possibleMoves;
                } else if (!isStraightMove && (currnetSpace.figure.name === 'Queen' || currnetSpace.figure.name === 'Bishop') && currentFigureColor !== currnetSpace.figure.color) {
                    return possibleMoves;
                } else {
                    return true;
                }
            }

            let lastX = possibleMoves[possibleMoves.length - 1].x;
            let lastY = possibleMoves[possibleMoves.length - 1].y;

            if (lastX === 7 || lastX === 0 || lastY === 7 || lastY === 0) {
                return true;
            }
        }
    }

    returnEqualElemetsFromTwoArrays(arr1, arr2) {
        const arr = [];
        for (let i = 0; i < arr1.length; i++) {
            let el1 = arr1[i];
            for (let j = 0; j < arr2.length; j++) {
                const el2 = arr2[j];
                if(el1.x === el2.x && el1.y === el2.y) {
                    arr.push(el1);
                }
            }
        }
        return arr;
    }

    calculatePossibleMoves(board) {
        let posibleTakeMoves = this.posibleTakeMoves(board, this.x, this.y);
         for (const move of posibleTakeMoves) {
             let space = board.boardSpaces[move.y][move.x];
             if (this.color === 'black') {
                 space.blackThreat.push(this);
             } else if (this.color === 'white') {
                  space.whiteThreat.push(this);
             }
         }
     }
}