interface Piece {
  color: string;
}

const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 10;

let Gameboard: Array<Array<Piece | null>> = Array(BOARD_HEIGHT)
  .fill(null)
  .map(() => Array(BOARD_WIDTH).fill(null));

export { Gameboard, BOARD_HEIGHT, BOARD_WIDTH };
