function checkIfCordinatesAreValid(x, y) {
    if (x > 7 || y > 7 || x < 0 || y < 0) {
        return false;
    } else {
        return true;
    }
}

function checkForColorDifrence(color1, color2) {
    if (color1 === color2) {
        return false;
    } else {
        return true;
    }
}

function returnEqualElemetsFromTwoArrays(arr1, arr2) {
    const arr = [];
    for (let i = 0; i < arr1.length; i++) {
        let el1 = arr1[i];
        for (let j = 0; j < arr2.length; j++) {
            const el2 = arr2[j];
            if (el1.x === el2.x && el1.y === el2.y) {
                arr.push(el1);
            }
        }
    }
    return arr;
}

export default {
    checkIfCordinatesAreValid,
    checkForColorDifrence,
    returnEqualElemetsFromTwoArrays
}