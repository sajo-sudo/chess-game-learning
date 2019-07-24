// var PImage = require("pureimage");

(function (exports) {
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

  function zerothArrayofIndex(arr) {
    var x = []
    for (i = 1; i < arr.length; i++) {
      x.push(arr[i])

    }
    return x
  }


  function knightmove(currentLocation, color, coins) {
    var x = currentLocation[0];
    var y = currentLocation[1];
    var arr = [
      currentLocation,
      [x + 2, y - 1],
      [x + 2, y + 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x - 1, y - 2],
      [x - 1, y + 2]
    ];
    var knightfilter = arr.filter(validPosition);
    return filterposionONcolor(knightfilter, color, coins);

  }


  function isSamePos(pos1) {
    return function (pos2) {
      return pos1[0] === pos2[0] && pos1[1] === pos2[1];
    };
  }

  function kingMove(currentLocation, color, coins) {
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
    var kingarray = arrOfarray.filter(validPosition);
    return filterposionONcolor(kingarray, color, coins);
  }
  //console.log(kingMove([4,4]),"fgh"
  function possibleBishopMoves([row, col], color, coins) {
    const positionDownlineRight = filtertillcoinnotfound(
      secondBishopLine([row, col]),
      color,
      coins
    );
    const positionUplineleft = filtertillcoinnotfound(
      UpBishopLine([row, col]),
      color,
      coins
    );
    const positionUpRightline = filtertillcoinnotfound(
      firstBishopLine([row, col]),
      color,
      coins
    );
    const positionUpleftline = filtertillcoinnotfound(
      DownsBishopLine([row, col]),
      color,
      coins
    );
    return positionDownlineRight
      .concat(positionUplineleft)
      .concat(positionUpRightline)
      .concat(positionUpleftline);
  }

  function secondBishopLine([row, col]) {
    var x = [[row, col]];
    for (var i = row + 1; i < 8; i++) {
      x.push([i, x[x.length - 1][1] + 1]);
    }
    var filter = x.filter(validPosition);
    return zerothArrayofIndex(filter);
  }

  function UpBishopLine([row, col]) {
    var y = [[row, col]];
    for (var i = 7; i > 0; i--) {
      y.push([y[y.length - 1][0] - 1, y[y.length - 1][1] - 1]);
    }
    var filter = y.filter(validPosition);
    return zerothArrayofIndex(filter);
  }

  function firstBishopLine([row, col]) {
    var a = [[row, col]];
    for (var i = 7; i > 0; i--) {
      a.push([a[a.length - 1][0] - 1, a[a.length - 1][1] + 1]);
    }
    var filter = a.filter(validPosition);
    return zerothArrayofIndex(filter);
  }

  function DownsBishopLine([row, col]) {
    var w = [[row, col]];
    for (var i = 7; i > 0; i--) {
      w.push([w[w.length - 1][0] + 1, w[w.length - 1][1] - 1]);
    }
    var filter = w.filter(validPosition);
    return zerothArrayofIndex(filter);
  }

  function RookPosibleLine([row, col], color, coins) {
    const RookList1 = filtertillcoinnotfound(posiblemoveforRookLine([row, col]), color, coins);
    const RookList2 = filtertillcoinnotfound(posiblemoveforRookLinedown([row, col]), color, coins)
    const RookList3 = filtertillcoinnotfound(posiblemoveforRookLinesUpoN([row, col]), color, coins)
    const RookList4 = filtertillcoinnotfound(posiblemoveforRookLinesDownoN([row, col]), color, coins)
    return RookList1.concat(RookList2).concat(RookList3).concat(RookList4)
  }
  function posiblemoveforRookLine([row, col]) {
    var x = [[row, col + 1]]
    for (var i = col + 1; i < 7; i++) {
      x.push([row, i + 1])

    }
    return x.filter(validPosition)
  }
  // ---->
  function posiblemoveforRookLinedown([row, col]) {
    var arr = [[row + 1, col]]
    for (var i = row + 1; i < 8; i++) {
      arr.push([i + 1, col])
    }
    return arr.filter(validPosition)
  }
  //------down ***

  function posiblemoveforRookLinesUpoN([row, col]) {
    var x = [[row, col - 1]]
    for (var i = col - 1; i > 0; i--) {
      x.push([row, i - 1])
    }
    return x.filter(validPosition)
  }
  // <------

  function posiblemoveforRookLinesDownoN([row, col]) {
    var arr = [[row - 1, col]]
    for (var i = row - 1; i > 0; i--) {
      arr.push([i - 1, col])
    }
    return arr.filter(validPosition)
  }
  // ----^^^^^-------
  function QueenPosibleLine([row, col], color, coins) {
    const Rook = RookPosibleLine([row, col], color, coins);
    const Bishop = possibleBishopMoves([row, col], color, coins)
    const RookBishopconcat = Rook.concat(Bishop)
    return RookBishopconcat
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

  function sippaifillter(currentLocation,color,coins){
    var filtermove = sippaiMove(currentLocation,color)
    return filtertillcoinnotfound(filtermove,color,coins)
  }

  function getCoinOnpos(coins, pos) {
    var white = coins.white;
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
    var whiteBishop = coins.white.Bishop;
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
    var black = coins.black;
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
    var blackKnight = coins.black.Knight;
    var BlackKnightleft = blackKnight.Left;
    if (isSamePos(pos)(BlackKnightleft)) {
      return ["black", "Knight", "Left"];
    }
    var blackKnightRight = blackKnight.Right;
    if (isSamePos(pos)(blackKnightRight)) {
      return ["black", "Knight", "Right"];
    }
    var blackBishop = coins.black.Bishop;
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
          Right: [4, 4],
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
        Queen: [5, 5],
        King: [0, 4],
        sippai: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7]]
      }
    };
  }

  Chess.prototype.getPosOfCoin = function (coinPath) {
    return coinPath.reduce(function (prevObj, currentKey) {
      return prevObj[currentKey];
    }, this.coins);
  };

  Chess.prototype.canMoveRook = function (moveLocation, color, rookSide) {
    const currentLocation = this.coins[color].Rook[rookSide];
    return RookMove(currentLocation, moveLocation);
  };

  Chess.prototype.moveRook = function (moveLocation, color, rookSide) {
    if (this.canMoveRook(moveLocation, color, rookSide)) {
      this.coins[color].Rook[rookSide] = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };

  Chess.prototype.selectCoin = function (coinPath) {
    // it is unsafe. because, we didn't validate coinpath
    this.selectedCoin = coinPath;
  };

  Chess.prototype.canMoveBishop = function (moveLocation, color, bishopSide) {
    const currentLocation = this.coins[color].Bishop[bishopSide];
    return BishopMove(currentLocation, moveLocation);
  };

  Chess.prototype.moveBishop = function (moveLocation, color, bishopSide) {
    if (this.canMoveBishop(moveLocation, color, bishopSide)) {
      this.coins[color].Bishop[bishopSide] = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };
  Chess.prototype.canMoveKnight = function (moveLocation, color, KnightSide) {
    const currentLocation = this.coins[color].Knight[KnightSide];
    const knightMoves = knightmove(currentLocation);
    return knightMoves.some(isSamePos(moveLocation));
  };
  Chess.prototype.moveKnight = function (moveLocation, color, KnightSide) {
    if (this.canMoveKnight(moveLocation, color, KnightSide)) {
      this.coins[color].Knight[KnightSide] = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };
  Chess.prototype.canMoveQueen = function (moveLocation, color) {
    const currentLocation = this.coins[color].Queen;
    return (
      RookMove(currentLocation, moveLocation) ||
      BishopMove(currentLocation, moveLocation)
    );
  };

  Chess.prototype.moveQueen = function (moveLocation, color) {
    if (this.canMoveQueen(moveLocation, color)) {
      this.coins[color].Queen = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };

  Chess.prototype.canMoveKing = function (moveLocation, color) {
    const currentLocation = this.coins[color].King;
    const kingMoves = kingMove(currentLocation);
    return kingMoves.some(isSamePos(moveLocation));
  };

  Chess.prototype.moveKing = function (moveLocation, color) {
    if (this.canMoveKing(moveLocation, color)) {
      this.coins[color].King = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };

  Chess.prototype.canMovesippai = function (moveLocation, color, number) {
    const currentLocation = this.coins[color].sippai[number];
    const sippaiMoves = sippaiMove(currentLocation, color);
    return sippaiMoves.some(isSamePos(moveLocation));
  };

  Chess.prototype.movesippai = function (moveLocation, color, number) {
    if (this.canMovesippai(moveLocation, color, number)) {
      this.coins[color].sippai = moveLocation;
      return moveLocation;
    }
    throw Error("Invalid Move");
  };
  Chess.prototype.getPosibleMoves = function (currentLocation) {
    const currentCoin = getCoinOnpos(this.coins, currentLocation); // ["White", "sippai", 0]
    // console.log(currentCoin,"ddd")
    var current = currentCoin[1];
    var currentColor = currentCoin[0];
    switch (current) {
      case "king":
        return kingMove(currentLocation, currentColor, this.coins);
      case "Queen":
        return QueenPosibleLine(currentLocation, currentColor, this.coins);
      case "Rook":
        return RookPosibleLine(currentLocation, currentColor, this.coins);
      case "Bishop":
        return possibleBishopMoves(currentLocation, currentColor, this.coins);
      case "Knight":
        return knightmove(currentLocation, currentColor, this.coins);
      case "sippai":
        return sippaifillter(currentLocation, currentColor,this.coins);
      default:
        return null
    }
  };

  Chess.prototype.getCoinOnpos = function (pos) {
    return getCoinOnpos(this.coins, pos);
  };

  Chess.prototype.move = function (currentLocation, moveLocation) {
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

  function filtertillcoinnotfound(posiblemoves, color, coins) {
    var filteredPosiblemove = [];
    for (let i = 0; i < posiblemoves.length; i++) {
      const currentmove = posiblemoves[i];
      var currentcoin = getCoinOnpos(coins, currentmove)
      if (currentcoin == null) {
        filteredPosiblemove.push(currentmove)
      } else {
        if (color == currentcoin[0]) {
          break;
        } else {
          filteredPosiblemove.push(currentmove);
          break;
        }

      }
    }
    return filteredPosiblemove;
  }
  //console.log(filtertillcoinnotfound(chees.getPosibleMoves ([0,0])))


  function filterposionONcolor(posiblemoves, color, coins) {
    var filteredPosiblemoveble = [];
    var filterEqualcolor = [];
    for (let i = 0; i < posiblemoves.length; i++) {
      const currentmove = posiblemoves[i];
      var currentcoin = getCoinOnpos(coins, currentmove)
      if (currentcoin == null) {
        filteredPosiblemoveble.push(currentmove)

      } else {
        if (color == currentcoin[0]) {
          filterEqualcolor.push(currentmove)
        } else {
          filteredPosiblemoveble.push(currentmove);
        }

      }
    }
    //console.log(filteredPosiblemoveble, "assss")
    return filteredPosiblemoveble;
  }
  
  

  exports.Chess = Chess;
  // Chess.prototype.canMoveKnight = function (moveLocation, color, KnightSide) {
  // Chess.prototype.moveKnight = function (moveLocation, color, KnightSide)
})((chess = {}));



