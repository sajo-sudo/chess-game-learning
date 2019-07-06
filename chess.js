// var PImage = require("pureimage");

(function(exports) {
  function slope([x, y], [x1, y1]) {
    return (y1 - y) / (x1 - x);
  }
  function RookMove(currentLocation, moveLocation) {
    return (
      currentLocation[0] === moveLocation[0] ||
      currentLocation[1] === moveLocation[1]
    );
  }

  function BishopMove(currentLocation, moveLocation) {
    const m = slope(currentLocation, moveLocation);
    return m == 1 || m == -1;
  }

  function validPosition(pos) {
    return pos[0] >= 0 && pos[0] <= 7 && (pos[1] >= 0 && pos[1] <= 7);
  }

  function knightmove(currentLocation) {
    var x = currentLocation[0];
    var y = currentLocation[1];
    var arr = [
      [x + 2, y - 1],
      [x + 2, y + 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x - 1, y - 2],
      [x - 1, y + 2]
    ];
    return arr.filter(validPosition);
  }

  function isSamePos(pos1) {
    return function(pos2) {
      return pos1[0] === pos2[0] && pos1[1] === pos2[1];
    };
  }

  function kingMove(currentLocation) {
    var x1 = currentLocation[0];
    var y1 = currentLocation[1];
    var arrOfarray = [
      [x1 + 1, y1],
      [x1, y1 + 1],
      [x1 - 1, y1],
      [x1 - 1, y1 + 1],
      [x1 + 1, y1 + 1],
      [x1 + 1, y1 - 1],
      [x1, y1 - 1],
      [x1 - 1, y1 - 1]
    ];
    return arrOfarray.filter(validPosition);
  }

  function yInterCept(x, y, slope) {
    return y - slope * x;
  }

  function findStartAndEndOfBishopLine([row, col], slope) {
    let y_itercept = yInterCept(row, col, slope);
    if (y_itercept <= 7) {
      return [[0, y_itercept], [y_itercept, 0]];
    }
    const min_x = (7 - y_itercept) / slope;
    return [[min_x, 7], [7, min_x]];
  }

  function findAllLinePoints(startX, endX, m, c) {
    const result = [];
    for (let x = startX; x <= endX; x++) {
      result.push([x, m * x + c]);
    }
    return result;
  }

  function possibleBishopMoves([row, col]) {
    const [minusStart, minusEnd] = findStartAndEndOfBishopLine([row, col], -1);
    const [plusStart, plusEnd] = findStartAndEndOfBishopLine([row, col], 1);
    console.log([plusStart, plusEnd]);
    return findAllLinePoints(
      minusStart[0],
      minusEnd[0],
      -1,
      yInterCept(row, col, -1)
    );
  }

  function sippaiMove(currentLocation, color) {
    var a = currentLocation[0];
    var b = currentLocation[1];
    if (color == "white") {
      if (a == 6) {
        return [[a - 1, b], [a - 2, b]].filter(validPosition);
      }
      return [[a - 1, b]].filter(validPosition);
    }
    if (color == "black") {
      if (a == 1) {
        return [[a + 1, b], [a + 2, b]].filter(validPosition);
      }
      return [[a + 1, b]].filter(validPosition);
    }
    throw Error("Invalid Move");
  }

  function getCoinOnpos(coin, pos) {
    var white = coin.white;
    var whiteking = white.King;
    if (isSamePos(pos)(whiteking)) {
      return ["white", "king"];
    }
    var whiteQueen = white.Queen;
    if (isSamePos(pos)(whiteQueen)) {
      return ["white", "Queen"];
    }
    var whiteRook = white.Rook;
    var whiteRookleft = whiteRook.Left;
    if (isSamePos(pos)(whiteRookleft)) {
      return ["white", "Rook", "Left"];
    }
    var whiteRookRight = whiteRook.Right;
    if (isSamePos(pos)(whiteRookRight)) {
      return ["white", "Rook", "Right"];
    }
    var whiteKnight = white.Knight;
    var whiteKnightleft = whiteKnight.Left;
    if (isSamePos(pos)(whiteKnightleft)) {
      return ["white", "Knight", "Left"];
    }
    var whiteKnightRight = white.Knight.Right;
    if (isSamePos(pos)(whiteKnightRight)) {
      return ["white", "Knight", "Right"];
    }
    var whiteBishop = coin.white.Bishop;
    var whiteBishopleft = whiteBishop.Left;
    if (isSamePos(pos)(whiteBishopleft)) {
      return ["white", "Bishop", "Left"];
    }
    var whiteBishopRight = white.Bishop.Right;
    if (isSamePos(pos)(whiteBishopRight)) {
      return ["white", "Bishop", "Right"];
    }
    var whitesippai = white.sippai;
    for (let i = 0; i < whitesippai.length; i++) {
      if (isSamePos(pos)(whitesippai[i])) {
        return ["white", "sippai", i];
      }
    }
    var black = coin.black;
    var blackKing = black.King;
    if (isSamePos(pos)(blackKing)) {
      return ["black", "king"];
    }
    var blackQueen = black.Queen;
    if (isSamePos(pos)(blackQueen)) {
      return ["black", "Queen"];
    }
    var BlackRook = black.Rook;
    var BlackRookleft = BlackRook.Left;
    if (isSamePos(pos)(BlackRookleft)) {
      return ["black", "Rook", "Left"];
    }
    var BlackRookRight = BlackRook.Right;
    if (isSamePos(pos)(BlackRookRight)) {
      return ["black", "Rook", "Right"];
    }
    var blackKnight = coin.black.Knight;
    var BlackKnightleft = blackKnight.Left;
    if (isSamePos(pos)(BlackKnightleft)) {
      return ["black", "Knight", "Left"];
    }
    var blackKnightRight = blackKnight.Right;
    if (isSamePos(pos)(blackKnightRight)) {
      return ["black", "Knight", "Right"];
    }
    var blackBishop = coin.black.Bishop;
    var blackBishopLeft = blackBishop.Left;
    if (isSamePos(pos)(blackBishopLeft)) {
      return ["black", "Bishop", "Left"];
    }
    var blackBishopRight = black.Bishop.Right;
    if (isSamePos(pos)(blackBishopRight)) {
      return ["black", "Bishop", "Right"];
    }
    var blacksippai = black.sippai;
    for (let i = 0; i < blacksippai.length; i++) {
      if (isSamePos(pos)(blacksippai[i])) {
        return ["black", "sippai", i];
      }
    }
    return null;
  }

  function Chess() {
    this.selectedCoin = null;
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
        sippai: [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7]]
      },
      black: {
        Rook: {
          Right: [0, 0],
          Left: [0, 7]
        },
        Bishop: {
          Left: [0, 5],
          Right: [0, 2]
        },
        Knight: {
          Right: [0, 1],
          Left: [0, 6]
        },
        Queen: [0, 3],
        King: [0, 4],
        sippai: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7]]
      }
    };
  }

  Chess.prototype.getPosOfCoin = function(coinPath) {
    return coinPath.reduce(function(prevObj, currentKey) {
      return prevObj[currentKey];
    }, this.coins);
  };

  Chess.prototype.canMoveRook = function(moveLocation, color, rookSide) {
    const currentLocation = this.coins[color].Rook[rookSide];
    return RookMove(currentLocation, moveLocation);
  };

  Chess.prototype.moveRook = function(moveLocation, color, rookSide) {
    if (this.canMoveRook(moveLocation, color, rookSide)) {
      this.coins[color].Rook[rookSide] = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };

  Chess.prototype.selectCoin = function(coinPath) {
    // it is unsafe. because, we didn't validate coinpath
    this.selectedCoin = coinPath;
  };

  Chess.prototype.canMoveBishop = function(moveLocation, color, bishopSide) {
    const currentLocation = this.coins[color].Bishop[bishopSide];
    return BishopMove(currentLocation, moveLocation);
  };

  Chess.prototype.moveBishop = function(moveLocation, color, bishopSide) {
    if (this.canMoveBishop(moveLocation, color, bishopSide)) {
      this.coins[color].Bishop[bishopSide] = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };
  Chess.prototype.canMoveKnight = function(moveLocation, color, KnightSide) {
    const currentLocation = this.coins[color].Knight[KnightSide];
    const knightMoves = knightmove(currentLocation);
    return knightMoves.some(isSamePos(moveLocation));
  };
  Chess.prototype.moveKnight = function(moveLocation, color, KnightSide) {
    if (this.canMoveKnight(moveLocation, color, KnightSide)) {
      this.coins[color].Knight[KnightSide] = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };
  Chess.prototype.canMoveQueen = function(moveLocation, color) {
    const currentLocation = this.coins[color].Queen;
    return (
      RookMove(currentLocation, moveLocation) ||
      BishopMove(currentLocation, moveLocation)
    );
  };

  Chess.prototype.moveQueen = function(moveLocation, color) {
    if (this.canMoveQueen(moveLocation, color)) {
      this.coins[color].Queen = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };

  Chess.prototype.canMoveKing = function(moveLocation, color) {
    const currentLocation = this.coins[color].King;
    const kingMoves = kingMove(currentLocation);
    return kingMoves.some(isSamePos(moveLocation));
  };

  Chess.prototype.moveKing = function(moveLocation, color) {
    if (this.canMoveKing(moveLocation, color)) {
      this.coins[color].King = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };

  Chess.prototype.canMovesippai = function(moveLocation, color, number) {
    const currentLocation = this.coins[color].sippai[number];
    const sippaiMoves = sippaiMove(currentLocation, color);
    return sippaiMoves.some(isSamePos(moveLocation));
  };

  Chess.prototype.movesippai = function(moveLocation, color, number) {
    if (this.canMovesippai(moveLocation, color, number)) {
      this.coins[color].sippai = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };
  Chess.prototype.getPosibleMoves = function(currentLocation) {
    const currentCoin = getCoinOnpos(this.coins, currentLocation); // ["White", "sippai", 0]
    var current = currentCoin[1];
    var currentColor = currentCoin[0];
    switch (current) {
      case "king":
        return kingMove(currentLocation);
      case "Queen":
        break;
      case " Rook":
        break;
      case "Bishop":
        return possibleBishopMoves(currentLocation);
      case "Knight":
        return knightmove(currentLocation);
      case "sippai":
        return sippaiMove(currentLocation, currentColor);
    }
  };

  Chess.prototype.getCoinOnpos = function(pos) {
    return getCoinOnpos(this.coins, pos);
  };

  Chess.prototype.move = function(currentLocation, moveLocation) {
    var Current = getCoinOnpos(this.coins, currentLocation);
    if (Current[1] == "king") {
      var Kingmove = this.moveKing(moveLocation, Current[0]);
      return Kingmove;
    } else if (Current[1] == "Queen") {
      var Queenmove = this.moveQueen(moveLocation, Current[0]);
      return Queenmove;
    } else if (Current[1] == "Rook") {
      var Rookmove = this.moveRook(moveLocation, Current[0], Current[2]);
      return Rookmove;
    } else if (Current[1] == "Knight") {
      var knightmove = this.moveKnight(moveLocation, Current[0], Current[2]);
      return knightmove;
    } else if (Current[1] == "Bishop") {
      var Bishopmove = this.moveBishop(moveLocation, Current[0], Current[2]);
      return Bishopmove;
    } else if (Current[1] == "sippai") {
      var sippaimove = this.movesippai(moveLocation, Current[0], Current[2]);
      return sippaimove;
    }
    throw Error("Invalid Move");
  };

  exports.Chess = Chess;

  // Chess.prototype.canMoveKnight = function (moveLocation, color, KnightSide) {
  // Chess.prototype.moveKnight = function (moveLocation, color, KnightSide)
})((chess = {}));
