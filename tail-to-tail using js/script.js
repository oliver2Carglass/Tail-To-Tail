import { Player } from './player.js';



const gridSize = 9

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




// Display grid depending on the player grid
function displayGrid(grid, container) {
    container.innerHTML = ''; // Vider le conteneur
    for (let i = 0; i < grid.length; i++) {
        const rowDiv = document.createElement('div'); // Créer une ligne
        rowDiv.classList.add('row');
        for (let j = 0; j < grid[i].length; j++) {
            const cellDiv = document.createElement('div'); // Créer une cellule
            cellDiv.classList.add('cell');
            cellDiv.textContent = grid[i][j] ; // Afficher la valeur ou rien
            rowDiv.appendChild(cellDiv);
        }
        container.appendChild(rowDiv);
    }
}



// create 2 players        
const player1= new Player(gridSize)
const player2= new Player(gridSize)
// player1.move("left")
// player1.move("up")
// player1.move("up")
// player1.move("right")
// player1.canMove("left")

// diplay them in the good spot
displayGrid(player1.getGrid(), gameBoard1)
displayGrid(player2.getGrid(), gameBoard2)



console.log(player1.getGrid())


document.addEventListener('keydown', (event) => {
    let direction = null;

    // Associer les touches aux directions
    switch (event.key) {
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        default:
            break;
    }

    // Si une direction est détectée, déplacer le joueur 1
    if (direction) {
        if (player1.canMove(direction)) { // Vérifier si le mouvement est possible
            player1.move(direction);     // Appliquer le mouvement
            displayGrid(player1.getGrid(), gameBoard1); // Mettre à jour l'affichage de la grille
        }
    }
});