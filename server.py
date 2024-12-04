import socket
import threading

class Server:
    def __init__(self, host='localhost', port=12345):
        self.host = host
        self.port = port
        self.clients = []  # Liste pour stocker les connexions des clients
        self.ready_players = 0  # Suivi du nombre de joueurs prêts

    def handle_client(self, conn, addr, player_id):
        """Gère une connexion client."""
        print(f"Connexion établie avec {addr}")
        self.clients.append((conn, player_id))  # Stocke le client avec son ID

        # Si deux clients sont connectés, envoyer un message à chacun
        if len(self.clients) == 2:
            print("Deux clients connectés, envoi du message de connexion.")
            for client, _ in self.clients:
                client.send("Connexion établie avec l'autre joueur !".encode())

        while True:
            try:
                message = conn.recv(1024).decode()
                if message == "Le joueur est prêt":
                    print(f"Le {player_id} a cliqué sur le bouton.")
                    self.ready_players += 1  # Incrémente le compteur des joueurs prêts

                    # Si les deux joueurs sont prêts
                    if self.ready_players == 2:
                        # Envoyer un message aux deux joueurs pour dire qu'ils sont prêts
                        for client, _ in self.clients:
                            client.send("Les deux joueurs sont prêts".encode())

            except:
                break

    def start(self):
        """Démarre le serveur."""
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.bind((self.host, self.port))
        server_socket.listen(2)  # Limite à deux connexions
        print("Serveur en attente de connexions...")

        player_id = 1  # ID du joueur (1 ou 2)
        while len(self.clients) < 2:
            conn, addr = server_socket.accept()
            threading.Thread(target=self.handle_client, args=(conn, addr, player_id), daemon=True).start()
            player_id += 1  # Passe au joueur suivant

        print("Tous les clients sont connectés. Le serveur reste actif pour les communications.")

if __name__ == "__main__":
    server = Server()
    server.start()
