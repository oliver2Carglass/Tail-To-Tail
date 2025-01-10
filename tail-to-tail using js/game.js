import { Player } from './player.js';
export class Game {
    constructor(gridSize,movePerTurn) {
        this.gridSize=gridSize
        this.movePerTurn = movePerTurn
        this.gameBoard1 = document.getElementById('gameBoard1');
        this.gameBoard2 = document.getElementById('gameBoard2');
        this.confirmButton1 = document.getElementById("ok1");
        this.confirmButton2 = document.getElementById("ok2");
    }

    initGrid(container, gridSize) {
        container.style.display = 'grid';
        container.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`; // Colonnes dynamiques
        container.style.gridTemplateRows = `repeat(${gridSize}, 40px)`;    // Lignes dynamiques
        container.style.gap = '2px';                                      // Espace entre les cellules
        container.style.margin = '50px';
    }

    isWinning(m1,m2) {
        // Create a square matrix M filled with -1
        const size = m1.length; // Assuming m1 is a square matrix
        const M = Array.from({ length: size }, () => Array(size).fill(-1));
        m2 =  m2.slice().reverse().map(row => row.slice().reverse())
    
        // Iterate through m1 to update M
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (m1[i][j] === 0 || m2[i][j] === 0) {
                    M[i][j] = 1; // Mark positions already taken as 1
                }
            }
        }
    
        let player1CollisionRound = -1; // Initialize to -1 (no collision)
        let player2CollisionRound = -1; // Initialize to -1 (no collision)
        for (let move = 1; move <= this.movePerTurn; move++) {
    
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    // Check if both players are moving to the same position at the same round
                    if (m1[i][j] === move && m2[i][j] === move) {
                        return 3; // Both players collide on the same case at the same time
                    }
                }
            }
            // Check m1 for player 1's move
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (m1[i][j] === move) {
                        if (M[i][j] !== -1) {
                            // Player 1's move hits a taken cell
                            if (player1CollisionRound === -1) {
                                player1CollisionRound = move; // Record the round of collision
                            }
                        } else {
                            M[i][j] = 1; // Mark player 1's move in M
                        }
                    }
                }
            }
    
            // Check mirrored m2 for player 2's move
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (m2[i][j] === move) {
                        if (M[i][j] !== -1) {
                            // Player 2's move hits a taken cell
                            if (player2CollisionRound === -1) {
                                player2CollisionRound = move; // Record the round of collision
                            }
                        } else {
                            M[i][j] = 1; // Mark player 2's move in M
                        }
                    }
                }
            }
            console.log(player1CollisionRound,player2CollisionRound)
            if (player1CollisionRound !== -1 && player2CollisionRound !== -1) {
                if (player1CollisionRound === player2CollisionRound) {
                    return 3; // Both players collide in the same round
                }
            }
    
             // Step 4: Determine the winner based on collisions
             if (player1CollisionRound !== -1 && player2CollisionRound === -1) {
                return 1; // Player 1 wins
            } else if (player2CollisionRound !== -1 && player1CollisionRound === -1) {
                return 2; // Player 2 wins
            }
        }
        return 0
    
    }

    updateGrid(m1, m2) {
        const size = m1.length;
    
        // Miroiter m1 et m2
        const mirroredM1 = m1.slice().reverse().map(row => row.slice().reverse());
        const mirroredM2 = m2.slice().reverse().map(row => row.slice().reverse());
    
        // Mettre à jour m1 avec les valeurs positives de la grille miroitée m2
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (mirroredM2[i][j] >= 0) {
                    m1[i][j] = -2; // Mettre à jour m1 avec les valeurs de m2 miroitée
                }
            }
        }
    
        // Mettre à jour m2 avec les valeurs de m1 miroitée sous forme de -2
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (mirroredM1[i][j] >= 0) {
                    m2[i][j] = -2; // Mettre à jour m2 avec les valeurs de m1 miroitée sous forme de -2
                }
            }
        }
    
        // Set all positive values in m1 to 0
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (m1[i][j] > 0) {
                    m1[i][j] = 0; // Set positive values in m1 to 0
                }
            }
        }
    
        // Set all positive values in m2 to 0
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (m2[i][j] > 0) {
                    m2[i][j] = 0; // Set positive values in m2 to 0
                }
            }
        }
    
        // Return the updated matrices
        return [m1, m2];
    }

    async startGameLoop() {
        const player1 = new Player(this.gridSize, this.gameBoard1, this.movePerTurn, this.confirmButton1);
        const player2 = new Player(this.gridSize, this.gameBoard2, this.movePerTurn, this.confirmButton2);

        player1.displayGrid();
        player2.displayGrid();

        let winner = 0;

        while (winner === 0) {
            await player1.turn(); // Player 1's turn
            await player2.turn(); // Player 2's turn

            let m1 = player1.getGrid();
            let m2 = player2.getGrid();

            winner = this.isWinning(m1, m2);

            const [updatedM1, updatedM2] = this.updateGrid(m1, m2);
            player1.setGrid(updatedM1);
            player2.setGrid(updatedM2);

            player1.displayGrid();
            player2.displayGrid();
        }

        console.log(`Winner is: Player ${winner}`);
    }

    start() {
        this.initGrid(this.gameBoard1);
        this.initGrid(this.gameBoard2);
        this.startGameLoop();
    }
}
    
const game = new Game(9, 5);
game.start();
