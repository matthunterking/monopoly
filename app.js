class Square {
  constructor(index, name, price, rent, color, canBeBrought, set) {
    this.index = index;
    this.name = name;
    this.price = price;
    this.rent = rent;
    this.owner = null;
    this.color = color;
    this.canBeBrought = canBeBrought;
    this.player1 = false;
    this.player2 = false;
    this.set = set;
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

const go = new Square(0, 'Go', null, null, 'white', false, null);
const oldKentRoad = new Square(1, 'Old Kent Road', 60, 2, brown, true, 'brown');
const communityChest1 = new Square(2, 'Community Chest', null, null, 'white', false, null);
const whitechapelRoad = new Square(3, 'Whitechapel Road', 60, 4, brown, true, 'brown');
const incomeTax = new Square(4, 'Income Tax', null, null, 'white', false, null);
const kingsCross = new Square(5, 'Kings Cross Station', 200, 25, 'white', true, 'stations');
const angelIslington = new Square(6, 'The Angel Islington', 100, 6, lightBlue, true, 'lightBlue');
const chance1 = new Square(7, 'Chance', null, null, 'white', false);
const eustonRoad = new Square(8, 'Euston Road', 100, 6, lightBlue, true, 'lightBlue');
const pentonvilleRoad = new Square(9, 'Pentonville Road', 120, 8, lightBlue, true, 'lightBlue');
const jail = new Square(10, 'Jail', null, null, 'white', false, null);
const pallMall = new Square(11, 'Pall Mall', 140, 10, pink, true, 'pink');
const electric = new Square(12, 'Electric Company', 150, 20, 'white', true, 'utilities');
const whitehall = new Square(13, 'Whitehall', 140, 10, pink, true, 'pink');
const northumberLand = new Square(14, 'NorthumberLand Road', 160, 12, pink, true, 'pink');
const fenchurch = new Square(15, 'Fenchurch Street Station', 200, 25, 'white', true, 'stations');
const bow = new Square(16, 'Bow Street', 180, 14, orange, true, 'orange');
const communityChest2 = new Square(17, 'Community Chest', null, null, 'white', false, null);
const marlborough = new Square(18, 'Marlborough Street', 180, 14, orange, true, 'orange');
const vine = new Square(19, 'Vine Street', 200, 16, orange, true, 'orange');
const freeParking = new Square(20, 'Free Parking', null, null, 'white', false, null);
const strand = new Square(21, 'Strand', 220, 18, red, true, 'red');
const chance2 = new Square(22, 'Chance', null, null, 'white', false, null);
const fleet = new Square(23, 'Fleet Street', 220, 18, red, true, 'red');
const traf = new Square(24, 'Trafalger Square', 240, 20, red, true, 'red');
const fen = new Square(25, 'Fenchurch Street Station', 200, 25, 'white', true, 'stations');
const leic = new Square(26, 'Leicershire Square', 260, 22, yellow, true, 'yellow');
const cov = new Square(27, 'Coventry Street', 260, 22, yellow, true, 'yellow');
const water = new Square(28, 'Water Works', 150, 20, 'white', true, 'utilities');
const pic = new Square(29, 'Picadilly', 280, 22, yellow, true, 'yellow');
const goToJail = new Square(30, 'Go to Jail', null, null,'white', false, null);
const regent = new Square(31, 'Regent Street', 300, 26, green, true, 'green');
const ox = new Square(32, 'Oxford Street', 300, 26, green, true, 'green');
const communityChest3 = new Square(33, 'Community Chest', null, null, 'white', false, null);
const bond = new Square(34, 'Bond Street', 320, 28, green, true, 'green');
const liv = new Square(35, 'Liverpool Street Station', 200, 25, 'white', true, 'stations');
const chance3 = new Square(36, 'Chance', null, null, 'white', false, null);
const park = new Square(37, 'Park Lane', 350, 35, darkBlue, true, 'darkBlue');
const superTax = new Square(38, 'superTax', null, null, 'white', false, null);
const Mayfair = new Square(39, 'Mayfair', 400, 50, 'darkBlue', true, 'darkBlue');

const board = [ go, oldKentRoad, communityChest1, whitechapelRoad, incomeTax,
  kingsCross, angelIslington, chance1, eustonRoad, pentonvilleRoad, jail,
  pallMall, electric, whitehall, northumberLand, fenchurch, bow, communityChest2,
  marlborough, vine, freeParking, strand, chance2, fleet, traf, fen, leic, cov,
  water, pic, goToJail, regent, ox, communityChest3, bond, liv, chance3, park, superTax, Mayfair
];

class Player {
  constructor(id, name, piece, color) {
    this.id = id;
    this.name = name;
    this.piece = piece;
    this.money = 1000;
    this.location = 0;
    this.properties = {
      brown: 0,
      lightBlue: 0,
      pink: 0,
      orange: 0,
      red: 0,
      yellow: 0,
      green: 0,
      darkBlue: 0,
      utilities: 0,
      stations: 0
    };
    this.currentSquare = board[0];
    this.color = color;
  }
}



$(() => {
  const $rollButton = $('#rollButton');
  const $buyButton = $('#buyButton');
  const $endTurnButton = $('#endTurnButton');

  let doubles = 0;
  let currentSquare = 0;
  let previousSquare = 0;

  let displayedSquares = [37, 38, 39, 0, 1, 2, 3 ];
  let stepsRemaining = 0;
  const player1 = new Player(1, 'Player 1', 'dog', 'pink');
  const player2 = new Player(2, 'Player 2', 'car', 'lime');

  let currentPlayer = player1;
  let die1;
  let die2;

  function rollDice() {
    $rollButton.off('click');
    // die1 = Math.floor(Math.random() * 6) + 1;
    // die2 = Math.floor(Math.random() * 6) + 1;
    die1 = 2;
    die2 = 4;
    $('#die1').html(die1);
    $('#die2').html(die2);
    const distance = die1 + die2;
    currentPlayer.location += distance;
    if(currentPlayer.location > board.length) {
      currentPlayer.money += 200;
      console.log(`${currentPlayer.name} got £200 for passing go ${currentPlayer.money}`);
      currentPlayer.location = currentPlayer.location - 40;

    }
    currentSquare = board[currentPlayer.location];
    console.log(`${currentPlayer.name} is on ${currentSquare.name}`);

    postTurn();
    $endTurnButton.on('click', () => {
      $endTurnButton.off('click');
      if(die1 === die2) {
        doubles ++;
      } else {
        doubles = 0;
        //Switch turns
        if(currentPlayer.id === 1) {
          currentPlayer = player2;
        } else {
          currentPlayer = player1;
        }
      }
      $rollButton.on('click', rollDice);
    });
  }

  function setUp() {
    board[0].player1 = true;
    board[0].player2 = true;
    $rollButton.on('click', () => rollDice());
  }

  function postTurn() {

    if(!currentSquare.owner && currentSquare.canBeBrought) {
      $buyButton.on('click', buyProperty);
    } else if(currentSquare.owner) {
      if(currentSquare.owner.id !== currentPlayer.id) {
        currentPlayer.money -= currentSquare.rent;
        currentSquare.owner.money += currentSquare.rent;
        console.log(`${currentPlayer.name} pays ${currentSquare.owner.name} £${currentSquare.rent} for landing on ${currentSquare.name}`);
      }
      $buyButton.off('click');
    }

    // console.log()Object.keys(currentPlayer).filter(type => type === 3);


  }

  function buyProperty() {
    $buyButton.off('click');
    // console.log('buy!!!!!');
    // console.log(`${currentPlayer.money}, ${currentSquare.price}`);
    if(currentPlayer.money >= currentSquare.price) {
      currentSquare.owner = currentPlayer;
      console.log(currentSquare);
      currentPlayer.money -= currentSquare.price;
      currentPlayer.properties[currentSquare.set] += 1;
      console.log(`${currentPlayer.name} has brought ${currentSquare.name}`);
    }

  }



  setUp();

});
