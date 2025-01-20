require('dotenv').config(); // Charger les variables d'environnement

const http = require('http');
const { MongoClient } = require('mongodb');

// Utiliser l'URI MongoDB depuis les variables d'environnement
const uri = process.env.MONGODB_URI;  // L'URI MongoDB doit être définie dans les variables d'environnement Azure

// Initialiser le client MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Fonction pour tester la connexion à MongoDB
async function connectDB() {
    try {
        await client.connect(); // Connexion à la base
        console.log("✅ Connexion réussie à MongoDB !");
        return "✅ Connexion réussie à MongoDB !";
    } catch (error) {
        console.error("❌ Erreur de connexion :", error);
        return "❌ Erreur de connexion à MongoDB";
    } finally {
        await client.close(); // Fermer la connexion
    }
}

// Création du serveur HTTP
const server = http.createServer(async (req, res) => {
    // Titre et en-têtes de la réponse
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    // Afficher le message "Hello World" et le test de la base de données
    if (req.url === '/') {
        const mongoStatus = await connectDB(); // Tester la connexion à MongoDB

        // Répondre avec le message "Hello World" et la réponse de la connexion à MongoDB
        res.end(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Page d'Accueil</title>
            </head>
            <body>
                <h1>Hello World ! Vous êtes sur la page d'accueil</h1>
                <p>${mongoStatus}</p>
            </body>
            </html>
        `);
    } else {
        res.statusCode = 404;
        res.end('<h1>Page non trouvée</h1>');
    }
});

// Lancer le serveur
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Serveur en fonctionnement à l'adresse http://localhost:${port}/`);
});
