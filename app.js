$(() => {

  class SquareOnBoard {
    constructor(id, price, rent) {
      this.id = id;
      this.$player1Display = $(`#${id} .player1`);
      this.$player2Display = $(`#${id} .player2`);
      this.$square = $(`#${id}`);
      this.price = price;
      this.rent = rent;
      this.owner = null;
    }
  }

  const board = {
    0: new SquareOnBoard(0, null, null),
    1: new SquareOnBoard(1, 60, 2),
    2: new SquareOnBoard(2, null, null),
    3: new SquareOnBoard(3, 60, 4),
    4: new SquareOnBoard(4, null, null),
    5: new SquareOnBoard(5, 200, 25),
    6: new SquareOnBoard(6, 100, 6),
    7: new SquareOnBoard(7, null, null),
    8: new SquareOnBoard(8, 100, 6),
    9: new SquareOnBoard(9, 120, 8),
    10: new SquareOnBoard(10, null, null),
    11: new SquareOnBoard(11, 140, 10),
    12: new SquareOnBoard(12, 150, 20),
    13: new SquareOnBoard(13, 140, 10),
    14: new SquareOnBoard(14, 160, 12),
    15: new SquareOnBoard(15, 200, 25),
    16: new SquareOnBoard(16, 180, 14),
    17: new SquareOnBoard(17, null, null),
    18: new SquareOnBoard(18, 180, 14),
    19: new SquareOnBoard(19, 200, 16),
    20: new SquareOnBoard(20, null, null),
    21: new SquareOnBoard(21, 220, 18),
    22: new SquareOnBoard(22, null, null),
    23: new SquareOnBoard(23, 220, 18),
    24: new SquareOnBoard(24, 240, 20),
    25: new SquareOnBoard(25, 200, 25),
    26: new SquareOnBoard(26, 260, 22),
    27: new SquareOnBoard(27, 260, 22),
    28: new SquareOnBoard(28, 150, 20),
    29: new SquareOnBoard(29, 280, 22),
    30: new SquareOnBoard(30, null, null),
    31: new SquareOnBoard(31, 300, 26),
    32: new SquareOnBoard(32, 300, 26),
    33: new SquareOnBoard(33, null, null),
    34: new SquareOnBoard(34, 320, 28),
    35: new SquareOnBoard(35, 200, 25),
    36: new SquareOnBoard(36, null, null),
    37: new SquareOnBoard(37, 350, 35),
    38: new SquareOnBoard(38, null, null),
    39: new SquareOnBoard(39, 400, 50)
  };



  class Player {
    constructor(id, name, piece, color) {
      this.id = id;
      this.name = name;
      this.money = 1000;
      this.position = 0;
      this.$playerMoney = $(`#player${id}Money`);
      this.piece = piece;
      this.color = color;
    }
    roll() {
      const startPosition = this.position;
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      $('.die1').html(die1);
      $('.die2').html(die2);
      let newPosition = this.position + die1 + die2;
      if(newPosition > 39) {
        newPosition -= 39;
        this.money += 200;
      }

      this.position = newPosition;
      if(currentPlayer.id === 1) {
        board[startPosition].$player1Display.html('');
        board[newPosition].$player1Display.html(this.piece);
      } else {
        board[startPosition].$player2Display.html('');
        board[newPosition].$player2Display.html(this.piece);
      }

      if(!board[newPosition].owner) {
        $('.buy').on('click', () => {
          if(board[newPosition].price) {
            board[newPosition].owner = currentPlayer;
            currentPlayer.money -= board[newPosition].price;
            currentPlayer.$playerMoney.html(currentPlayer.money);
            board[newPosition].$square.css('backgroundColor', currentPlayer.color);
            const squareName = board[newPosition].$square.html();
            $('.display').html(`${currentPlayer.name} brought ${squareName}`);
          } else {
            const squareName = board[newPosition].$square.html();
            $('.display').html(`You cannot buy ${squareName}`);
          }
          $('.buy').off('click');
        });

      } else {
        if(board[newPosition].owner.id !== currentPlayer.id) {
          currentPlayer.money -= board[newPosition].rent;
          if(currentPlayer.id === 1) {
            player2.money += board[newPosition].rent;
            player2.$playerMoney.html(player2.money);
            $('.display').html(`${currentPlayer.name} paid ${board[newPosition].rent} to ${player2.name}`);
          } else {
            player1.money += board[newPosition].rent;
            player1.$playerMoney.html(player1.money);
            $('.display').html(`${currentPlayer.name} paid ${board[newPosition].rent} to ${player1.name}`);
          }
        }
      }



      currentPlayer.id === 1 ? currentPlayer = player2 : currentPlayer = player1;
    }
  }

  const player1 = new Player(1, 'Ellie', '🎅🏻', 'peachpuff');
  const player2 = new Player(2, 'Matt', '🚗', 'steelblue');

  let currentPlayer = player1;

  $('.rollButton').on('click', () => {
    currentPlayer.id === 1 ? player1.roll() : player2.roll();
  });

  board[0].$player1Display.html(player1.piece);
  board[0].$player2Display.html(player2.piece);


});
