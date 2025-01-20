const http = require('http');
const { MongoClient } = require('mongodb');

// Remplace par ton URI MongoDB Atlas ou autre hébergeur
const uri = process.env.MONGODB_URI;
console.log(uri);

// Initialiser le client MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 3000; // Port pour le serveur HTTP

async function connectDB() {
    try {
        await client.connect(); // Connexion à la base
        console.log("✅ Connexion réussie à MongoDB !");

        const db = client.db("arlinc_database"); // Sélectionner la base de données
        return db; // Retourner la base de données pour l'utiliser dans le serveur HTTP

    } catch (error) {
        console.error("❌ Erreur de connexion :", error);
        return null;
    }
}

// Création du serveur HTTP
const server = http.createServer(async (req, res) => {
    // Titre et en-têtes de la réponse
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    const db = await connectDB(); // Récupérer la base de données

    if (!db) {
        res.end(JSON.stringify({ message: "Erreur de connexion à la base de données." }));
        return;
    }

    try {
        // Récupérer les collections disponibles dans la base de données
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name); // Extraire les noms des collections

        // Récupérer tous les documents de la collection "Cart"
        const cartCollection = db.collection("Cart");
        const cartItems = await cartCollection.find({}).toArray();

        // Préparer la réponse avec les collections et les documents "Cart"
        res.end(JSON.stringify({
            collections: collectionNames, // Afficher les noms des collections
            cartItems: cartItems // Afficher les documents de la collection Cart
        }, null, 2)); // Formater le JSON pour une lecture facile

    } catch (error) {
        console.error("❌ Erreur lors de la récupération des données :", error);
        res.end(JSON.stringify({ message: "Erreur lors de la récupération des données." }));
    } finally {
        await client.close(); // Fermer la connexion à la base de données après la requête
    }
});

// Lancer le serveur
server.listen(port, () => {
    console.log(`Serveur en fonctionnement à l'adresse http://localhost:${port}/`);
});
