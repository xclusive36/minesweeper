import { useEffect, useState } from "react";

import generateMineField from "./mineField/generateMineField";
import { checkIfOnEdge } from "./mineField/checkIfOnEdge";

import Cell from "./components/Cell";

import ThumbsUp from "./assets/thumbsup.svg";
import ThumbsDown from "./assets/thumbsdown.svg";

import "./App.css";

function App() {
    const [mineFieldGrid, setMineFieldGrid] = useState([]);
    const [gridWidth, setGridWidth] = useState(0);
    const [mines, setMines] = useState(0);
    const [isGamePlayable, setIsGamePlayable] = useState(false);
    const [freeSpacesAvailable, setFreeSpacesAvailable] = useState(0);
    const [youWin, setYouWin] = useState(false);
    const [youLoose, setYouLoose] = useState(false);

    useEffect(() => {
        setGridWidth(Math.sqrt(mineFieldGrid.length));
    }, [mineFieldGrid]);

    const [intervalId, setIntervalId] = useState(0);
    const [time, setTime] = useState(0);

    const startAndStopTime = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(0);
            return;
        }

        const newIntervalId = setInterval(() => {
            setTime((prevCount) => prevCount + 1);
        }, 1000);
        setIntervalId(newIntervalId);
    };

    const createNewGrid = (a, b) => setMineFieldGrid(generateMineField(a, b));

    const revealCell = (index) => {
        // function sets the isRevealed property of the grid item to true

        const mutableGrid = [...mineFieldGrid]; // create a copy of the grid array
        mutableGrid[index].isRevealed = true; // set the isRevealed property of the grid item to true
        setMineFieldGrid(mutableGrid);
        setFreeSpacesAvailable((prevCount) => prevCount - 1); // decrement the free spaces available
        if (freeSpacesAvailable === 1) {
            startAndStopTime();
            setIsGamePlayable(false);
            setYouWin(true);
        }
    };

    const revealSurroundingCells = (index) => {
        // function reveals the surrounding cells

        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "top-left") && // if the cell is not on the top left edge
            !mineFieldGrid[index - gridWidth - 1].isRevealed // if the cell is not revealed
        ) {
            revealCell(index - gridWidth - 1); // reveal the cell
        }

        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "top") &&
            !mineFieldGrid[index - gridWidth].isRevealed
        ) {
            revealCell(index - gridWidth);
        }

        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "top-right") &&
            !mineFieldGrid[index - gridWidth + 1].isRevealed
        ) {
            revealCell(index - gridWidth + 1);
        }

        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "left") &&
            !mineFieldGrid[index - 1].isRevealed
        ) {
            revealCell(index - 1);
        }

        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "right") &&
            !mineFieldGrid[index + 1].isRevealed
        ) {
            revealCell(index + 1);
        }

        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "bottom-left") &&
            !mineFieldGrid[index + gridWidth - 1].isRevealed
        ) {
            revealCell(index + gridWidth - 1);
        }

        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "bottom") &&
            !mineFieldGrid[index + gridWidth].isRevealed
        ) {
            revealCell(index + gridWidth);
        }

        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "bottom-right") &&
            !mineFieldGrid[index + gridWidth + 1].isRevealed
        ) {
            revealCell(index + gridWidth + 1);
        }
    };

    const checkIfSurroundingCellsAreEmpty = (index) => {
        // function checks if the surrounding cells are empty

        if (
            mineFieldGrid[index].surroundingMines > 0 || // if the cell is not empty
            mineFieldGrid[index].isMine // if the cell is a mine
        )
            return; // if the cell is not empty, return

        // check if the top left cell is empty
        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "top-left") && // if the cell is not on the top left edge
            !mineFieldGrid[index - gridWidth - 1].isRevealed && // if the cell is not revealed
            mineFieldGrid[index - gridWidth - 1].surroundingMines === 0 // if the cell is empty
        ) {
            revealCell(index - gridWidth - 1); // reveal the cell
            checkIfSurroundingCellsAreEmpty(index - gridWidth - 1); // check if the surrounding cells are empty
        }

        // check if the top cell is empty
        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "top") && // if the cell is not on the top edge
            !mineFieldGrid[index - gridWidth].isRevealed && // if the cell is not revealed
            mineFieldGrid[index - gridWidth].surroundingMines === 0 // if the cell is empty
        ) {
            revealCell(index - gridWidth); // reveal the cell
            checkIfSurroundingCellsAreEmpty(index - gridWidth); // check if the surrounding cells are empty
        }

        // check if the top right cell is empty
        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "top-right") && // if the cell is not on the top right edge
            !mineFieldGrid[index - gridWidth + 1].isRevealed && // if the cell is not revealed
            mineFieldGrid[index - gridWidth + 1].surroundingMines === 0 // if the cell is empty
        ) {
            revealCell(index - gridWidth + 1); // reveal the cell
            checkIfSurroundingCellsAreEmpty(index - gridWidth + 1); // check if the surrounding cells are empty
        }

        // check if the left cell is empty
        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "left") && // if the cell is not on the left edge
            !mineFieldGrid[index - 1].isRevealed && // if the cell is not revealed
            mineFieldGrid[index - 1].surroundingMines === 0 // if the cell is empty
        ) {
            revealCell(index - 1); // reveal the cell
            checkIfSurroundingCellsAreEmpty(index - 1); // check if the surrounding cells are empty
        }

        // check if the right cell is empty
        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "right") && // if the cell is not on the right edge
            !mineFieldGrid[index + 1].isRevealed && // if the cell is not revealed
            mineFieldGrid[index + 1].surroundingMines === 0 // if the cell is empty
        ) {
            revealCell(index + 1); // reveal the cell
            checkIfSurroundingCellsAreEmpty(index + 1); // check if the surrounding cells are empty
        }

        // check if the bottom left cell is empty
        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "bottom-left") && // if the cell is not on the bottom left edge
            !mineFieldGrid[index + gridWidth - 1].isRevealed && // if the cell is not revealed
            mineFieldGrid[index + gridWidth - 1].surroundingMines === 0 // if the cell is empty
        ) {
            revealCell(index + gridWidth - 1); // reveal the cell
            checkIfSurroundingCellsAreEmpty(index + gridWidth - 1); // check if the surrounding cells are empty
        }

        // check if the bottom cell is empty
        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "bottom") && // if the cell is not on the bottom edge
            !mineFieldGrid[index + gridWidth].isRevealed && // if the cell is not revealed
            mineFieldGrid[index + gridWidth].surroundingMines === 0 // if the cell is empty
        ) {
            revealCell(index + gridWidth); // reveal the cell
            checkIfSurroundingCellsAreEmpty(index + gridWidth); // check if the surrounding cells are empty
        }

        // check if the bottom right cell is empty
        if (
            checkIfOnEdge(index, gridWidth, mineFieldGrid, "bottom-right") && // if the cell is not on the bottom right edge
            !mineFieldGrid[index + gridWidth + 1].isRevealed && // if the cell is not revealed
            mineFieldGrid[index + gridWidth + 1].surroundingMines === 0 // if the cell is empty
        ) {
            revealCell(index + gridWidth + 1); // reveal the cell
            checkIfSurroundingCellsAreEmpty(index + gridWidth + 1); // check if the surrounding cells are empty
        }
        revealSurroundingCells(index);
    };

    const flagCell = (e, index) => {
        e.preventDefault();
        const mutableGrid = [...mineFieldGrid];
        if (mutableGrid[index].isFlagged) {
            setMines(mines + 1);
        } else {
            setMines(mines - 1);
        }
        mutableGrid[index].isFlagged = !mutableGrid[index].isFlagged;
        setMineFieldGrid(mutableGrid);
    };

    return (
        <div className="App">
            <div className="header-content">
                <h2>{mines}</h2>
                <h2>
                    {youWin ? (
                        <img
                            className="thumbsup"
                            src={ThumbsUp}
                            alt="You Win!"
                        />
                    ) : youLoose ? (
                        <img
                            className="thumbsup"
                            src={ThumbsDown}
                            alt="You Loose!"
                        />
                    ) : (
                        <div />
                    )}
                </h2>
                <h2>{time}</h2>
            </div>
            <h1>Minesweeper</h1>
            <div>
                <button
                    onClick={() => {
                        createNewGrid(12, 64);
                        setFreeSpacesAvailable(64 - 12);
                        setMines(12);
                        if (intervalId) startAndStopTime();
                        setTime(0);
                        setIsGamePlayable(true);
                        setYouWin(false);
                        setYouLoose(false);
                    }}
                >
                    Easy
                </button>
                <button
                    onClick={() => {
                        createNewGrid(50, 256);
                        setFreeSpacesAvailable(256 - 50);
                        setMines(50);
                        if (intervalId) startAndStopTime();
                        setTime(0);
                        setIsGamePlayable(true);
                        setYouWin(false);
                        setYouLoose(false);
                    }}
                >
                    Medium
                </button>
                <button
                    onClick={() => {
                        createNewGrid(115, 576);
                        setFreeSpacesAvailable(576 - 115);
                        setMines(115);
                        if (intervalId) startAndStopTime();
                        setTime(0);
                        setIsGamePlayable(true);
                        setYouWin(false);
                        setYouLoose(false);
                    }}
                >
                    Hard
                </button>
            </div>
            <div
                className="grid-container"
                style={{
                    display: "grid",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: "1rem",
                    gridTemplateColumns: `repeat(${Math.sqrt(
                        mineFieldGrid.length
                    )}, 1.5rem)`,
                    gridTemplateRows: `repeat(${Math.sqrt(
                        mineFieldGrid.length
                    )}, 1.5rem)`,
                    gridGap: "1px",
                }}
            >
                {mineFieldGrid.map((cell, index) => (
                    <Cell
                        cell={cell}
                        key={index}
                        click={() => {
                            if (isGamePlayable && !cell.isFlagged) {
                                if (cell.isMine) {
                                    setYouLoose(true);
                                    revealCell(index);
                                    setIsGamePlayable(false);
                                    if (intervalId) startAndStopTime();
                                    return;
                                }
                                if (!intervalId) startAndStopTime();
                                revealCell(index);
                                checkIfSurroundingCellsAreEmpty(index);
                            }
                        }}
                        rightclick={(e) => {
                            if (isGamePlayable) flagCell(e, index);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
