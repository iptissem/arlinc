const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.WEBSITES_PORT || 8080;

// URL de connexion MongoDB (à remplacer par votre chaîne de connexion Azure Cosmos)
const uri = process.env.AZURE_COSMOS_CONNECTIONSTRING;
const dbName = "arlinc_database"; // Nom de la base de données

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'application Express!');
});


// app.get('/test', async (req, res) => {
//   const client = new MongoClient(uri);
//   try {
//       await client.connect();
//       console.log("Connecté à MongoDB");

//       const db = client.db(dbName);
//       const serverStatus = await db.command({ ping: 1 });

//       res.json({
//           message: "Connexion réussie à MongoDB",
//           serverStatus: serverStatus
//       });
//   } catch (err) {
//       console.error("Erreur de connexion MongoDB :", err);
//       res.status(500).json({
//           error: "Impossible de se connecter à la base de données",
//           message: err.message,
//           stack: err.stack // Afficher la pile d'appels pour obtenir plus d'infos
//       });
//   } finally {
//       await client.close();
//   }
// });

app.get('/test', async (req, res) => {
  const client = new MongoClient(uri);

  try {
      // Connexion à MongoDB
      await client.connect();
      console.log("Connecté à MongoDB");

      // Accès à la base de données
      const db = client.db(dbName);

      // Tester la connexion avec une simple opération
      const serverStatus = await db.command({ ping: 1 });

      res.json({
          message: "Connexion réussie à MongoDB",
          serverStatus: serverStatus
      });
  } catch (err) {
      console.error("Erreur de connexion MongoDB :", err);
      res.status(500).json({ error: "Impossible de se connecter à la base de données" });
  } finally {
      // Fermeture de la connexion
      await client.close();
  }
});

// Nouvelle route pour afficher les collections

app.get('/particulier', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        // Connexion au client MongoDB
        await client.connect();
        console.log("Connecté à MongoDB pour la route /particulier");

        // Accès à la base de données et à la collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Récupérer les particuliers
        const particuliers = await collection.find().toArray();

        // Conversion des `_id` en chaîne de caractères
        particuliers.forEach(particulier => {
            particulier._id = particulier._id.toString();
        });

        // Répondre avec les particuliers
        res.json({
            message: "Particuliers récupérés avec succès",
            particuliers: particuliers
        });
    } catch (err) {
        console.error("Erreur lors de la récupération des particuliers :", err);
        res.status(500).json({ error: "Impossible de récupérer les particuliers" });
    } finally {
        // Fermeture de la connexion
        await client.close();
    }
});


app.get('/collections', async (req, res) => {
  const client = new MongoClient(uri);

  try {
      // Connexion à MongoDB
      await client.connect();
      console.log("Connecté à MongoDB");

      // Accès à la base de données
      const db = client.db(dbName);

      // Récupérer les collections
      const collections = await db.listCollections().toArray();

      // Répondre avec la liste des collections
      res.json({
          message: "Collections récupérées avec succès",
          collections: collections.map(collection => collection.name) // Afficher uniquement le nom des collections
      });
  } catch (err) {
      console.error("Erreur lors de la récupération des collections :", err);
      res.status(500).json({ error: "Impossible de récupérer les collections" });
  } finally {
      // Fermeture de la connexion
      await client.close();
  }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
