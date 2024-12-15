// Récupérer le plateau de jeu dans le DOM
const gameBoard = document.getElementById('gameBoard') as HTMLDivElement;

if (!gameBoard) {
    throw new Error("Element with id 'gameBoard' not found.");
}

// Définir une matrice logique 9x9
const boardMatrix: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));

// Générer le plateau HTML
function createGameBoard(): void {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i.toString();
            cell.dataset.col = j.toString();
            gameBoard.appendChild(cell);
        }
    }
}

// Initialiser le plateau
function init(): void {
    boardMatrix[8][4] = 1; // Ligne 9 (index 8), colonne 5 (index 4)
    refreshGameBoard();
}

// Rafraîchir le plateau HTML en fonction de la matrice
function refreshGameBoard(): void {
    const cells = document.querySelectorAll<HTMLDivElement>('.cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row || '-1');
        const col = parseInt(cell.dataset.col || '-1');

        if (row === -1 || col === -1) {
            console.warn('Invalid cell dataset attributes.');
            return;
        }

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
