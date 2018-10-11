$(() => {

  let isPlayer1Turn = true;
  let doubles = false;

  const $playerName = $('#playerName');
  const $description = $('#description');

  const $previousSquareColor = $('#previousSquareColor');
  const $previousSquareName = $('.previousSquareName');
  const $previousSquareValue = $('#previousSquareValue');

  const $currentSquareColor = $('#currentSquareColor');
  const $currentSquareName = $('.currentSquareName');
  const $currentSquareValue = $('#currentSquareValue');

  const $nextSquareColor = $('#nextSquareColor');
  const $nextSquareName = $('.nextSquareName');
  const $nextSquareValue = $('#nextSquareValue');

  function rollDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    $('#die1').html(die1);
    $('#die2').html(die2);
    if(die1 !== die2) {
      doubles = true;
    }
    return die1 + die2;
  }

  function updateDom() {
    let currentPlayer;
    isPlayer1Turn ? currentPlayer = player1 : currentPlayer = player2;

    let previousSquareIndex;
    let nextSquareIndex;

    if(currentPlayer.location === 0){
      previousSquareIndex = board.length - 1;
    } else {
      previousSquareIndex = currentPlayer.location - 1;
    }
    if(currentPlayer.location === board.length) {
      nextSquareIndex = 0;
    } else {
      nextSquareIndex = currentPlayer.location + 1;
    }


    const currentSquare = board[currentPlayer.location];
    const previousSquare = board[previousSquareIndex];
    const nextSquare = board[nextSquareIndex];
    console.log(previousSquare, currentSquare, nextSquare);

    $playerName.html(currentPlayer.name);
    $description.html(' is on ');
    $currentSquareName.html(currentPlayer.currentSquare.name);

    $previousSquareColor.css('backgroundColor', previousSquare.color);
    $previousSquareName.html(previousSquare.name);
    $previousSquareValue.html(previousSquare.price);

    $currentSquareColor.css('backgroundColor', currentSquare.color);
    $currentSquareName.html(currentSquare.name);
    $currentSquareValue.html(currentSquare.price);

    $nextSquareColor.css('backgroundColor', nextSquare.color);
    $nextSquareName.html(nextSquare.name);
    $nextSquareValue.html(nextSquare.price);
  }

  class Player {
    constructor(name, piece) {
      this.name = name;
      this.piece = piece;
      this.money = 1000;
      this.location = 0;
      this.currentSquare = board[0];
    }
    roll() {
      const distance = rollDice();
      this.location += distance;
      if(this.location >= board.length) {
        this.location -= board.length;
      }
      this.currentSquare = board[this.location];
      updateDom();
      isPlayer1Turn = !isPlayer1Turn;
      console.log('roll by', this.name, this.currentSquare);
    }
  }

  class Square {
    constructor(name, price, rent, color) {
      this.name = name;
      this.price = price;
      this.rent = rent;
      this.owner = null;
      this.color = color;
    }
  }

  const brown = '#BA9149';
  const lightBlue = '#C0F7FC';

  const go = new Square('Go', null, null, 'white');
  const oldKentRoad = new Square('Old Kent Road', 60, 2, brown);
  const communityChest1 = new Square('Community Chest', null, null, 'white');
  const whitechapelRoad = new Square('Whitechapel Road', 60, 4, brown);
  const incomeTax = new Square('Income Tax', null, null, 'white');
  const kingsCross = new Square('Kings Cross Station', 200, 25, 'white');
  const angelIslington = new Square('The Angel Islington', 100, 6, lightBlue);
  const chance1 = new Square('Chance', null, null, 'white');
  const eustonRoad = new Square('Euston Road', 100, 6, lightBlue);
  const pentonvilleRoad = new Square('Pentonville Road', 120, 8, lightBlue);
  // 10: new Square(10, null, null),
  // 11: new Square(11, 140, 10),
  // 12: new Square(12, 150, 20),
  // 13: new Square(13, 140, 10),
  // 14: new Square(14, 160, 12),
  // 15: new Square(15, 200, 25),
  // 16: new Square(16, 180, 14),
  // 17: new Square(17, null, null),
  // 18: new Square(18, 180, 14),
  // 19: new Square(19, 200, 16),
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

  const Mayfair = new Square('Mayfair', 400, 50, 'darkBlue');


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
    Mayfair
  ];

  const player1 = new Player('Player 1', 'dog');
  const player2 = new Player('Player 2', 'car');

  $('#rollButton').on('click', () => {
    isPlayer1Turn ? player1.roll() : player2.roll();
  });





  // class Player {
  //   constructor(id, name, piece, color) {
  //     this.id = id;
  //     this.name = name;
  //     this.money = 1000;
  //     this.position = 0;
  //     this.$playerMoney = $(`#player${id}Money`);
  //     this.piece = piece;
  //     this.color = color;
  //   }
  //   roll() {
  //     const startPosition = this.position;
  //     const die1 = Math.floor(Math.random() * 6) + 1;
  //     const die2 = Math.floor(Math.random() * 6) + 1;
  //     $('.die1').html(die1);
  //     $('.die2').html(die2);
  //     let newPosition = this.position + die1 + die2;
  //     if(newPosition > 39) {
  //       newPosition -= 39;
  //       this.money += 200;
  //     }
  //
  //     this.position = newPosition;
  //     if(currentPlayer.id === 1) {
  //       board[startPosition].$player1Display.html('');
  //       board[newPosition].$player1Display.html(this.piece);
  //     } else {
  //       board[startPosition].$player2Display.html('');
  //       board[newPosition].$player2Display.html(this.piece);
  //     }
  //
  //     if(!board[newPosition].owner) {
  //       $('.buy').on('click', () => {
  //         if(board[newPosition].price) {
  //           board[newPosition].owner = currentPlayer;
  //           currentPlayer.money -= board[newPosition].price;
  //           currentPlayer.$playerMoney.html(currentPlayer.money);
  //           board[newPosition].$square.css('backgroundColor', currentPlayer.color);
  //           const squareName = board[newPosition].$square.html();
  //           $('.display').html(`${currentPlayer.name} brought ${squareName}`);
  //         } else {
  //           const squareName = board[newPosition].$square.html();
  //           $('.display').html(`You cannot buy ${squareName}`);
  //         }
  //         $('.buy').off('click');
  //       });
  //
  //     } else {
  //       if(board[newPosition].owner.id !== currentPlayer.id) {
  //         currentPlayer.money -= board[newPosition].rent;
  //         if(currentPlayer.id === 1) {
  //           player2.money += board[newPosition].rent;
  //           player2.$playerMoney.html(player2.money);
  //           $('.display').html(`${currentPlayer.name} paid ${board[newPosition].rent} to ${player2.name}`);
  //         } else {
  //           player1.money += board[newPosition].rent;
  //           player1.$playerMoney.html(player1.money);
  //           $('.display').html(`${currentPlayer.name} paid ${board[newPosition].rent} to ${player1.name}`);
  //         }
  //       }
  //     }
  //
  //
  //
  //     currentPlayer.id === 1 ? currentPlayer = player2 : currentPlayer = player1;
  //   }
  // }
  //
  // const player1 = new Player(1, 'Ellie', '🎅🏻', 'peachpuff');
  // const player2 = new Player(2, 'Matt', '🚗', 'steelblue');
  //
  // let currentPlayer = player1;
  //
  //



});
