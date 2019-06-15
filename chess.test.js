const Chess = require("./chess");

const chess = new Chess();

chess.printBoard();

// console.log("canMoveRook ::: ", chess.canMoveRook([4, 7], "white", "Right"));

// console.log(
//   "movedPosition of rook::: ",
//   chess.moveRook([4, 6], "white", "Right")
// );

// console.log("moved Rook ::: ", chess.coins.white.Rook);

// console.log("chess ::: ", chess);

// console.log("canMoveBishop ::: ", chess.canMoveBishop([2, 4], "black", "Left"));

// // Uses AXEL's node module
// var ctx = require("axel");

// // Clear the terminal
// ctx.clear();

// // Red box
// ctx.bg(255, 0, 0);
// ctx.box(2, 2, 8, 4);

// // Yellow box
// ctx.bg(255, 255, 0);
// ctx.box(12, 2, 8, 4);

// // Green box
// ctx.bg(0, 255, 0);
// ctx.box(2, 7, 8, 4);

// // Blue box
// ctx.bg(0, 0, 255);
// ctx.box(12, 7, 8, 4);

// ctx.cursor.restore();
