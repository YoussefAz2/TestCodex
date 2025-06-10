# QR Scan & Pay Backend

Ce projet fournit la structure de base du backend pour l'application **QR Scan & Pay** dédiée à la restauration au Québec. Il est développé avec **Node.js** et **Express**, intègre une API REST minimaliste ainsi qu'un serveur **WebSocket** prêt à l'emploi.

## Structure

```
src/
  app.js            # Configuration de l'application Express
  index.js          # Point d'entrée du serveur HTTP/WebSocket
  websocket.js      # Initialisation du serveur WebSocket (/ws)
  routes/
    index.js        # Agrégation des routes API
    health.js       # Endpoint GET /api/health
    public/         # Routes accessibles aux clients
    admin/          # Routes de gestion (auth requise)
  controllers/
    healthController.js
    public/
    admin/
  models/
    index.js        # Helper PostgreSQL
    restaurants.js
    menuItems.js
    orders.js
  middleware/
    isAdmin.js      # Placeholder auth admin
  config/
    database.js     # Connexion PostgreSQL via pg
  auth/
    index.js        # Squelette OAuth + Guest Mode
  .env.example      # Variables d'environnement
  schema.sql        # Schéma SQL de la base
package.json
```

## Lancer en développement

```bash
npm install
npm run dev
```

Le serveur écoute par défaut sur le port défini dans `.env` (3000 par défaut).
Endpoints principaux disponibles :

- `GET /api/health` : healthcheck
- `GET /api/public/restaurants/:id/menu` : menu public d'un restaurant
- `POST /api/orders` : création de commande (public)
- Routes admin sous `/api/...` protégées par `isAdmin` pour gérer les restaurants et les plats.

Le WebSocket est accessible sur `/ws`.

Cette base est conçue pour évoluer : intégration future de l'authentification OAuth ou du mode invité, connecteurs POS, KDS, etc., conformément au contexte du projet.

## Frontend

Le dossier `frontend/` contient l'application Next.js qui consomme cette API. Pour l'utiliser :

```bash
cd frontend
npm install
npm run dev
```

Les pages principales côté client sont :
- `/menu?restaurant_id=X` : affiche le menu d'un restaurant
- `/cart` : panier local
- `/checkout` : résumé et choix du pourboire
- `/confirmation` : confirmation de commande

Un petit panel admin est disponible sous `/admin` :
- `/admin/login` : connexion simplifiée
- `/admin/menu` : gestion des plats
- `/admin/settings` : paramètres du restaurant

