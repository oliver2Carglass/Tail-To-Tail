from Player import Player

class Game:
    def __init__(self, max_steps=3):
        self.grid_size = 3
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


    
    def winning(self, g1, g2):
        """
        Détecte si la partie est gagnante ou pas
        Retourne 1 si j1 gagne
        retourne 2 si j2 gagne
        retourne 3 si egalité
        retourne 0 si rien
        """
        # Vérifier si une collision a eu lieu
        for i in range(self.grid_size):
            for j in range(self.grid_size):
                if g1[i][j] != 0 and g2[i][j] != 0:  # Collision détectée si les deux joueurs occupent la même case
                    distance_g1 = abs(g1[i][j])  
                    distance_g2 = abs(g2[i][j]) 
                    # Comparer les distances
                    if distance_g1 > distance_g2:
                        return 1  # Joueur 1 gagne
                    elif distance_g2 > distance_g1:
                        return 2  # Joueur 2 gagne
                    else:
                        return 3  # Égalité (distances égales)
        return 0

    def start(self):
        player1 = Player(1)
        player2 = Player(2)
        

        
        
            
            





















# Exemple d'utilisation
if __name__ == "__main__":
    # Initialisation des joueurs et du jeu
    player1 = Player(1)
    player2 = Player(2)
    game = Game()
    g1=[[0,1,2],
        [0,4,3],
        [0,0,0]
        ]
    g2=[[0,0,0],[0,0,0],[0,-1,0]]
    print(game.winning(g1,g2))


