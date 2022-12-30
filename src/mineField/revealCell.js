export const revealCell = (index, mineFieldGrid) => {
    // function sets the isRevealed property of the grid item to true

    const mutableGrid = [...mineFieldGrid]; // create a copy of the grid array
    mutableGrid[index].isRevealed = true; // set the isRevealed property of the grid item to true

    return mutableGrid;
};