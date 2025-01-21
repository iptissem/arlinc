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

