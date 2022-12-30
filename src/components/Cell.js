import Bomb from "../assets/bomb.svg";
import Flag from "../assets/flag.svg";

const Cell = ({ cell, click, rightclick }) => {
    const { isMine, isRevealed, isFlagged, surroundingMines } = cell;

    const determineFontColor = (number) => {
        switch (number) {
            case 1:
                return "blue";
            case 2:
                return "green";
            case 3:
                return "red";
            case 4:
                return "purple";
            case 5:
                return "maroon";
            case 6:
                return "turquoise";
            case 7:
                return "black";
            case 8:
                return "gray";
            default:
                return "black";
        }
    };

    if (isRevealed)
        return (
            <div
                className="grid-item"
                style={
                    isMine ? { backgroundColor: "red" } :
                    {color: `${determineFontColor(surroundingMines)}`,}
                }
            >
                {isMine ? (
                    <img className="bomb" src={Bomb} alt="bomb" />
                ) : (
                    <strong>{surroundingMines ? surroundingMines : ""}</strong>
                )}
            </div>
        );

    if (isFlagged)
        return (
            <div
                className="cell-block"
                onClick={click}
                onContextMenu={rightclick}
            >
                <img className="bomb" src={Flag} alt="bomb" />
            </div>
        );

    return (
        <div
            className="cell-block"
            onClick={click}
            onContextMenu={rightclick}
        />
    );
};

export default Cell;
