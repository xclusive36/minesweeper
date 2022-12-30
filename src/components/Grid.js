import Cell from "./Cell";

const Grid = ({ mineFieldGrid }) => {

    return (
        <div
            className="grid-container"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.sqrt(
                    mineFieldGrid.length
                )}, 1.5rem)`,
                gridTemplateRows: `repeat(${Math.sqrt(
                    mineFieldGrid.length
                )}, 1.5rem)`,
                gridGap: "2px",
            }}
        >
            {mineFieldGrid.map((cell, index) => (
                <Cell cell={cell} key={index}
                //  click={() => revealCell(index)}
                  />
            ))}
        </div>
    );
};

export default Grid;
