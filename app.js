// set up Squares
class Square {
  constructor(index, name, price, rent, color, canBeBrought) {
    this.index = index;
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

const go = new Square(0, 'Go', null, null, 'white', false);
const oldKentRoad = new Square(1, 'Old Kent Road', 60, 2, brown, true);
const communityChest1 = new Square(2, 'Community Chest', null, null, 'white', false);
const whitechapelRoad = new Square(3, 'Whitechapel Road', 60, 4, brown, true);
const incomeTax = new Square(4, 'Income Tax', null, null, 'white', false);
const kingsCross = new Square(5, 'Kings Cross Station', 200, 25, 'white', true);
const angelIslington = new Square(6, 'The Angel Islington', 100, 6, lightBlue, true);
const chance1 = new Square(7, 'Chance', null, null, 'white', false);
const eustonRoad = new Square(8, 'Euston Road', 100, 6, lightBlue, true);
const pentonvilleRoad = new Square(9, 'Pentonville Road', 120, 8, lightBlue, true);
const jail = new Square(10, 'Jail', null, null, 'white', false);
const pallMall = new Square(11, 'Pall Mall', 140, 10, pink, true);
const electric = new Square(12, 'Electric Company', 150, 20, 'white', true);
const whitehall = new Square(13, 'Whitehall', 140, 10, pink, true);
const northumberLand = new Square(14, 'NorthumberLand Road', 160, 12, pink, true);
const fenchurch = new Square(15, 'Fenchurch Street Station', 200, 25, 'white', true);
const bow = new Square(16, 'Bow Street', 180, 14, orange, true);
const communityChest2 = new Square(17, 'Community Chest', null, null, false);
const marlborough = new Square(18, 'Marlborough Street', 180, 14, orange, true);
const vine = new Square(19, 'Vine Street', 200, 16, orange, true);
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

const board = [ go, oldKentRoad, communityChest1, whitechapelRoad, incomeTax,
  kingsCross, angelIslington, chance1, eustonRoad, pentonvilleRoad, jail
  // pallMall, electric, whitehall, northumberLand, fenchurch, bow, communityChest2,
  // marlborough, vine
];

$(() => {
  let isPlayer1Turn = true;
  let currentPlayer;
  let doubles = false;

  const $playerName = $('#playerName');
  const $description = $('#description');


  const $playerMoney = $('#playerMoney');

  const $rollButton = $('#rollButton');
  const $buyButton = $('#buyButton');
  const $endTurnButton = $('#endTurnButton');
  const $previewForward = $('#previewForward');
  const $previewBackwards = $('#previewBackwards');

  class DisplaySquare {
    constructor(name, currentDisplayed) {
      this.assignedLocation = currentDisplayed;
      this.$squareColor = $(`#${name}SquareColor`);
      this.$squareName = $(`.${name}SquareName`);
      this.$squareValue = $(`#${name}SquareValue`);
      this.$squareOwner = $(`#${name}SquareOwner`);
      this.$square = $(`#${name}Square`);
      this.$player1Piece = $(`#player1Piece${name}Square`);
      this.$player2Piece = $(`#player2Piece${name}Square`);
    }
    updateSquareDisplay() {
      let squareText = '-';

      if(this.assignedLocation.canBeBrought && !this.assignedLocation.owner) {
        squareText = 'For Sale';
      } else if(this.assignedLocation.canBeBrought && this.assignedLocation.owner) {
        squareText = `Owned by ${this.assignedLocation.owner.name}`;
      }

      this.$squareColor.css('backgroundColor', this.assignedLocation.color);

      this.$squareName.html(this.assignedLocation.name);

      this.$squareValue.html(this.assignedLocation.price || '-');

      this.$squareOwner.html(squareText);

      if(this.assignedLocation.owner) {
        this.$square.css('backgroundColor', this.assignedLocation.owner.color);
      } else {
        this.$square.css('backgroundColor', 'rgb(199, 230, 197)');
      }
      if(this.assignedLocation.player1) {
        this.$player1Piece.css('backgroundImage', `url(./images/${player1.piece}.jpeg)`);
      } else {
        this.$player1Piece.css('backgroundImage', '');
      }
      if(this.assignedLocation.player2) {
        this.$player2Piece.css('backgroundImage', `url(./images/${player2.piece}.jpeg)`);
      } else {
        this.$player2Piece.css('backgroundImage', '');
      }
    }
  }

  const displayedSquares = {
    previous: new DisplaySquare('previous', board[board.length -1]),
    current: new DisplaySquare('current', board[0]),
    next: new DisplaySquare('next', board[1])
  };

  console.log('displayedSquares', displayedSquares);

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
      Object.keys(displayedSquares).forEach(square => displayedSquares[square].updateSquareDisplay());
      // if(currentSquare.owner) {
      //   if(currentSquare.owner.name !== this.name) {
      //     payRent();
      //   }
      // } else {
      //   // makeBuyAvaible();
      // }
      // // endTurn();
    }
    movePlayer(distance) {
      // if(this.name === 'Player 1') {
      //   currentSquare.player1 = false;
      // } else {
      //   currentSquare.player2 = false;
      // }
      // this.location += distance;
      // if(this.location >= board.length) {
      //   this.location = board.length - (this.location - board.length);
      //   this.money += 200;
      // }
      // this.currentSquare = board[this.location];
      //
      // if(this.location === 0){
      //   previousSquare = board[board.length - 1];
      // } else {
      //   previousSquare = board[this.location - 1];
      // }
      // if(this.location === board.length -1) {
      //   nextSquare = board[0];
      // } else {
      //   nextSquare = board[this.location + 1];
      // }
      //
      // currentSquare = board[this.location];
      //
      // if(this.name === 'Player 1') {
      //   currentSquare.player1 = true;
      // } else {
      //   currentSquare.player2 = true;
      // }
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

  // function payRent() {
  //   let otherPlayer;
  //   if(isPlayer1Turn) {
  //     otherPlayer = player2;
  //   } else {
  //     otherPlayer = player1;
  //   }
  //   displayedSquares.current.$square.css('backgroundColor', currentPlayer.color);
  //   currentPlayer.money -= currentSquare.rent;
  //   otherPlayer.money += currentSquare.rent;
  //   $description.html(` pays ${otherPlayer.name} £${currentSquare.rent} for landing on `);
  // }

  // function buy() {
  //   currentSquare.owner = currentPlayer;
  //   displayedSquares.current.$square.css('backgroundColor', currentPlayer.color);
  //   displayedSquares.current.$squareOwner.html(`Owned by ${currentPlayer.name}`);
  //   currentPlayer.money -= currentSquare.price;
  //   $playerMoney.html(currentPlayer.money);
  //   $buyButton.css('backgroundColor', 'white');
  //   $buyButton.off('click');
  // }

  // function endTurn() {
  //   $endTurnButton.on('click', () => {
  //     if(!doubles) {
  //       isPlayer1Turn = !isPlayer1Turn;
  //     }
  //     isPlayer1Turn ? currentPlayer = player1 : currentPlayer = player2;
  //     setUp();
  //     $endTurnButton.off('click');
  //     $rollButton.on('click', () => {
  //       isPlayer1Turn ? player1.roll() : player2.roll();
  //       $rollButton.off('click');
  //     });
  //   });
  // }

  // function makeBuyAvaible() {
  //   console.log('buy!!!');
  //   if(currentSquare.canBeBrought) {
  //     $buyButton.css('backgroundColor', 'green');
  //     $buyButton.on('click', buy);
  //   }
  // }

  // function updatePlayerLocation() {
  //   $playerName.html(currentPlayer.name);
  //   $description.html(' is on ');
  // }

  function moveBoard(direction) {
    const forward = direction === 'forward';
    console.log('forward', forward);

    let newPreviousIndex;
    let newNextIndex;

    const currentLocation = displayedSquares.current.assignedLocation;
    let newCurrentIndex;
    forward ?  newCurrentIndex = currentLocation.index + 1 : newCurrentIndex = currentLocation.index - 1;

    const lastBoardElement = board.length - 1;

    if(newCurrentIndex === 0) {
      newPreviousIndex = lastBoardElement;
      newNextIndex = newCurrentIndex + 1;
    } else if(newCurrentIndex < 0) {
      newCurrentIndex = lastBoardElement;
      newNextIndex = 0;
      newPreviousIndex = newCurrentIndex - 1;
    } else if(newCurrentIndex === lastBoardElement) {
      newPreviousIndex = newCurrentIndex - 1;
      newNextIndex = 0;
    } else if(newCurrentIndex > lastBoardElement) {
      newCurrentIndex = 0;
      newPreviousIndex = lastBoardElement;
      newNextIndex = 1;
    } else if(newCurrentIndex !== 0 && newCurrentIndex !== lastBoardElement) {
      newPreviousIndex = newCurrentIndex - 1;
      newNextIndex = newCurrentIndex + 1;
    }

    displayedSquares.current.assignedLocation = board[newCurrentIndex];
    displayedSquares.previous.assignedLocation = board[newPreviousIndex];
    displayedSquares.next.assignedLocation = board[newNextIndex];

    Object.keys(displayedSquares).forEach(square => {
      displayedSquares[square].updateSquareDisplay();
    });



//NOTE: FIX THIS ⬆️🤮


    // Object.keys(displayedSquares).forEach(square => {
    //   displayedSquares[square].updateSquareDisplay();
    // });
  }

  function setUp() {
    $playerName.html(currentPlayer.name);
    $description.html(' is on ');

    Object.keys(displayedSquares).forEach(square => {
      displayedSquares[square].updateSquareDisplay();
    });
    $previewForward.on('click', () => moveBoard('forward'));
    $previewBackwards.on('click', () => moveBoard('backwards'));
    $rollButton.on('click', () => {
      isPlayer1Turn ? player1.roll() : player2.roll();
      $rollButton.off('click');
    });
  }

  currentPlayer = player1;
  setUp();

});
