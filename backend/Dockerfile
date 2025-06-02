# Utilise une image Node.js officielle
FROM node:18

# Crée un dossier dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json s’ils existent
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le projet
COPY . .

# Démarre ton application
CMD ["node", "index.js"]

# Le port exposé si tu utilises un serveur HTTP dans ton code
EXPOSE 3000
