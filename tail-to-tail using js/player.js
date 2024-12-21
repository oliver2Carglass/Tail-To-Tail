export class Player {
    constructor(gridSize) {
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
    
    // Methods :

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
        

        // // Vérifier si la nouvelle position est à l'intérieur de la grille (9x9)
        // if (nextPosition[0] < 0 || nextPosition[0] >= 9 || nextPosition[1] < 0 || nextPosition[1] >= 9) {
        //     return false;
        // }

        // // Vérifier si la nouvelle position est déjà occupée
        // if (this.grid[nextPosition[0]][nextPosition[1]] !== 0) {
        //     return false;
        // }

        return true;
    }
}