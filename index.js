const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const mongoUri = process.env.AZURE_COSMOS_DATABASE || process.env.MONGO_URI;

if (!mongoUri) {
    console.log("La variable d'environnement 'MONGO_URI' n'est pas définie.");
}   

console.log("Debug URI Mongo", mongoUri);

const client = new MongoClient(mongoUri);
let Particulierdb, Entreprisedb, Orderdb, OrderHistorydb, Cartdb;

client.connect().then(() => {
    const db = client.db();
    Particulierdb = db.collection('Particulier');
    Entreprisedb = db.collection('Entreprise');
    Orderdb = db.collection('Order');
    OrderHistorydb = db.collection('OrderHistory');
    Cartdb = db.collection('Cart');
}).catch(err => console.error(err));

app.get('/env', (req, res) => {
    res.status(200).json(process.env);
});

app.get('/particulier', async (req, res) => {
    const utilisateurs = await Particulierdb.find().toArray();
    utilisateurs.forEach(utilisateur => {
        utilisateur._id = utilisateur._id.toString(); // Convertir ObjectId en chaîne
    });
    res.json(utilisateurs);
});

app.get('/particulier/:id', async (req, res) => {
    try {
        const utilisateur = await Particulierdb.findOne({ _id: ObjectId(req.params.id) });
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        utilisateur._id = utilisateur._id.toString();
        res.status(200).json(utilisateur);
    } catch (e) {
        res.status(400).json({ message: "Erreur lors de la récupération de l'utilisateur", error: e.message });
    }
});

app.get('/entreprises', async (req, res) => {
    const entreprises = await Entreprisedb.find().toArray();
    entreprises.forEach(entreprise => {
        entreprise._id = entreprise._id.toString();
    });
    res.json(entreprises);
});

app.get('/entreprise/:id_entreprise', async (req, res) => {
    try {
        const entreprise = await Entreprisedb.findOne({ id: req.params.id_entreprise });
        if (!entreprise) {
            return res.status(404).json({ message: "Entreprise non trouvée" });
        }
        entreprise._id = entreprise._id.toString();
        res.status(200).json(entreprise);
    } catch (e) {
        res.status(400).json({ message: "Erreur lors de la récupération de l'entreprise", error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




/* const express = require('express');
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