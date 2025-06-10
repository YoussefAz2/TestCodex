Ce projet fournit la structure de base du backend pour l'application QR Scan & Pay dédiée à la restauration au Québec. Il est développé avec Node.js et Express, intègre une API REST minimaliste ainsi qu'un serveur WebSocket prêt à l'emploi.

Structure
src/app.js — Configuration de l'application Express

src/index.js — Point d'entrée du serveur HTTP/WebSocket

src/websocket.js — Initialisation du serveur WebSocket (/ws)

src/routes/index.js — Agrégation des routes API

src/routes/health.js — Endpoint GET /api/health

src/routes/public/ — Routes accessibles aux clients

src/routes/admin/ — Routes de gestion (auth requise)

src/controllers/healthController.js

src/controllers/public/

src/controllers/admin/

src/models/ — Modèles PostgreSQL

src/middleware/isAdmin.js — Placeholder auth admin

src/config/database.js — Connexion PostgreSQL

src/auth/index.js — Squelette OAuth + Guest Mode

.env.example — Variables d'environnement

schema.sql — Schéma SQL de la base

package.json

Lancer en développement
bash
Copier
Modifier
npm install
npm run dev
Le serveur écoute par défaut sur le port défini dans .env (3000 par défaut).
Endpoints principaux disponibles :

GET /api/health : healthcheck

GET /api/public/restaurants/:id/menu : menu public d'un restaurant

POST /api/orders : création de commande (public)

Routes admin sous /api/... protégées par isAdmin pour gérer les restaurants et les plats.

Le WebSocket est accessible sur /ws.

Frontend
Le dossier frontend/ contient l'application Next.js qui consomme cette API. Pour l'utiliser :

bash
Copier
Modifier
cd frontend
npm install
npm run dev
Les pages principales côté client sont :

/menu?restaurant_id=X : affiche le menu d'un restaurant

/cart : panier local

/checkout : résumé et choix du pourboire

/confirmation : confirmation de commande

Un petit panel admin est disponible sous /admin :

/admin/login : connexion simplifiée

/admin/menu : gestion des plats

/admin/settings : paramètres du restaurant

Contexte Produit & Consignes IA
Projet : QR Scan & Pay Application pour restauration au Québec
1️⃣ Objectif global
Créer une application Web (WebApp mobile-first) de commande et paiement QR code pour restauration.

Destinée à : restaurants, bars, cafés, food trucks.

Usage en service en salle uniquement (pas de livraison).

Le client scanne un QR → visualise le menu → commande → paie directement → reçoit ses plats.

2️⃣ Priorités UX
Simplicité absolue pour le client → UX fluide, friction minimale.

Pas de création de compte obligatoire pour commander.

Gamification / fidélisation proposée après le paiement (facultatif).

Support complet bilingue FR/EN → Québec first.

Gestion adaptée au contexte québécois : TPS/TVQ, culture du pourboire.

3️⃣ Fonctionnalités majeures
Côté client (WebApp mobile-first) :
Scan QR → ouverture menu WebApp.

Menu interactif, photos, descriptions.

Commande groupée possible (panier partagé par plusieurs clients d’une même table).

Paiement intégré : CB, Apple Pay, Google Pay, Interac.

Option "ardoise" → commander en plusieurs fois, payer à la fin.

Gestion des pourboires fine et adaptée.

Accessibilité : responsive, contraste élevé, taille police réglable.

Option d’enregistrement email/téléphone après le paiement (fidélisation facultative).

Côté cuisine / resto :
Commandes transmises en temps réel → POS / KDS / Imprimante.

Dashboard de gestion des commandes.

Auto-splitting de l’addition.

Analytics avancés (plats populaires, heures de rush, CRM exportable).

Support robots serveurs / IoT (préparer API pour intégration future).

4️⃣ Architecture technique à respecter
Frontend
React.js (Next.js recommandé pour SSR / SEO optimisé).

Framework CSS : Tailwind CSS.

WebApp responsive → pas d’app native.

i18n dès la base.

Backend
Node.js (Express ou NestJS).

API REST + WebSocket (commande → cuisine en temps réel).

Base de données : PostgreSQL.

Auth : OAuth (Google, Apple, Facebook) + Guest Mode.

Intégration email/SMS : Sendgrid, Twilio.

Paiement
Stripe → Apple Pay, Google Pay, CB, Interac.

POS
Connecteurs pour Lightspeed, Square, Toast POS.

KDS
WebApp dédiée ou module intégré pour KDS.

Infrastructure
AWS (EC2, RDS, S3).

CDN (Cloudfront).

Scalable.

Sécurité
Transactions chiffrées E2E.

Conformité PCI-DSS.

RGPD / loi canadienne respectée pour collecte opt-in.

5️⃣ Principes clés à toujours respecter
✅ Favoriser la simplicité du parcours client (scan → menu → commande → paiement → done).
✅ Pas d’imposition de compte pour commander → proposer en option après paiement.
✅ Adapter l’expérience au contexte québécois (bilingue, pourboires, taxes).
✅ Respecter la structure technique définie.
✅ Préparer le produit pour scaling (API-first, support robotique, intégration future).
✅ Garder en tête la logique de fidélisation facultative mais intégrée (bonus points, badges → en soft layer).
✅ Optimisation de l’expérience RESTO → améliorer productivité, rotation table, CA.

6️⃣ Usage avec IA
Tout assistant IA qui code sur ce projet doit lire et respecter ce README en permanence.
👉 En début de session IA, réinjecter ce contexte si nécessaire.
👉 Aucune modification de l’UX ou de l’architecture technique ne doit être faite sans respecter ces consignes.
👉 Toute nouvelle feature doit respecter cette base.

Multi-resto et séparation des interfaces
L'application doit supporter plusieurs restaurants de manière indépendante.

Chaque restaurant a son propre compte, ses propres paramètres, son propre menu, ses propres commandes.

L'architecture doit être multi-tenant : toutes les données sont liées à un restaurant_id.

Interfaces / API
1️⃣ Interface "Admin" (côté restaurant / staff)
Gestion du compte restaurant.

Gestion du menu (ajout, édition, suppression d’items).

Configuration des paramètres (TPS/TVQ, tips, logo, horaires, disponibilité des plats).

Suivi des commandes en temps réel (Dashboard / KDS).

2️⃣ Interface "Client" (publique)
Le client scanne un QR code lié à un restaurant_id.

L’application récupère et affiche le menu correspondant (/api/public/restaurants/:id/menu).

Le client construit sa commande.

Paiement intégré.

Suivi de l’état de sa commande (optionnel).

Résumé :
Côté	API principale	Accès
Admin (staff)	/api/restaurants/... + /menu_items + /settings	Authentifié staff
Client	/api/public/restaurants/:id/menu + /orders + /payment	Public (guest ou logged)

La logique "multi-resto" doit être respectée dans toute la conception du backend et de la base de données.
Les appels clients doivent TOUJOURS spécifier un restaurant_id en amont pour contextualiser le menu et les commandes.

