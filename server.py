import socket
import threading

class Server:
    def __init__(self, host='localhost', port=12345):
        self.host = host
        self.port = port
        self.clients = []  # Liste pour stocker les connexions des clients

    def handle_client(self, conn, addr):
        """Gère une connexion client."""
        print(f"Connexion établie avec {addr}")
        self.clients.append(conn)

        # Si deux clients sont connectés, envoyer un message à chacun
        if len(self.clients) == 2:
            print("Deux clients connectés, envoi du message.")
            for client in self.clients:
                client.send("Connexion établie avec l'autre joueur !".encode())

    def start(self):
        """Démarre le serveur."""
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.bind((self.host, self.port))
        server_socket.listen(2)  # Limite à deux connexions
        print("Serveur en attente de connexions...")

        while len(self.clients) < 2:
            conn, addr = server_socket.accept()
            threading.Thread(target=self.handle_client, args=(conn, addr), daemon=True).start()

        print("Tous les clients sont connectés. Le serveur reste actif pour les communications.")

if __name__ == "__main__":
    server = Server()
    server.start()
