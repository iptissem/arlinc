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
/* 
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
 */

const connectToDb = async () => {
    const client = new MongoClient(uri);
    await client.connect();
    return client;
};

// Routes GET pour les collections
app.get('/cart', async (req, res) => {
    const client = await connectToDb();
    const db = client.db(dbName);
    const collection = db.collection('cart');
    const data = await collection.find().toArray();
    client.close();
    res.json(data);
});

app.get('/order', async (req, res) => {
    const client = await connectToDb();
    const db = client.db(dbName);
    const collection = db.collection('order');
    const data = await collection.find().toArray();
    client.close();
    res.json(data);
});

app.get('/orderhistory', async (req, res) => {
    const client = await connectToDb();
    const db = client.db(dbName);
    const collection = db.collection('orderhistory');
    const data = await collection.find().toArray();
    client.close();
    res.json(data);
});

app.get('/entreprise', async (req, res) => {
    const client = await connectToDb();
    const db = client.db(dbName);
    const collection = db.collection('entreprise');
    const data = await collection.find().toArray();
    client.close();
    res.json(data);
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});