export const checkIfOnEdge = (index, gridWidth, mineFieldGrid, direction) => {
    // function checks if the grid item is on the edge of the grid

    switch (direction) {
        case "left": // if its not on the left edge
            if (index % gridWidth !== 0) { // expected output: true if item is not on the left edge
                return true;
            }
            return false;
        case "right": // if its not on the right edge
            if (index % gridWidth !== gridWidth - 1) { // expected output: true if item is not on the right edge
                return true;
            }
            return false;
        case "top": // if its not on the top edge
            if (index - gridWidth >= 0) { // expected output: true if item is not on the top edge
                return true;
            }
            return false;
        case "bottom": // if its not on the bottom edge
            if (index + gridWidth < mineFieldGrid.length) { // expected output: true if item is not on the bottom edge
                return true;
            }
            return false;
        case "top-left": // if its not on the top left edge
            if (index - gridWidth - 1 >= 0 && index % gridWidth !== 0) { // expected output: true if item is not on the top left edge
                return true;
            }
            return false;
        case "top-right": // if its not on the top right edge
            if (index - gridWidth + 1 >= 0 && index % gridWidth !== gridWidth - 1) { // expected output: true if item is not on the top right edge
                return true;
            }
            return false;
        case "bottom-left": // if its not on the bottom left edge
            if (index + gridWidth - 1 < mineFieldGrid.length && index % gridWidth !== 0) { // expected output: true if item is not on the bottom left edge
                return true;
            }
            return false;
        case "bottom-right": // if its not on the bottom right edge
            if (index + gridWidth + 1 < mineFieldGrid.length && index % gridWidth !== gridWidth - 1) { // expected output: true if item is not on the bottom right edge
                return true;
            }
            return false;
        default:
            return false;
    }
};