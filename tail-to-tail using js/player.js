export class Player {
    constructor(gridSize, container,movePerTurn, confirmButton) {
        this.confirmButton=confirmButton
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
    



    setGrid(newGrid) {
        if (Array.isArray(newGrid) && newGrid.length === this.grid.length) {
            // Validate if the new grid matches the size of the current grid
            const isValid = newGrid.every(
                row => Array.isArray(row) && row.length === this.grid.length
            );
            if (isValid) {
                this.grid = newGrid;
            } else {
                throw new Error("Invalid grid: dimensions must match the original grid.");
            }
        } else {
            throw new Error("Invalid grid: must be a square matrix of the same size.");
        }
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
            else if(destination === -1){
                return true
            }
            else if(destination === -2){
                return true
            }
            else if (destination === this.steps-1){
                this.undoMove(direction)
                return false
            }
            else{
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
            else if(destination === -1){
                return true
            }
            else if(destination === -2){
                return true
            }
            else if (destination === this.steps-1){
                this.undoMove(direction)
                return false
            }
            else{
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
            else if(destination === -1){
                return true
            }
            else if(destination === -2){
                return true
            }
            else if (destination === this.steps-1){
                this.undoMove(direction)
                return false
            }
            else{
                return false
            }

        }
        else if (direction === "down") {
            if (this.position[1] + 1 > this.maxIndex || this.position[1] + 1 < 0) { // See if the player is outside of the grid
                return false;
            }
    
            destination = this.grid[this.position[0]][this.position[1]+1];          // look if we didnt came to this place before
            if (destination === 0){                                                 // 0 mean we have ever cover this case
                return false
            }
            else if(destination === -1){
                return true
            }
            else if(destination === -2){
                return true
            }
            else if (destination === this.steps-1){
                this.undoMove(direction)
                return false
            }
            else{
                return false
            }
        }
        
        return true;                                                                // Direction valid
    }

    // permit to undo the last move
    undoMove(direction){
        this.grid[this.position[0]][this.position[1]]=-1    
        this.steps-=1;                                                    // increment the number of steps        
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
        
        // Give the number of the step to the current position in grid (it permet to know who hit the second player first when both player hit the other one in the same turn)
        this.grid[this.position[0]][this.position[1]]=this.steps
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
                    
                    cellDiv.style.backgroundColor = `rgba(255, 0, 0, ${alpha})`;
                }

                // Optional: Display the value in the cell (for debugging purposes)
                cellDiv.textContent = cellValue; // Uncomment if you want to display the number

                rowDiv.appendChild(cellDiv); // Add the cell to the row
            }

            this.container.appendChild(rowDiv); // Add the row to the container
        }
    }

    resetTurn(){
        
    }
    turn() {
        return new Promise((resolve) => { // Use a promise to handle when the turn ends
            this.confirmButton.classList.remove('ready'); // S'assurer que le bouton n'est pas prêt au début
            this.confirmButton.classList.add('notReady'); // S'assurer que le bouton n'est pas prêt au début
            
            const keyListener = (event) => { // Define the key listener
                let direction = null;
                // Map arrow keys to movement directions
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

                
                // If a valid direction is detected, attempt to move the player
                if (direction && this.canMove(direction)) {
                    this.move(direction);     // Apply the movement
                    this.displayGrid();       // Update the grid display
                }
                
                // Check if the maximum number of moves for this turn has been reached
                if (this.steps >= this.movePerTurn) {
                    document.removeEventListener('keydown', keyListener); // Remove the event listener
                    this.steps = 0; // Reset the step counter
                    this.confirmButton.classList.add('ready') // ne marche pas ???
                }
            };
            // the moves have been done
            // Ajouter un écouteur pour le clic sur le bouton
            const buttonListener = () => {
                this.confirmButton.removeEventListener('click', buttonListener); // Retirer l'écouteur de clic
                this.confirmButton.classList.add('notReady') // ne marche pas ???
                this.confirmButton.classList.remove('ready') // ne marche pas ???
                console.log("hhh")
                resolve(); // Résoudre la promesse pour signaler la fin du tour
            };
            // Attacher les écouteurs d'événements
            document.addEventListener('keydown', keyListener); // Écouter les touches pour les déplacements
            this.confirmButton.addEventListener('click', buttonListener); // Écouter le clic du bouton
            
        });
    }
    
    
  
   
}