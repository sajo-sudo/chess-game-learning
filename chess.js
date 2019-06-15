var PImage = require("pureimage");

function slope([x, y], [x1, y1]) {
  return (y1 - y) / (x1 - x);
}

// Assignments:::
// 1) You should implement move of queen using rook move and bishop move. don't duplicate the code.
// 2) Solve Knight move in your way and try to compress ur code.
// 3) you should implement the move method for Bishop.
// 4) think to write a move function which accepts only current and move position. you should find the coin on that position and move it. // LEAST PRIORITY

function Chess() {
  this.coins = {
    white: {
      Rook: {
        Right: [7, 7],
        Left: [7, 0]
      },
      Bishop: {
        Right: [7, 5],
        Left: [7, 2]
      }
    },
    black: {
      Rook: {
        Right: [0, 7],
        Left: [0, 0]
      },
      Bishop: {
        Left: [0, 5],
        Right: [0, 2]
      }
    }
  };
}

Chess.prototype.canMoveRook = function(moveLocation, color, rookSide) {
  const currentLocation = this.coins[color].Rook[rookSide];
  if (
    currentLocation[0] === moveLocation[0] ||
    currentLocation[1] === moveLocation[1]
  ) {
    return true;
  }
  return false;
};

Chess.prototype.moveRook = function(moveLocation, color, rookSide) {
  if (this.canMoveRook(moveLocation, color, rookSide)) {
    console.log(
      "current Location of Rook ::: ",
      this.coins[color].Rook[rookSide]
    );
    this.coins[color].Rook[rookSide] = moveLocation;
    console.log("new Location of Rook ::: ", this.coins[color].Rook[rookSide]);
    return moveLocation;
  }
  throw Error("Invalid Move");
};

// m = y1-y/x1-x
// the m should be 1 or -1
Chess.prototype.canMoveBishop = function(moveLocation, color, bishopSide) {
  const currentLocation = this.coins[color].Bishop[bishopSide];
  const m = slope(currentLocation, moveLocation);
  return m == 1 || m == -1;
};

Chess.prototype.printBoard = function() {
  // Red box
  var img = PImage.make(100, 100);
  var ctx = img.getContext("2d");
  ctx.fillStyle = "#00ff00";
  ctx.beginPath();
  ctx.arc(50, 50, 40, 0, Math.PI * 2, true); // Outer circle
  ctx.closePath();
  ctx.fill();
};

module.exports = Chess;
