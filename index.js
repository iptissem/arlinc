const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.WEBSITES_PORT || 8080;

// URL de connexion MongoDB (à remplacer par votre chaîne de connexion Azure Cosmos)
const uri = process.env.AZURE_COSMOS_CONNECTIONSTRING;
const dbName = "arlinc_database"; // Nom de la base de données

app.get('/test', async (req, res) => {
  const client = new MongoClient(uri);
  try {
      await client.connect();
      console.log("Connecté à MongoDB");

      const db = client.db(dbName);
      const serverStatus = await db.command({ ping: 1 });

      res.json({
          message: "Connexion réussie à MongoDB",
          serverStatus: serverStatus
      });
  } catch (err) {
      console.error("Erreur de connexion MongoDB :", err);
      res.status(500).json({
          error: "Impossible de se connecter à la base de données",
          message: err.message,
          stack: err.stack // Afficher la pile d'appels pour obtenir plus d'infos
      });
  } finally {
      await client.close();
  }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
