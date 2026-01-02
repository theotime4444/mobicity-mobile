# MobiCity - Application Mobile
---
## 🛠️ Prérequis
Avant de commencer, assurez-vous d'avoir installé :
* Node.js : (https://nodejs.org/)
* Docker & Docker Compose : (https://www.docker.com/products/docker-desktop/)
* Expo Go : (https://expo.dev/client) sur votre smartphone
---

## Installation et Lancement


### 1. API
L'application mobile nécessite l'API MobiCity pour fonctionner.

1. Le dépôt de l'API :
https://github.com/theotime4444/mobicity-api
Dans le dossier de l'api fait un docker compose up et attendez que le terminal dise que la documentation swagger est générée

Une fois la base de données construite, vous pouvez ouvrir l'application mobile dans un IDE 
- Il vous faudra aller sur le fichier config.js et y changer l'IP pour votre adresse IP afin d'accéder à l'API

et faire les commandes suivantes : 
- **npm install** (installer les dépendances)
- **npx expo start** (lancer l'application)
