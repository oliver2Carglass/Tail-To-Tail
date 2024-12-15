// Récupérer le plateau de jeu dans le DOM
const gameBoard = document.getElementById('gameBoard');

// Créer une matrice logique 9x9
let boardMatrix = Array.from({ length: 9 }, () => Array(9).fill(0));

// Générer le plateau HTML
function createGameBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            gameBoard.appendChild(cell);
        }
    }
}

// Initialiser le plateau
function init() {
    boardMatrix[8][4] = 1; // Ligne 9 (index 8), colonne 5 (index 4)
    refreshGameBoard();
}

// Rafraîchir le plateau HTML en fonction de la matrice
// Rafraîchir le plateau HTML en fonction de la matrice
function refreshGameBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        // Ajouter ou retirer la classe 'snkHead' pour les 1
        if (boardMatrix[row][col] === 1) {
            cell.classList.add('snkHead');
        } else {
            cell.classList.remove('snkHead');
        }

        // Ajouter ou retirer la classe 'blueCell' pour les 2
        if (boardMatrix[row][col] === 2) {
            cell.classList.add('blueCell');
        } else {
            cell.classList.remove('blueCell');
        }
    });
}

// Exécution
createGameBoard();
init();

init()