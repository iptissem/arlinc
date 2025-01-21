const http = require('http');
const port = process.env.PORT || 3000; // Si la variable d'environnement PORT est définie, elle sera utilisée, sinon il se tournera vers le port 3000 par défaut.
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World! Coucou');
});

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

// URL de connexion MongoDB (remplacez par votre URL dans Azure)
const uri = process.env.MONGODB_URI;


// Nom de la base de données
const dbName = "arlinc_database";

app.get('/', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        // Connexion à MongoDB
        await client.connect();
        console.log("Connecté à MongoDB");

        // Accès à la base de données
        const db = client.db(dbName);

        // Obtenir les noms des collections
        const collections = await db.listCollections().toArray();

        // Préparer les noms des collections
        const collectionNames = collections.map((collection) => collection.name);

        // Envoyer les noms des collections comme réponse
        res.json({
            message: "Collections dans la base de données",
            collections: collectionNames,
        });
    } catch (err) {
        console.error("Erreur :", err);
        res.status(500).json({ error: "Une erreur s'est produite" });
    } finally {
        // Fermeture de la connexion
        await client.close();
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
