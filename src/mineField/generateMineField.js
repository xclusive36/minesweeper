const generateMineField = (mineCount, gridSize) => {
    const grid = []; // create an empty array
    const gridWidth = Math.sqrt(gridSize); // calculate the width of the grid

    for (let i = 0; i < gridSize; i++) {
        // loop through the array based on the grid size

        grid.push({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            surroundingMines: 0,
        }); // push an object into the array
    }

    for (let i = 0; i < mineCount; i++) {
        // loop through the array based on the mine count

        do {
            let randomIndex = Math.floor(Math.random() * gridSize); // generate a random number based on the grid size
            if (grid[randomIndex].isMine) {
                // if the grid item at the random number is already a mine
                continue; // skip to next iteration
            }
            grid[randomIndex].isMine = true; // set the grid item at the random number to a mine
            break; // break out of the loop
        } while (true); // loop until a mine is placed
    }

    for (let i = 0; i < grid.length; i++) {
        // loop through each cell
        let surroundingMines = 0; // reset surrounding mines

        if (grid[i].isMine) {
            continue; // if cell is a not a mine, continue iteration
            // otherwise skip to next iteration
        }

        if (i % gridWidth !== 0) {
            // if its not on the left edge
            // expected output: true if item is not on the left edge
            // 0 % 10 === 0 == false (starts at 0)

            if (grid[i - 1].isMine) {
                // check the previous array item (item to the left)
                surroundingMines++; // increment surrounding mines variable
            }
        }

        if (i % gridWidth !== gridWidth - 1) {
            // if its not on the right edge
            // expected output: true if item is not on the right edge
            // 9 % 10 === 10 - 1 == false (starts at 0)

            if (grid[i + 1].isMine) {
                // check the next array item (item to the right)
                surroundingMines++; // increment surrounding mines
            }
        }

        if (i - gridWidth >= 0) {
            // if its not on the top edge
            // expected output: true if item is not on the top edge

            if (grid[i - gridWidth].isMine) {
                // check the item above (item 1 row directly above)
                surroundingMines++; // increment surrounding mines
            }
        }

        if (i + gridWidth < grid.length) {
            // if its not on the bottom edge
            // expected output: true if item is not on the bottom edge

            if (grid[i + gridWidth].isMine) {
                // check the item below (item 1 row directly below)
                surroundingMines++; // increment surrounding mines
            }
        }

        if (i - gridWidth >= 0 && i % gridWidth !== 0) {
            // if its not on the top edge and not on the left edge
            // expected output: true if item is not on the top edge and not on the left edge

            if (grid[i - gridWidth - 1].isMine) {
                // check the item above and to the left
                surroundingMines++; // increment surrounding mines
            }
        }

        if (i - gridWidth >= 0 && i % gridWidth !== gridWidth - 1) {
            // if its not on the top edge and not on the right edge

            if (grid[i - gridWidth + 1].isMine) {
                // check the item above and to the right
                surroundingMines++; // increment surrounding mines
            }
        }

        if (i + gridWidth < grid.length && i % gridWidth !== 0) {
            // if its not on the bottom edge and not on the left edge

            if (grid[i + gridWidth - 1].isMine) {
                // check the item below and to the left
                surroundingMines++; // increment surrounding mines
            }
        }

        if (i + gridWidth < grid.length && i % gridWidth !== gridWidth - 1) {
            // if its not on the bottom edge and not on the right edge

            if (grid[i + gridWidth + 1].isMine) {
                // check the item below and to the right
                surroundingMines++; // increment surrounding mines
            }
        }

        grid[i].surroundingMines = surroundingMines; // set the surrounding mines variable to the surroundingMines property of the grid item
    }

    return grid; // return the grid array
};

export default generateMineField;
