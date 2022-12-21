import { useState } from "react";

export type Rotation = 0 | 1 | 2 | 3;

export interface Piece {
  type: Variation;
  xCoord: number;
  yCoord: number;
  rotation: Rotation;
}

export interface Variation {
  layout: {
    0: Number[][];
    1: Number[][];
    2: Number[][];
    3: Number[][];
  };
  color: string;
}

export const variations: Record<string, Variation> = {
  I: {
    layout: {
      0: [[1], [1], [1], [1]],
      1: [[1, 1, 1, 1]],
      2: [[1], [1], [1], [1]],
      3: [[1, 1, 1, 1]],
    },
    color: "#8ADDFF",
  },
  L: {
    layout: {
      0: [
        [1, 0],
        [1, 0],
        [1, 1],
      ],
      1: [
        [1, 1, 1],
        [1, 0, 0],
      ],
      2: [
        [1, 1],
        [0, 1],
        [0, 1],
      ],
      3: [
        [0, 0, 1],
        [1, 1, 1],
      ],
    },
    color: "#FFAF7B",
  },
  J: {
    layout: {
      0: [
        [0, 1],
        [0, 1],
        [1, 1],
      ],
      1: [
        [1, 1, 1],
        [0, 0, 1],
      ],
      2: [
        [1, 1],
        [1, 0],
        [1, 0],
      ],
      3: [
        [1, 0, 0],
        [1, 1, 1],
      ],
    },
    color: "#FFAF7B",
  },
  O: {
    layout: {
      0: [
        [1, 1],
        [1, 1],
      ],
      1: [
        [1, 1],
        [1, 1],
      ],
      2: [
        [1, 1],
        [1, 1],
      ],
      3: [
        [1, 1],
        [1, 1],
      ],
    },
    color: "#FFE77B",
  },
  Z: {
    layout: {
      0: [
        [1, 1, 0],
        [0, 1, 1],
      ],
      1: [
        [0, 1],
        [1, 1],
        [1, 0],
      ],
      2: [
        [1, 1, 0],
        [0, 1, 1],
      ],
      3: [
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    },
    color: "#FF837B",
  },
  S: {
    layout: {
      0: [
        [0, 1, 1],
        [1, 1, 0],
      ],
      1: [
        [1, 0],
        [1, 1],
        [0, 1],
      ],
      2: [
        [0, 1, 1],
        [1, 1, 0],
      ],
      3: [
        [1, 0],
        [1, 1],
        [0, 1],
      ],
    },
    color: "#82E0AA",
  },
  T: {
    layout: {
      0: [
        [0, 1, 0],
        [1, 1, 1],
      ],
      1: [
        [0, 1],
        [1, 1],
        [0, 1],
      ],
      2: [
        [1, 1, 1],
        [0, 1, 0],
      ],
      3: [
        [1, 0],
        [1, 1],
        [1, 0],
      ],
    },
    color: "#C17BFF",
  },
};
