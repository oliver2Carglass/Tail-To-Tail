import { Player } from './player.js';


const movePerTurn=5
const gridSize = 15

// Get the div where we will display the our game
const gameBoard1 = document.getElementById('gameBoard1');
const gameBoard2 = document.getElementById('gameBoard2');



// Update the CSS class 
function adjustGridStyle(container, gridSize) {
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`; // Colonnes dynamiques
    container.style.gridTemplateRows = `repeat(${gridSize}, 40px)`;    // Lignes dynamiques
    container.style.gap = '2px';                                      // Espace entre les cellules
    container.style.margin = '50px';
}


adjustGridStyle(gameBoard1, gridSize);
adjustGridStyle(gameBoard2, gridSize);









// create 2 players        
const player1= new Player(gridSize, gameBoard1,movePerTurn)
const player2= new Player(gridSize, gameBoard2,movePerTurn)
// player1.move("left")
// player1.move("up")
// player1.move("up")
// player1.move("right")
// player1.canMove("left")

// diplay them in the good spot
player1.displayGrid()
player2.displayGrid()



console.log(player1.getGrid())


player1.turn()