import socket
import pygame
import threading

class Client:
    def __init__(self, host='localhost', port=12345):
        self.host = host
        self.port = port
        self.message = "En attente du second joueur..."
        self.background_color = (0, 0, 0)  # Fond initial noir
        self.button_rect = None  # Pour stocker la position du bouton

    def connect_to_server(self):
        """Se connecte au serveur et attend un message."""
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.client_socket.connect((self.host, self.port))

        # Démarrer un thread pour recevoir des messages du serveur
        threading.Thread(target=self.receive_message, daemon=True).start()

    def receive_message(self):
        """Reçoit les messages du serveur et met à jour l'état."""
        while True:
            try:
                message = self.client_socket.recv(1024).decode()
                if message == "Connexion établie avec l'autre joueur !":
                    self.message = message
                    self.background_color = (0, 50, 0)  # Changer la couleur de fond en vert
                    self.create_button()  # Créer le bouton une fois la connexion établie
                elif message == "Les deux joueurs sont prêts":
                    self.background_color = (0, 255, 0)  # Passer le fond en vert
                    # ici on clear tout et on affiche le jeu 
            except:
                break

    def create_button(self):
        """Crée un bouton rouge sur la fenêtre."""
        self.button_rect = pygame.Rect(150, 200, 150, 50)  # Position et taille du bouton

    def handle_button_click(self, mouse_pos):
        """Vérifie si le bouton a été cliqué."""
        if self.button_rect.collidepoint(mouse_pos):
            print("Bouton cliqué !")  # Action à effectuer lors du clic sur le bouton
            self.client_socket.send("Le joueur est prêt".encode())  # Indique que le joueur est prêt

    def start(self):
        """Lance l'interface graphique."""
        pygame.init()
        screen = pygame.display.set_mode((450, 450))  # Fenêtre ajustée à 450x450
        pygame.display.set_caption("Client Snake Multijoueur")
        font = pygame.font.Font(None, 36)

        self.connect_to_server()

        running = True
        while running:
            screen.fill(self.background_color)  # Utilise la couleur de fond mise à jour
            text = font.render(self.message, True, (255, 255, 255))  # Texte blanc
            text_rect = text.get_rect(center=(225, 150))  # Centrer le texte dans 450x450
            screen.blit(text, text_rect)  # Dessiner le texte

            # Dessiner le bouton si la connexion est établie
            if self.button_rect:
                pygame.draw.rect(screen, (255, 0, 0), self.button_rect)  # Dessiner un bouton rouge
                button_text = font.render("Ready?", True, (255, 255, 255))  # Texte sur le bouton
                button_text_rect = button_text.get_rect(center=self.button_rect.center)  # Centrer le texte du bouton
                screen.blit(button_text, button_text_rect)

            pygame.display.flip()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    if event.button == 1:  # 1 correspond à un clic gauche de la souris
                        self.handle_button_click(event.pos)

        pygame.quit()

if __name__ == "__main__":
    client = Client()
    client.start()
