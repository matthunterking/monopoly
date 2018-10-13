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
const communityChest2 = new Square(17, 'Community Chest', null, null, 'white', false);
const marlborough = new Square(18, 'Marlborough Street', 180, 14, orange, true);
const vine = new Square(19, 'Vine Street', 200, 16, orange, true);
const freeParking = new Square(20, 'Free Parking', null, null, 'white', false);
const strand = new Square(21, 'Stand', 220, 18, red, true);
const chance2 = new Square(22, 'Chance', null, null, 'white', false);
const fleet = new Square(23, 'Fleet Street', 220, 18, red, true);
const traf = new Square(24, 'Trafalger Square', 240, 20, red, true);
const fen = new Square(25, 'Fenchurch Street Station', 200, 25, 'white', true);
const leic = new Square(26, 'Leicershire Square', 260, 22, yellow, true);
const cov = new Square(27, 'Coventry Street', 260, 22, yellow, true);
const water = new Square(28, 'Water Works', 150, 20, 'white', true);
const pic = new Square(29, 'Picadilly', 280, 22, yellow, true);
const goToJail = new Square(30, 'Go to Jail', null, null,'white', false);
const regent = new Square(31, 'Regent Street', 300, 26, green, true);
const ox = new Square(32, 'Oxford Street', 300, 26, green, true);
const communityChest3 = new Square(33, 'Community Chest', null, null, 'white', false);
const bond = new Square(34, 'Bond Street', 320, 28, green, true);
const liv = new Square(35, 'Liverpool Street Station', 200, 25, 'white', true);
const chance3 = new Square(36, 'Chance', null, null, 'white', false);
const park = new Square(37, 'Park Lane', 350, 35, darkBlue, true);
const superTax = new Square(38, 'superTax', null, null, 'white', false);
const Mayfair = new Square(39, 'Mayfair', 400, 50, 'darkBlue', true);

const board = [ go, oldKentRoad, communityChest1, whitechapelRoad, incomeTax,
  kingsCross, angelIslington, chance1, eustonRoad, pentonvilleRoad, jail,
  pallMall, electric, whitehall, northumberLand, fenchurch, bow, communityChest2,
  marlborough, vine, freeParking, strand, chance2, fleet, traf, fen, leic, cov,
  water, pic, goToJail, regent, ox, communityChest3, bond, liv, chance3, park, superTax, Mayfair
];

class Player {
  constructor(name, piece, color) {
    this.name = name;
    this.piece = piece;
    this.money = 1000;
    this.location = 0;
    this.currentSquare = board[0];
    this.color = color;
  }
}



$(() => {
  let doubles = false;

  const $boardContainer = $('.boardContainer');

  const $playerName = $('#playerName');
  const $description = $('#description');

  const $playerMoney = $('#playerMoney');

  const $rollButton = $('#rollButton');
  const $buyButton = $('#buyButton');
  const $endTurnButton = $('#endTurnButton');
  const $previewForward = $('#previewForward');
  const $previewBackwards = $('#previewBackwards');

  $previewForward.on('click', () => {
    moveSquares(2, true, true, true);
  });

  $previewBackwards.on('click', () => {
    moveSquares(2, true, false, true);
  });


  function rollDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    $('#die1').html(die1);
    $('#die2').html(die2);
    if(die1 === die2) {
      doubles = true;
    } else {
      doubles = false;
    }
    const distance = die1 + die2;
    currentPlayer.location += distance;
    moveSquares(distance, false, true, false);
  }

  // let complete = true;
  // let i = 0;

  // function moveBoard(startLocation, numberOfSpaces, preview, fastTravelLocation) {
  //   let newLocation = startLocation + numberOfSpaces;
  //   let removeStart = displayedSquares[0];
  //   let spacesRemaining = numberOfSpaces;
  //
  //   console.log(removeStart, newLocation);
  //   //TODO Sort out end of board
  //   let newDisplay;
  //   newDisplay = displayedSquares.map(square => square +1);
  //   moveSquares(numberOfSpaces);
  //   spacesRemaining -= 1;
  //   if(spacesRemaining) {
  //     displayedSquares = newDisplay;
  //     moveBoard(0, spacesRemaining, false, false);
  //   }

//TODO Can I combine Moveborad with moveSquares ??? So that if the step is complete
//it will move onto the next one.



  //   updateDisplayedSquares();
  // }


  // element 3 in the displaySquares is the current!
  let displayedSquares = [37, 38, 39, 0, 1, 2, 3 ];
  let stepsRemaining = 0;

  const player1 = new Player('Player 1', 'dog', 'pink');
  const player2 = new Player('Player 2', 'car', 'lime');

  let currentPlayer = player1;

  function setUp() {
    board[0].player1 = true;
    board[0].player2 = true;
    updateDisplayedSquares();
    $rollButton.on('click', () => rollDice());
  }

  function moveSquares(numberOfSteps, fast, forward, preview) {
    let time1;
    let time2;
    let newDisplay;
    let remove;
    let index;
    if(fast) {
      time1 = 15;
      time2 = 1;
    } else {
      time1 = 250;
      time2 = 20;
    }
    stepsRemaining = numberOfSteps;
    let j = 0;
    if(forward) {
      remove = displayedSquares[0];
      index = 6;
      newDisplay = displayedSquares.map(square => {
        if(square >= 39) {
          return square = 0;
        } else {
          return square +1;
        }
      });
    } else {
      remove = displayedSquares[6];
      index = 0;
      newDisplay = displayedSquares.map(square => {
        if(square <= 0) {
          return square = 39;
        } else {
          return square - 1;
        }
      });
    }

    const newDiv = $(`<div class='square' id='${newDisplay[index]}'>
    <div class='squareColor' id='${newDisplay[index]}SquareColor'></div>
    <h2 class='${displayedSquares[index]}SquareName'></h2>
    <h2 id='${displayedSquares[index]}SquareValue'></h2>
    <h2 id='${displayedSquares[index]}SquareOwner'></h2>
    <div class="playersContainer">
      <div class='playerContainer' id='${displayedSquares[index]}player1Piece'></div>
      <div class='playerContainer' id='${displayedSquares[index]}player2Piece'></div>
    </div>
  </div>`);
    const oldDiv = $(`#${remove}`);


    if(forward) {
      $boardContainer.append(newDiv);
    } else {
      $boardContainer.prepend(newDiv);
    }
    updateDisplayedSquares();
    const move = setInterval(function() {
      if(j < 300) {
        newDiv.css('width', `${j}px`);
        oldDiv.css('width', `${300-j}px`);
        j += 5;
      } else {
        if(!preview) {
          if(currentPlayer.name === 'Player 1') {
            board[newDisplay[2]].player1 = false;
            $(`#${newDisplay[2]}player1Piece`).css('backgroundImage', '');
            board[newDisplay[3]].player1 = true;
          } else {
            board[newDisplay[2]].player2 = false;
            $(`#${newDisplay[2]}player2Piece`).css('backgroundImage', '');
            board[newDisplay[3]].player2 = true;
          }

        }
        stepsRemaining --;
        oldDiv.remove();
        updateDisplayedSquares();
        displayedSquares = newDisplay;
        clearInterval(move);
        setTimeout(() => {
          if(stepsRemaining !== 0) {
            moveSquares(stepsRemaining, fast, forward, preview);
          } else {
            if(!doubles && !preview) {
              let goToNextPlayerDistance = 0;
              let otherPlayer;
              currentPlayer.name === 'Player 1' ? otherPlayer = player2 : otherPlayer = player1;

              if(otherPlayer.location < currentPlayer.location) {
                goToNextPlayerDistance = currentPlayer.location - otherPlayer.location;
              } else {
                goToNextPlayerDistance = currentPlayer.location + (39 - otherPlayer.location);
              }

              currentPlayer = otherPlayer;
              $endTurnButton.on('click', () => moveSquares(goToNextPlayerDistance, true, false, true));
            }
          }
        }, time1);
      }
    }, time2);

  }

  function updateDisplayedSquares() {
    // console.log(displayedSquares);
    displayedSquares.forEach(position => {
      const $squareColor = $(`#${position}SquareColor`);
      const $squareName = $(`.${position}SquareName`);
      const $squareValue = $(`#${position}SquareValue`);
      const $squareOwner = $(`#${position}SquareOwner`);
      const $square = $(`#${position}Square`);
      const $player1Piece = $(`#${position}player1Piece`);
      const $player2Piece = $(`#${position}player2Piece`);
      $squareName.html(board[position].name);
      $squareValue.html(`£${board[position].price}`);
      $squareColor.css('backgroundColor', board[position].color);
      if(board[position].player1) {
        $player1Piece.css('backgroundImage', `url(./images/${player1.piece}.jpeg)`);
      }
      if(board[position].player2) {
        $player2Piece.css('backgroundImage', `url(./images/${player2.piece}.jpeg)`);
      }
    })
  }



  setUp();

});
