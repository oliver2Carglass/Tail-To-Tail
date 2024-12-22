export class Player {
    constructor(gridSize, container,movePerTurn) {
        this.movePerTurn = movePerTurn
        this.container = container
        this.maxIndex=gridSize-1;                                   
        this.position = [Math.floor(gridSize / 2), gridSize - 1];                     // Position initiale : centre ligne, dernière colonne
        this.steps = 0;                                                               // Nombre de pas effectués
        this.grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(-1)); // Crée une grille de taille `gridSize` remplie de -1
        this.grid[this.position[0]][this.position[1]]=0
    }
    

//GETTERS :
    getGrid(){
        return this.grid;
    }
    getPosition(){
        return this.position;
    }
    getSteps(){
        return this.steps
    }
    
// Methods :

    // Update the grid
    move(direction) {
        this.steps+=1;                                                    // increment the number of steps        
        // Move the player on his own grid
        if (direction === "left") {                                     
            this.position[0] -= 1;
        } else if (direction === "right") {
            this.position[0] += 1;
        } else if (direction === "up") {
            this.position[1] -= 1;
        } else if (direction === "down") {
            this.position[1] += 1;
        }
        console.log(this.position)
        // Give the number of the step to the current position in grid (it permet to know who hit the second player first when both player hit the other one in the same turn)
        this.grid[this.position[0]][this.position[1]]=this.steps
    }

    // Check if a direction is available for the given direction
    canMove(direction) {
        // Calculer la nouvelle position en fonction de la direction
        let destination;

        if (direction === "left") {
            if (this.position[0] - 1 > this.maxIndex || this.position[0] - 1 < 0) { // See if the player is outside of the grid
                return false;
            }
    
            destination = this.grid[this.position[0]-1][this.position[1]];          // look if we didnt came to this place before
            if (destination === 0){                                                 // 0 mean we have ever cover this case
                return false
            }
        }
        else if (direction === "right") {
            if (this.position[0] + 1 > this.maxIndex || this.position[0] + 1 < 0) { // See if the player is outside of the grid
                return false;
            }
    
            destination = this.grid[this.position[0]+1][this.position[1]];          // look if we didnt came to this place before
            if (destination === 0){                                                 // 0 mean we have ever cover this case
                return false
            }
        }
        else if (direction === "up") {
            if (this.position[1] - 1 > this.maxIndex || this.position[1] - 1 < 0) { // See if the player is outside of the grid
                return false;
            }
    
            destination = this.grid[this.position[0]][this.position[1]-1];          // look if we didnt came to this place before
            if (destination === 0){                                                 // 0 mean we have ever cover this case
                return false
            }
        } else if (direction === "down") {
            if (this.position[1] + 1 > this.maxIndex || this.position[1] + 1 < 0) { // See if the player is outside of the grid
                return false;
            }
    
            destination = this.grid[this.position[0]][this.position[1]+1];          // look if we didnt came to this place before
            if (destination === 0){                                                 // 0 mean we have ever cover this case
                return false
            }
        }
        
        return true;                                                                // Direction valid
    }

    getPossibleMoves() {
        // Return possible move from the current case
        const directions = ["left", "right", "up", "down"];
        return directions.filter(direction => this.canMove(direction));
    }

    displayGrid() {
        this.container.innerHTML = '';                          // Clear the container

        for (let i = 0; i < this.grid.length; i++) {
            const rowDiv = document.createElement('div');       // Create a row
            rowDiv.classList.add('row');

            for (let j = 0; j < this.grid[i].length; j++) {
                const cellDiv = document.createElement('div'); // Create a cell
                cellDiv.classList.add('cell');

                // Get the value of the cell
                const cellValue = this.grid[i][j];

                // Apply CSS class based on the cell value
                if (cellValue === 0) {
                    cellDiv.classList.add('snkTail');
                } else if (cellValue === -2) {
                    cellDiv.classList.add('snkEnemy');
                } else if (cellValue === -1 ){
                    // do nothing
                } else {
                    const alpha= (this.movePerTurn-cellValue)*(0.5 / this.movePerTurn) + 0.25 
                    console.log(alpha)
                    cellDiv.style.backgroundColor = `rgba(255, 0, 0, ${alpha})`;
                }

                // Optional: Display the value in the cell (for debugging purposes)
                cellDiv.textContent = cellValue; // Uncomment if you want to display the number

                rowDiv.appendChild(cellDiv); // Add the cell to the row
            }

            this.container.appendChild(rowDiv); // Add the row to the container
        }
    }

    turn() {
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
            if (this.steps>=this.movePerTurn){
                document.removeEventListener('keydown', keyListener); // Désactiver le listener
                this.steps=0
                
            }
            // Si une direction est détectée, essayer de déplacer le joueur
            if (direction && this.canMove(direction)) {
                this.move(direction);     // Appliquer le mouvement
                this.displayGrid();       // Mettre à jour l'affichage de la grille

            }
        });
    
    }
    
  
   
}