function checkIfCordinatesAreValid(x, y) {
    if (x > 7 || y > 7 || x < 0 || y < 0) {
        return false;
    }
    return true;
}

function checkForColorDifrence(color1, color2) {
    if (color1 === color2) {
        return false;
    }
    return true;
}

function returnEqualElemetsFromTwoArrays(arr1, arr2) {
    const arr = [];
    for (let i = 0; i < arr1.length; i++) {
        const el1 = arr1[i];
        for (let j = 0; j < arr2.length; j++) {
            const el2 = arr2[j];
            if (el1.x === el2.x && el1.y === el2.y) {
                arr.push(el1);
                break;
            }
        }
    }
    return arr;
}

function checkIfTwoPointsAreOnTheSameLine(x1, y1, x2, y2) {
    if (x1 === x2) {
        return true;
    }
    if (y1 === y2) {
        return true;
    }
    if (x1 + y1 === x2 + y2) {
        return true;
    }
    if (x1 - y1 === x2 - y2 && y1 - x1 === y2 - x2) {
        return true;
    }

    return false;
}

function getAllPointsBetweenTwoPoints(x1, y1, x2, y2) {
    const moves = [];

    let x = x1;
    let y = y1;
    for (let i = 0; i < 7; i++) {
        // down
        if (x1 === x2 && y1 > y2) {
            y -= 1;
        }

        // up
        if (x1 === x2 && y1 < y2) {
            y += 1;
        }

        // right
        if (y1 === y2 && x1 > x2) {
            x += 1;
        }

        // left
        if (y1 === y2 && x1 < x2) {
            x -= 1;
        }

        // up left
        if (x1 - y1 === x2 - y2 && y1 - x1 === y2 - x2 && y1 > y2) {
            x -= 1;
            y -= 1;
        }

        // right down
        if (x1 - y1 === x2 - y2 && y1 - x1 === y2 - x2 && y1 < y2) {
            x += 1;
            y += 1;
        }

        // up right
        if (x1 + y1 === x2 + y2 && y1 > y2) {
            x += 1;
            y -= 1;
        }

        // down left
        if (x1 + y1 === x2 + y2 && y1 < y2) {
            x -= 1;
            y += 1;
        }

        if (!checkIfCordinatesAreValid(x, y)) {
            return moves;
        }

        moves.push({ x, y });

        if (x === x2 && y === y2) {
            return moves;
        }
    }

    return moves;
}

export default {
    checkIfCordinatesAreValid,
    checkForColorDifrence,
    returnEqualElemetsFromTwoArrays,
    checkIfTwoPointsAreOnTheSameLine,
    getAllPointsBetweenTwoPoints,
};
