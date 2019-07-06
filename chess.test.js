const Chess = require("./chess");

const chess = new Chess();

// chess.printBoard();

 //console.log("canMoveRook ::: ", chess.canMoveRook([4, 7], "white", "Right"));

// console.log(
//   "movedPosition of rook::: ",
//   chess.moveRook([4, 6], "white", "Right")
//);

 //console.log("moved Rook ::: ", chess.coins.white.Rook);

// console.log("chess ::: ", chess);

// con
//console.log("canMoveBishop ::: ", chess.canMoveBishop([2, 4], "black", "Left"));

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

//console.log(chess.canMoveBishop([5,5], "white","Right"))
//console.log(chess.moveBishop([5,5], "white","Right"))
console.log(chess.canMoveQueen([3,6],"black"))
console.log(chess.moveQueen([3,6],"black"))
console.log(chess.canMoveKnight([5,7],"white","Right"))
console.log(chess.canMoveKnight([5,5],"white","Right"))
console.log(chess.moveKnight([5,5],"white","Right"))
console.log(chess.canMoveKing([7,5],"white"))
console.log(chess.moveKing([7,6],"white"))
console.log(chess.canMovesippai([2,0],"black",0))
 console.log(chess.movesippai([3,0],"white",0))