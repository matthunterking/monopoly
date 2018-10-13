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

$(() => {
  let isPlayer1Turn = true;
  let currentPlayer;
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

  let complete = true;
  let i = 0;

  function moveBoard(startLocation, numberOfSpaces, preview, fastTravelLocation) {
    let newLocation = startLocation + numberOfSpaces;
    let removeStart = displayedSquares[0];
    let spacesRemaining = numberOfSpaces;

    console.log(removeStart, newLocation);
    //TODO Sort out end of board
    let newDisplay;
    newDisplay = displayedSquares.map(square => square +1);
    moveSquares(displayedSquares[0], newDisplay);
    displayedSquares = newDisplay;
    spacesRemaining -= 1;
    if(spacesRemaining) {
      moveBoard(0, spacesRemaining, false, false);
    }





    updateDisplayedSquares();
  }



  let displayedSquares = [12, 13, 14, 15, 16, 17 ];

  function moveSquares(remove, displayedSquares) {

    const newDiv = $(`<div class='square' id='${displayedSquares[5]}'>
    <div class='squareColor' id='${displayedSquares[5]}SquareColor'></div>
      <h2 class='${displayedSquares[5]}SquareName'></h2>
      <h2 id='${displayedSquares[5]}SquareValue'></h2>
      <h2 id='${displayedSquares[5]}SquareOwner'></h2>
      <div class="playersContainer">
        <div class='playerContainer' id='${displayedSquares[5]}player1Piece'></div>
        <div class='playerContainer' id='${displayedSquares[5]}player2Piece'></div>
      </div>
    </div>`);

    console.log(newDiv);
    const oldDiv = $(`#${remove}`);
    console.log(oldDiv);

    $boardContainer.append(newDiv);
    updateDisplayedSquares();
    let j = 0;
    const move = setInterval(function() {
      if(j < 300) {
        newDiv.css('width', `${j}px`);
        oldDiv.css('width', `${300-j}px`);
        j += 5;
      } else {
        clearInterval(move);
        oldDiv.remove();
      }
    }, 20);
  }

  function updateDisplayedSquares() {

    //Need to work out how to chance the id's of the new display?
    displayedSquares.forEach(position => {
      const $squareColor = $(`#${position}SquareColor`);
      const $squareName = $(`.${position}SquareName`);
      const $squareValue = $(`#${position}SquareValue`);
      const $squareOwner = $(`#${position}SquareOwner`);
      const $square = $(`#${position}Square`);
      const $player1Piece = $(`#${position}player1Piece`);
      const $player2Piece = $(`#${position}player2Piece`);
      $squareName.html(board[position].name);
      $squareColor.css('backgroundColor', board[position].color);
    })
  }


  function setUp() {
    updateDisplayedSquares();
    const distance = rollDice();
    moveBoard(14, distance, false, false);
  }

  setUp();

});
