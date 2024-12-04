class Player:
    def __init__(self, player_id):
        # Initialiser l'ID du joueur
        self.player_id = player_id
        
        # Définir la position initiale en fonction de l'ID du joueur
        if player_id == 1:
            self.position = [8, 4]  # Joueur 1 commence en bas au centre
            self.color = "green"     # Joueur 1 est vert
            self.grid_value = 1      # Joueur 1 commence avec la valeur 1
        elif player_id == 2:
            self.position = [0, 4]  # Joueur 2 commence en haut au centre
            self.color = "red"      # Joueur 2 est rouge
            self.grid_value = -1     # Joueur 2 commence avec la valeur -1
        else:
            raise ValueError("player_id must be 1 or 2")
        
        self.steps = 0  # Nombre de pas effectués
        self.moves = []  # Liste des mouvements planifiés
        self.grid = [[0 for _ in range(9)] for _ in range(9)]  # La grille du joueur

        # Marquer la position initiale sur la grille
        self.grid[self.position[0]][self.position[1]] = self.grid_value
    
    def canMove(self, direction):
        """Vérifie si un mouvement dans une direction est valide pour ce joueur"""
        # Calculer la nouvelle position en fonction de la direction
        next_position = self.position[:]
        
        if direction == "left":
            next_position[1] -= 1
        elif direction == "right":
            next_position[1] += 1
        elif direction == "up":
            next_position[0] -= 1
        elif direction == "down":
            next_position[0] += 1
        else:
            return False  # Direction invalide
        
        # Vérifier si la nouvelle position est à l'intérieur de la grille (9x9)
        if not (0 <= next_position[0] < 9 and 0 <= next_position[1] < 9):
            return False
        
        # Vérifier si la nouvelle position est déjà occupée (pas par ce joueur)
        if self.grid[next_position[0]][next_position[1]] != 0:
            return False
        
        return True
    
    def move(self, direction):
        """Déplace le joueur dans la direction donnée et enregistre le mouvement."""
        if direction == "left":
            self.position[1] -= 1
        elif direction == "right":
            self.position[1] += 1
        elif direction == "up":
            self.position[0] -= 1
        elif direction == "down":
            self.position[0] += 1

        # Calculer le nombre à laisser sur la grille : 
        # Joueur 1 laissera 1, 2, 3, ... et Joueur 2 laissera -1, -2, -3, ...
        mark = self.grid_value * (self.steps + 1)
       
        # Enregistrer le mouvement dans la liste des mouvements
        self.moves.append(self.position[:])  # On ajoute une copie de la position actuelle
        self.grid[self.position[0]][self.position[1]] = mark  # Mettre à jour la grille avec le nombre
        self.steps += 1  # Incrémenter le nombre de pas

    def undo_move(self):
        """Annule le dernier mouvement du joueur."""
        if self.moves:
            last_move = self.moves.pop()  # Récupérer le dernier mouvement
            # Remettre la position précédente sur la grille
            self.grid[self.position[0]][self.position[1]] = 0
            self.position = last_move  # Revenir à la position précédente
            self.grid[self.position[0]][self.position[1]] = 0  # Effacer la valeur de la case
            self.steps -= 1  # Réduire le nombre de pas effectués

    def get_possible_moves(self):
        """Retourne une liste des mouvements valides possibles pour ce joueur."""
        possible_moves = []
        for direction in ["left", "right", "up", "down"]:
            if self.canMove(direction):
                possible_moves.append(direction)
        return possible_moves
    
    def reset_player(self):
        """Réinitialise le joueur à sa position de départ."""
        # Réinitialiser la grille et la position
        self.position = [8, 4] if self.player_id == 1 else [0, 4]
        self.steps = 0
        self.moves = []
        self.grid = [[0 for _ in range(9)] for _ in range(9)]  # Recréer la grille vide
        self.grid_value = 1 if self.player_id == 1 else -1  # Définir la valeur de départ
        self.grid[self.position[0]][self.position[1]] = self.grid_value  # Marquer la nouvelle position

    def get_grid_state(self):
        """Retourne une copie de l'état actuel de la grille."""
        return [row[:] for row in self.grid]


def display_grid(grid):
    """Affiche la grille du jeu dans la console de manière visuelle."""
    for row in grid:
        print(" ".join(str(cell) if cell != 0 else '.' for cell in row))
    print()


# Exemple d'utilisation
if __name__ == '__main__':
    player1 = Player(1)
    player2 = Player(2)
    
    player1.move("up")  # Joueur 1 déplace vers le haut
    player2.move("down")  # Joueur 2 déplace vers le bas
    player2.move("down")
    
    display_grid(player1.get_grid_state())  # Afficher la grille de joueur 1
    display_grid(player2.get_grid_state())  # Afficher la grille de joueur 2
