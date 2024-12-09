import pygame
import sys

# Définition des constantes Pygame
SCREEN_SIZE = 600
GRID_SIZE = 9
CELL_SIZE = SCREEN_SIZE // GRID_SIZE

# Couleurs
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLACK = (0, 0, 0)

# Initialisation de Pygame
pygame.init()

# Créer la fenêtre de jeu
screen = pygame.display.set_mode((SCREEN_SIZE, SCREEN_SIZE))
pygame.display.set_caption("Game - Player Movement")