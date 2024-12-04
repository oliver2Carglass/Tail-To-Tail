# 🐍 **Récapitulatif du Jeu Multijoueur Snake (Planification et Résolution)**

---

## 🎮 **Règles et Gameplay :**

### 🛠️ **Grille :**
- 🧩 **Taille :** 9x9.
- 🎯 **Positions Initiales :** 
  - Joueur 1 commence en **(8, 4)** (en bas).
  - Joueur 2 commence en **(0, 4)** (en haut).

---

### 📋 **Planification des Mouvements :**
- 🚶‍♂️ **Mouvements Planifiés :** Chaque joueur prévoit **3 déplacements** à l'avance.
- ✅ **Confirmation :** Les déplacements sont envoyés après confirmation.
- ❌ **Règles de Déplacement :**
  - Interdit de revenir sur ses pas.
  - Interdit de sortir de la grille.
  - Interdit de repasser sur son propre chemin.

---

### ⏩ **Résolution des Mouvements :**
- 🕒 **Exécution des Mouvements :** 
  - Les 3 déplacements sont résolus simultanément par le serveur.
  - **Animation case par case** : 1 seconde par pas.
- 🕶️ **Vision Limitée :**
  - Les joueurs ne voient pas les déplacements de l’adversaire en temps réel.
  - Ils découvrent l’évolution des déplacements uniquement à la fin de la résolution.

---

### 🏆 **Conditions de Victoire et Défaite :**
- 🔪 **Collision des Chemins :** 
  - Le joueur qui coupe le chemin de l’autre gagne.
- 🛑 **Aucun Déplacement Possible :** 
  - Si un joueur ne peut plus se déplacer, il perd (**à implémenter plus tard**).
- ⏳ **Temps Limite :**
  - Si un joueur ne confirme pas ses déplacements dans **30 secondes**, il perd.
- 🤝 **Égalité :**
  - Si les deux joueurs atterrissent sur la même case au même moment, la partie se termine par une égalité.

---

## 🖥️ **Structure Technique :**

### 🗂️ **Fichier `game.py`** (Classe `Game`) :
- 🎲 **Responsabilités :**
  - Gestion de la grille (positions des joueurs, marquage des cases visitées).
  - Validation des déplacements (respect des règles).
  - Résolution des mouvements simultanés case par case.
  - Détection des conditions de :
    - 🏆 Victoire
    - ❌ Défaite
    - 🤝 Égalité.
- 🧮 **Méthodes Principales :**
  - `validate_moves()` : Vérifie les déplacements soumis.
  - `resolve_moves()` : Applique les déplacements et détecte les résultats.
  - `update_grid()` : Met à jour la grille.

---

### 🗂️ **Fichier `server.py`** :
- 🌐 **Gestion des Connexions :**
  - Connecte deux joueurs et les identifie (Joueur 1 et Joueur 2).
- 📨 **Gestion des Déplacements :**
  - Reçoit les déplacements planifiés.
  - Utilise `Game` pour appliquer les règles et résoudre les déplacements.
- 🔄 **Animation Synchronisée :**
  - Envoie les résultats des déplacements aux deux clients (case par case).
- ⚖️ **Résultats :**
  - Gère les cas de victoire, défaite, égalité, ou perte par dépassement de temps.

---

### 🗂️ **Fichier `client.py`** :
- 🖥️ **Interface Joueur :**
  - Affiche la grille et les déplacements.
  - Permet de planifier et confirmer les 3 déplacements.
  - Affiche les animations des résultats envoyés par le serveur.
- 🕒 **Gestion du Temps Limite :**
  - Si le joueur ne confirme pas dans 30 secondes, il perd.
- 🎨 **Design et Animation :**
  - Animation des déplacements sur la grille.
  - Adaptée pour chaque joueur (Joueur 1 ou Joueur 2).

---

## 🛠️ **Prochaines Étapes :**

1. **Créer `game.py` :**
   - Implémenter la classe `Game` :
     - Gestion des règles, déplacements, et résultats.

2. **Mettre à jour `server.py` :**
   - Ajouter :
     - La réception des mouvements des joueurs.
     - L'intégration de `Game` pour appliquer les règles.
     - La synchronisation des animations.

3. **Mettre à jour `client.py` :**
   - Ajouter :
     - Planification et confirmation des déplacements.
     - Animation des résultats reçus.
     - Gestion du temps limite.

---

## 💡 **Règles Additionnelles à Implanter Plus Tard :**
- 🎲 **Plus de Déplacements Possibles :** Si un joueur ne peut plus se déplacer, il perd.
- 🏁 **Résultat Final :** Récapitulatif des déplacements et du résultat final après la partie.

---

💬 **Des questions ou ajustements avant que je commence ?** 😊