// var PImage = require("pureimage");

function slope([x, y], [x1, y1]) {
  return (y1 - y) / (x1 - x);
}

function RookMove(currentLocation, moveLocation) {
  return currentLocation[0] === moveLocation[0] || currentLocation[1] === moveLocation[1] 
}

function BishopMove(currentLocation, moveLocation) {
  const m = slope(currentLocation, moveLocation);
  return m == 1 || m == -1;
}

function validPosition (pos) {
  return (pos[0] >= 0 && pos[0] <=7) && (pos[1] >=0 && pos[1] <=7);
}

function knightmove(currentLocation){
    var x = currentLocation[0]
    var y = currentLocation[1]
  var arr = [[x+2,y-1],[x+2,y+1],[x+1,y+2],[x+1,y-2],[x-2,y+1],[x-2,y-1],[x-1,y-2],[x-1,y+2]]
  return arr.filter(validPosition)
  }

function isSamePos(pos1) {
    return function (pos2) {
        return pos1[0] === pos2[0] && pos1[1] === pos2[1]
      }

  }
  function kingMove(currentLocation){
    var x1 = currentLocation[0]
    var y1 = currentLocation[1]
    var arrOfarray=[[x1+1,y1],[x1,y1+1],[x1-1,y1],[x1-1,y1+1],[x1+1,y1+1],[x1+1,y1-1],[x1,y1-1],[x1-1,y1-1]]
    return arrOfarray.filter(validPosition)
  }

  function sippaiMove(currentLocation,color){
    var a = currentLocation[0]
    var b = currentLocation[1]
    if(color == "white"){
      return [[a-1,b]].filter(validPosition)
    }
    if (color == "black") {
      return [[a+1, b]].filter(validPosition)
    }
    return false
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
      },
      Knight: {
        Right: [7, 6],
        Left: [7, 1]
      },
      Queen: [7, 3],
      King: [7, 4],
      sippai:[[6,0],[6,1],[6,2],[6,3][6,4],[6,5],[6,6],[6,7]]
    },
    black: {
      Rook: {
        Right: [0, 7],
        Left: [0, 0]
      },
      Bishop: {
        Left: [0, 5],
        Right: [0, 2]
      },
      Knight: {
        Right: [1, 1],
        Left: [1, 6]
      },

      Queen: [0, 3],
      King: [0, 4],
      sippai:[[1,0],[1,1],[1,2],[1,3][1,4],[1,5],[1,6],[1,7]]
    },
  };
}

Chess.prototype.canMoveRook = function (moveLocation, color, rookSide) {
  const currentLocation = this.coins[color].Rook[rookSide];
  return RookMove(currentLocation, moveLocation)
}; 

Chess.prototype.moveRook = function (moveLocation, color, rookSide) {
  if (this.canMoveRook(moveLocation, color, rookSide)) {
    this.coins[color].Rook[rookSide] = moveLocation;
    // console.log("new Location of Rook ::: ", this.coins[color].Rook[rookSide]);
    return moveLocation;
  }
  throw Error("Invalid Move");
};

// m = y1-y/x1-x
// the m should be 1 or -1
Chess.prototype.canMoveBishop = function (moveLocation, color, bishopSide) {
  const currentLocation = this.coins[color].Bishop[bishopSide];
  return BishopMove(currentLocation, moveLocation)
};

Chess.prototype.moveBishop = function (moveLocation, color, bishopSide) {
  if (this.canMoveBishop(moveLocation, color, bishopSide)) {
    this.coins[color].Bishop[bishopSide] = moveLocation
    return moveLocation
  }
  throw Error("Invalid Move")
}
Chess.prototype.canMoveKnight = function (moveLocation, color, KnightSide) {
  const currentLocation = this.coins[color].Knight[KnightSide]
  const knightMoves = knightmove(currentLocation)
   return knightMoves.some(isSamePos(moveLocation))
}
Chess.prototype.moveKnight = function (moveLocation, color, KnightSide) {
  if (this.canMoveKnight(moveLocation, color, KnightSide)) {
    this.coins[color].Bishop[KnightSide] = moveLocation
    return moveLocation
  }
  throw Error("Invalid Move")
}
Chess.prototype.canMoveQueen = function (moveLocation, color) {
  const currentLocation = this.coins[color].Queen
  return RookMove(currentLocation, moveLocation) || BishopMove(currentLocation, moveLocation)
}

Chess.prototype.moveQueen = function (moveLocation, color) {
  if (this.canMoveQueen(moveLocation, color)) {
    this.coins[color].Queen = moveLocation
    return moveLocation
  }
  throw Error("Invalid Move")
}

Chess.prototype.canMoveKing = function (moveLocation, color) {
  const currentLocation = this.coins[color].King
  const kingMoves = kingMove(currentLocation)
  return moveLocation
}

Chess.prototype.moveKing = function (moveLocation, color) {
  if (this.canMoveKing(moveLocation, color)) {
    this.coins[color].King = moveLocation
    return moveLocation
  }
  throw Error("Invalid Move")
}

Chess.prototype.canMovesippai= function(moveLocation, color,number){
  const currentLocation = this.coins[color].sippai[number]
  const sippaiMoves = sippaiMove(currentLocation,color)
  return sippaiMoves.some(isSamePos(moveLocation))
}


Chess.prototype.movesippai = function (moveLocation, color,number) {
  if (this.canMovesippai(moveLocation, color,number)) {
    this.coins[color].sippai = moveLocation
    return moveLocation
  }
  throw Error("Invalid Move")
}
// Chess.prototype.printBoard = function() {
//   // Red box
//   var img = PImage.make(100, 100);
//   var ctx = img.getContext("2d");
//   ctx.fillStyle = "#00ff00";
//   ctx.beginPath();
//   ctx.arc(50, 50, 40, 0, Math.PI * 2, true); // Outer circle
//   ctx.closePath();
//   ctx.fill();
// };
module.exports = Chess;


