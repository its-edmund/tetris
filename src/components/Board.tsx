import React, { useEffect, useState } from "react";
import { Gameboard } from "../models/Gameboard";
import Square from "./Square";
import { Piece, Rotation, variations } from "../models/Piece";
import useKeypress from "react-use-keypress";

const addPieceToBoard = (piece: Piece, board: any) => {
  for (
    let i = piece.yCoord;
    i < piece.type.layout[piece.rotation].length + piece.yCoord;
    i++
  ) {
    for (
      let j = piece.xCoord;
      j < piece.type.layout[piece.rotation][0].length + piece.xCoord;
      j++
    ) {
      if (
        piece.type.layout[piece.rotation][i - piece.yCoord][
          j - piece.xCoord
        ] === 1
      ) {
        board[i][j] = piece.type.color;
      }
    }
  }
  console.log(board);
  return board;
};

const collisionDetection = (
  direction: "l" | "r" | "d",
  piece: Piece,
  grid: number[][]
): boolean => {
  switch (direction) {
    case "l":
      if (piece.xCoord <= 0) {
        return true;
      }

      for (
        let j = piece.xCoord;
        j < piece.type.layout[piece.rotation].length + piece.xCoord;
        j++
      ) {
        if (
          piece.type.layout[piece.rotation][i - piece.yCoord][
            j - piece.xCoord
          ] === 1
        ) {
          if (grid[i][j - 1] !== null) {
            return { ...prev };
          } else {
            break;
          }
        }
      }
      break;
  }
  return false;
};

const generateNewPiece = () => {
  const rand = Math.floor(Math.random() * 7);
  const pieces = ["O", "I", "L", "J", "Z", "S"];
  return {
    type: variations[pieces[rand]],
    xCoord: 4,
    yCoord: 0,
    rotation: 0 as Rotation,
  };
};

const Board = () => {
  const [grid, setGrid] = useState(
    new Array(20).fill(null).map(() => new Array(10).fill(null))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece>({
    type: variations["I"],
    xCoord: 4,
    yCoord: 0,
    rotation: 0,
  });

  const [keyInterval, setKeyInterval] = useState<any>();

  const moveLeft = () => {
    setCurrentPiece((prev) => {
      if (prev.xCoord > 0) {
        for (
          let i = prev.yCoord;
          i < prev.type.layout[prev.rotation].length + prev.yCoord;
          i++
        ) {
          for (
            let j = prev.xCoord;
            j < prev.type.layout[prev.rotation].length + prev.xCoord;
            j++
          ) {
            console.log(i - prev.yCoord, j - prev.xCoord);
            console.log(
              prev.type.layout[prev.rotation][i - prev.yCoord][j - prev.xCoord]
            );
            if (
              prev.type.layout[prev.rotation][i - prev.yCoord][
                j - prev.xCoord
              ] === 1
            ) {
              if (grid[i][j - 1] !== null) {
                return { ...prev };
              } else {
                break;
              }
            }
          }
        }
        prev.xCoord -= 1;
      }
      return { ...prev };
    });
  };

  const moveRight = () => {
    setCurrentPiece((prev) => {
      if (
        prev.xCoord <
        10 - prev.type.layout[currentPiece.rotation][0].length
      ) {
        for (
          let i = prev.yCoord;
          i < prev.type.layout[prev.rotation].length + prev.yCoord;
          i++
        ) {
          for (
            let j = prev.type.layout[prev.rotation].length + prev.xCoord;
            j > prev.xCoord;
            j--
          ) {
            if (
              prev.type.layout[prev.rotation][i - prev.yCoord][
                j - prev.xCoord
              ] === 1
            ) {
              if (grid[i][j + 1] !== null) {
                return { ...prev };
              } else {
                break;
              }
            }
          }
        }
        prev.xCoord += 1;
      }
      return { ...prev };
    });
  };

  const handleUserKeyPress = (event: KeyboardEvent) => {
    const { key } = event;

    if (key === "ArrowLeft") {
      const interval = setInterval(() => {
        moveLeft();
      }, 10);
      setKeyInterval(interval);
    }
    if (key === "ArrowRight") {
      const interval = setInterval(() => {
        moveRight();
      }, 10);
      setKeyInterval(interval);
    }
  };

  const handleKeyUp = () => {
    clearInterval(keyInterval);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPiece((prev) => {
        console.log(
          prev.yCoord + currentPiece.type.layout[currentPiece.rotation].length
        );
        if (
          prev.yCoord + currentPiece.type.layout[currentPiece.rotation].length <
          20
        ) {
          for (
            let j = prev.xCoord;
            j < prev.type.layout[prev.rotation][0].length + prev.xCoord;
            j++
          ) {
            for (
              let i = prev.type.layout[prev.rotation].length + prev.yCoord - 1;
              i >= prev.yCoord;
              i--
            ) {
              if (
                prev.type.layout[prev.rotation][i - prev.yCoord][
                  j - prev.xCoord
                ] === 1
              ) {
                console.log(grid[i + 1][j]);
                if (grid[i + 1][j] !== null) {
                  setGrid(addPieceToBoard(prev, grid));
                  return generateNewPiece();
                }
              }
            }
          }
          prev.yCoord += 1;
        } else {
          setGrid(addPieceToBoard(prev, grid));
          return generateNewPiece();
        }
        return { ...prev };
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {grid.map((e, i) => {
          return (
            <div className="flex flex-row">
              {e.map((_, j) => {
                if (
                  j >= currentPiece.xCoord &&
                  j <=
                    currentPiece.type.layout[currentPiece.rotation][0].length +
                      currentPiece.xCoord -
                      1 &&
                  i >= currentPiece.yCoord &&
                  i <=
                    currentPiece.yCoord +
                      currentPiece.type.layout[currentPiece.rotation].length -
                      1
                ) {
                  if (
                    currentPiece.type.layout[currentPiece.rotation][
                      i - currentPiece.yCoord
                    ][j - currentPiece.xCoord] === 1
                  ) {
                    return <Square color={currentPiece.type.color} />;
                  }
                }
                return <Square color={grid[i][j]} />;
              })}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row mt-2 gap-2 text-white">
        <button
          onClick={() => {
            setCurrentPiece((prev) => {
              const newRotation = ((prev.rotation + 1) % 4) as Rotation;
              if (prev.xCoord >= 10 - prev.type.layout[newRotation][0].length) {
                prev.xCoord = 10 - prev.type.layout[newRotation][0].length;
              }
              prev.rotation = newRotation;
              return { ...prev };
            });
          }}
        >
          Rotate
        </button>
        <button
          onClick={() => {
            setCurrentPiece((prev) => {
              if (prev.xCoord > 0) {
                for (
                  let i = prev.yCoord;
                  i < prev.type.layout[prev.rotation].length + prev.yCoord;
                  i++
                ) {
                  for (
                    let j = prev.xCoord;
                    j < prev.type.layout[prev.rotation].length + prev.xCoord;
                    j++
                  ) {
                    console.log(i - prev.yCoord, j - prev.xCoord);
                    console.log(
                      prev.type.layout[prev.rotation][i - prev.yCoord][
                        j - prev.xCoord
                      ]
                    );
                    if (
                      prev.type.layout[prev.rotation][i - prev.yCoord][
                        j - prev.xCoord
                      ] === 1
                    ) {
                      if (grid[i][j - 1] !== null) {
                        return { ...prev };
                      } else {
                        break;
                      }
                    }
                  }
                }
                prev.xCoord -= 1;
              }
              return { ...prev };
            });
          }}
        >
          Left
        </button>
        <button
          onClick={() => {
            setCurrentPiece((prev) => {
              if (
                prev.xCoord <
                10 - prev.type.layout[currentPiece.rotation][0].length
              ) {
                for (
                  let i = prev.yCoord;
                  i < prev.type.layout[prev.rotation].length + prev.yCoord;
                  i++
                ) {
                  for (
                    let j =
                      prev.type.layout[prev.rotation].length + prev.xCoord;
                    j > prev.xCoord;
                    j--
                  ) {
                    if (
                      prev.type.layout[prev.rotation][i - prev.yCoord][
                        j - prev.xCoord
                      ] === 1
                    ) {
                      if (grid[i][j + 1] !== null) {
                        return { ...prev };
                      } else {
                        break;
                      }
                    }
                  }
                }
                prev.xCoord += 1;
              }
              return { ...prev };
            });
          }}
        >
          Right
        </button>
      </div>
    </div>
  );
};

export default Board;
