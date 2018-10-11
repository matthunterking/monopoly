// set up Squares
  class Square {
    constructor(name, price, rent, color, canBeBrought) {
      this.name = name;
      this.price = price;
      this.rent = rent;
      this.owner = null;
      this.color = color;
      this.canBeBrought = canBeBrought;
      this.player1 = false;
      this.player2 = false;
    }
  }

  const brown = '#BA9149';
  const lightBlue = '#C0F7FC';
  const pink = '#f00093';
  const orange = '#ff9200';
  const red = '#f90000';
  const yellow = '#f9fb00';
  const green = '#00bb52';
  const darkBlue = '#006ac3';

  const go = new Square('Go', null, null, 'white', false);
  const oldKentRoad = new Square('Old Kent Road', 60, 2, brown, true);
  const communityChest1 = new Square('Community Chest', null, null, 'white', false);
  const whitechapelRoad = new Square('Whitechapel Road', 60, 4, brown, true);
  const incomeTax = new Square('Income Tax', null, null, 'white', false);
  const kingsCross = new Square('Kings Cross Station', 200, 25, 'white', true);
  const angelIslington = new Square('The Angel Islington', 100, 6, lightBlue, true);
  const chance1 = new Square('Chance', null, null, 'white', false);
  const eustonRoad = new Square('Euston Road', 100, 6, lightBlue, true);
  const pentonvilleRoad = new Square('Pentonville Road', 120, 8, lightBlue, true);
  const jail = new Square('Jail', null, null, 'white', false);
  const pallMall = new Square('Pall Mall', 140, 10, pink, true);
  const electric = new Square('Electric Company', 150, 20, 'white', true);
  const whitehall = new Square('Whitehall', 140, 10, pink, true);
  const northumberLand = new Square('NorthumberLand Road', 160, 12, pink, true);
  const fenchurch = new Square('Fenchurch Street Station', 200, 25, 'white', true);
  const bow = new Square('Bow Street', 180, 14, orange, true);
  const communityChest2 = new Square('Community Chest', null, null, false);
  const marlborough = new Square('Marlborough Street', 180, 14, orange, true);
  const vine = new Square('Vine Street', 200, 16, orange, true);
  // 20: new Square(20, null, null),
  // 21: new Square(21, 220, 18),
  // 22: new Square(22, null, null),
  // 23: new Square(23, 220, 18),
  // 24: new Square(24, 240, 20),
  // 25: new Square(25, 200, 25),
  // 26: new Square(26, 260, 22),
  // 27: new Square(27, 260, 22),
  // 28: new Square(28, 150, 20),
  // 29: new Square(29, 280, 22),
  // 30: new Square(30, null, null),
  // 31: new Square(31, 300, 26),
  // 32: new Square(32, 300, 26),
  // 33: new Square(33, null, null),
  // 34: new Square(34, 320, 28),
  // 35: new Square(35, 200, 25),
  // 36: new Square(36, null, null),
  // 37: new Square(37, 350, 35),
  // 38: new Square(38, null, null),
  // 39: new Square(39, 400, 50)

  // const Mayfair = new Square('Mayfair', 400, 50, 'darkBlue', true);

  const board = [
    go,
    oldKentRoad,
    communityChest1,
    whitechapelRoad,
    incomeTax,
    kingsCross,
    angelIslington,
    chance1,
    eustonRoad,
    pentonvilleRoad,
    jail,
    pallMall,
    electric,
    whitehall,
    northumberLand,
    fenchurch,
    bow,
    communityChest2,
    marlborough,
    vine
  ];












$(() => {
  let isPlayer1Turn = true;
  let currentPlayer;
  let doubles = false;

  let previousSquare = board[board.length -1];
  let currentSquare = board[0];
  let nextSquare = board[1];

  const $playerName = $('#playerName');
  const $description = $('#description');



  const $previousSquareColor = $('#previousSquareColor');
  const $previousSquareName = $('.previousSquareName');
  const $previousSquareValue = $('#previousSquareValue');
  const $previousSquareOwner = $('#previousSquareOwner');
  const $previousSquare = $('#previousSquare');
  const $player1PiecePreviousSquare = $('#player1PiecePreviousSquare');
  const $player2PiecePreviousSquare = $('#player2PiecePreviousSquare');

  const $currentSquareColor = $('#currentSquareColor');
  const $currentSquareName = $('.currentSquareName');
  const $currentSquareValue = $('#currentSquareValue');
  const $currentSquareOwner = $('#currentSquareOwner');
  const $currentSquare = $('#currentSquare');
  const $player1PieceCurrentSquare = $('#player1PieceCurrentSquare');
  const $player2PieceCurrentSquare = $('#player2PieceCurrentSquare');

  const $nextSquareColor = $('#nextSquareColor');
  const $nextSquareName = $('.nextSquareName');
  const $nextSquareValue = $('#nextSquareValue');
  const $nextSquareOwner = $('#nextSquareOwner');
  const $nextSquare = $('#nextSquare');
  const $player1PieceNextSquare = $('#player1PieceNextSquare');
  const $player2PieceNextSquare = $('#player2PieceNextSquare');

  const $playerMoney = $('#playerMoney');

  const $rollButton = $('#rollButton');
  const $buyButton = $('#buyButton');
  const $endTurnButton = $('#endTurnButton');

  class Player {
    constructor(name, piece, color) {
      this.name = name;
      this.piece = piece;
      this.money = 1000;
      this.location = 0;
      this.currentSquare = board[0];
      this.color = color;
    }
    roll() {
      const distance = rollDice();
      this.movePlayer(distance);
      updateSquaresDisplay();
      if(currentSquare.owner) {
        if(currentSquare.owner.name !== this.name) {
          payRent();
        }
      } else {
        makeBuyAvaible();
      }
      endTurn();
    }
    movePlayer(distance) {
      if(this.name === 'Player 1') {
        currentSquare.player1 = false;
      } else {
        currentSquare.player2 = false;
      }
      this.location += distance;
      if(this.location >= board.length) {
        this.location = board.length - (this.location - board.length);
        this.money += 200;
      }
      this.currentSquare = board[this.location];

      if(this.location === 0){
        previousSquare = board[board.length - 1];
      } else {
        previousSquare = board[this.location - 1];
      }
      if(this.location === board.length -1) {
        nextSquare = board[0];
      } else {
        nextSquare = board[this.location + 1];
      }

      currentSquare = board[this.location];

      if(this.name === 'Player 1') {
        currentSquare.player1 = true;
      } else {
        currentSquare.player2 = true;
      }
    }
  }



  const player1 = new Player('Player 1', 'dog', 'pink');
  const player2 = new Player('Player 2', 'car', 'lime');



  function rollDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    $('#die1').html(die1);
    $('#die2').html(die2);
    if(die1 === die2) {
      doubles = true;
    }
    return die1 + die2;
  }

  function payRent() {
    let otherPlayer;
    if(isPlayer1Turn) {
      otherPlayer = player2;
    } else {
      otherPlayer = player1;
    }
    $currentSquare.css('backgroundColor', currentPlayer.color);
    currentPlayer.money -= currentSquare.rent;
    otherPlayer.money += currentSquare.rent;
    $description.html(` pays ${otherPlayer.name} £${currentSquare.rent} for landing on `);
  }

  function buy() {
    currentSquare.owner = currentPlayer;
    $currentSquare.css('backgroundColor', currentPlayer.color);
    $currentSquareOwner.html(`Owned by ${currentPlayer.name}`);
    currentPlayer.money -= currentSquare.price;
    $playerMoney.html(currentPlayer.money);
    $buyButton.css('backgroundColor', 'white');
    $buyButton.off('click');
  }

  function endTurn() {
    $endTurnButton.on('click', () => {
      if(!doubles) {
        isPlayer1Turn = !isPlayer1Turn;
      }
      isPlayer1Turn ? currentPlayer = player1 : currentPlayer = player2;
      setUp();
      $endTurnButton.off('click');
      $rollButton.on('click', () => {
        isPlayer1Turn ? player1.roll() : player2.roll();
        $rollButton.off('click');
      });
    });
  }

  function makeBuyAvaible() {
    console.log('buy!!!');
    if(currentSquare.canBeBrought) {
      $buyButton.css('backgroundColor', 'green');
      $buyButton.on('click', buy);
    }
  }

  function updatePlayerLocation() {
    $playerName.html(currentPlayer.name);
    $description.html(' is on ');
  }

  function updateSquaresDisplay() {
    let currentSquareText = '-';
    let previousSquareText = '-';
    let nextSquareText = '-';

    if(currentSquare.canBeBrought && !currentSquare.owner) {
      currentSquareText = 'For Sale';
    } else if(currentSquare.canBeBrought && currentSquare.owner) {
      currentSquareText = `Owned by ${currentSquare.owner.name}`;
    }
    if(previousSquare.canBeBrought && !previousSquare.owner) {
      previousSquareText = 'For Sale';
    } else if(previousSquare.canBeBrought && previousSquare.owner) {
      previousSquareText = `Owned by ${previousSquare.owner.name}`;
    }
    if(nextSquare.canBeBrought && !nextSquare.owner) {
      nextSquareText = 'For Sale';
    } else if(nextSquare.canBeBrought && nextSquare.owner) {
      nextSquareText = `Owned by ${nextSquare.owner.name}`;
    }

    $previousSquareColor.css('backgroundColor', previousSquare.color);
    $previousSquareName.html(previousSquare.name);
    $previousSquareValue.html(previousSquare.price || '-');
    $previousSquareOwner.html(previousSquareText);
    if(previousSquare.owner) {
      $previousSquare.css('backgroundColor', previousSquare.owner.color);
    } else {
      $previousSquare.css('backgroundColor', 'rgb(199, 230, 197)');
    }
    if(previousSquare.player1) {
      $player1PiecePreviousSquare.css('backgroundImage', `url(./images/${player1.piece}.jpeg)`);
    } else {
      $player1PiecePreviousSquare.css('backgroundImage', '');
    }
    if(previousSquare.player2) {
      $player2PiecePreviousSquare.css('backgroundImage', `url(./images/${player2.piece}.jpeg)`);
    } else {
      $player2PiecePreviousSquare.css('backgroundImage', '');
    }

    $currentSquareColor.css('backgroundColor', currentSquare.color);
    $currentSquareName.html(currentSquare.name);
    $currentSquareValue.html(currentSquare.price || '-');
    $currentSquareOwner.html(currentSquareText);
    if(currentSquare.owner) {
      $currentSquare.css('backgroundColor', currentSquare.owner.color);
    } else {
      $currentSquare.css('backgroundColor', 'rgb(199, 230, 197)');
    }
    if(currentSquare.player1) {
      $player1PieceCurrentSquare.css('backgroundImage', `url(./images/${player1.piece}.jpeg)`);
    } else {
      $player1PieceCurrentSquare.css('backgroundImage', '');
    }
    if(currentSquare.player2) {
      $player2PieceCurrentSquare.css('backgroundImage', `url(./images/${player2.piece}.jpeg)`);
    } else {
      $player2PieceCurrentSquare.css('backgroundImage', '');
    }

    $nextSquareColor.css('backgroundColor', nextSquare.color);
    $nextSquareName.html(nextSquare.name);
    $nextSquareValue.html(nextSquare.price || '-');
    $nextSquareOwner.html(nextSquareText);
    if(nextSquare.owner) {
      $nextSquare.css('backgroundColor', nextSquare.owner.color);
    } else {
      $nextSquare.css('backgroundColor', 'rgb(199, 230, 197)');
    }
    if(nextSquare.player1) {
      $player1PieceNextSquare.css('backgroundImage', `url(./images/${player1.piece}.jpeg)`);
    } else {
      $player1PieceNextSquare.css('backgroundImage', '');
    }
    if(nextSquare.player2) {
      $player2PieceNextSquare.css('backgroundImage', `url(./images/${player2.piece}.jpeg)`);
    } else {
      $player2PieceNextSquare.css('backgroundImage', '');
    }
  }

  function setUp() {
    $playerName.html(currentPlayer.name);
    $description.html(' is on ');
    $rollButton.on('click', () => {
      isPlayer1Turn ? player1.roll() : player2.roll();
      $rollButton.off('click');
    });
    currentSquare.player1 = true;
    currentSquare.player2 = true;
    updateSquaresDisplay();
  }

  currentPlayer = player1;
  setUp();

});
