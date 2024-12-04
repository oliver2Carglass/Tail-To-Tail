from Player import Player

class Game:
    def __init__(self, max_steps=3):
        self.grid_size = 9
        self.grid = [[0 for _ in range(9)] for _ in range(9)]
        self.max_steps = max_steps
    
    # Cette méthode fusionne les grilles g1 et g2 avec la grille de l'attribut
    def mergeGrid(self, g1, g2):
        """Fusionne les grilles g1 et g2 à la grille de l'attribut."""
        for i in range(self.grid_size):
            for j in range(self.grid_size):
                # Si g1 ou g2 contient un joueur (représenté par un ID)
                if g1[i][j] != 0:
                    self.grid[i][j] = g1[i][j]  # Copier la valeur de g1
                elif g2[i][j] != 0:
                    self.grid[i][j] = g2[i][j]  # Copier la valeur de g2
        self.print_grid()

    def print_grid(self):
        """Affiche la grille de manière visuelle dans la console avec des '.' pour les cases vides."""
        for row in self.grid:
            print(" ".join(str(cell) if cell != 0 else '.' for cell in row))
        print()

    def play_turn(self, player):
        """
        Gère un tour de jeu pour un joueur.
        Le joueur effectue 3 mouvements à l'avance, et chaque mouvement est vérifié avant d'être appliqué.
        """
        print(f"Tour du joueur {player.player_id} ({player.color}):")
        
        # Demander 3 mouvements au joueur
        moves = []
        for i in range(3):
            valid_move = False
            while not valid_move:
                print(f"Entrez le mouvement {i + 1} (left, right, up, down) :")
                direction = input("Mouvement: ").strip().lower()
                if direction in ["left", "right", "up", "down"]:
                    # Vérifier si le mouvement est valide
                    if player.canMove(direction):
                        # Appliquer le mouvement si valide
                        player.move(direction)
                        moves.append(direction)
                        valid_move = True
                    else:
                        print("Mouvement invalide ! Vous ne pouvez pas marcher sur votre propre chemin ou sortir de la grille.")
                else:
                    print("Direction invalide. Entrez 'left', 'right', 'up' ou 'down'.")
        
        # Mettre à jour la grille
        self.mergeGrid(player.get_grid_state(), self.grid)
        print(f"Le joueur {player.player_id} a effectué les mouvements suivants : {moves}")





















# Exemple d'utilisation
if __name__ == "__main__":
    # Initialisation des joueurs et du jeu
    player1 = Player(1)
    player2 = Player(2)
    game = Game()

    # Jouer un tour pour chaque joueur
    game.play_turn(player1)
    game.play_turn(player2)
