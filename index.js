const http = require('http');
const { MongoClient } = require('mongodb');

// Remplace par ton URI MongoDB Atlas ou autre hébergeur
const uri = process.env.MONGODB_URI;
console.log(uri);

// Initialiser le client MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect(); // Connexion à la base
        console.log("✅ Connexion réussie à MongoDB !");

        const db = client.db("arlinc_database"); // Sélectionner la base
        const cartItems = await db.collection('Cart').find().toArray(); // Récupérer tous les articles de la collection Cart
        return cartItems;
    } catch (error) {
        console.error("❌ Erreur de connexion :", error);
    } finally {
        await client.close(); // Fermer la connexion
    }
}

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    // Si la requête est à la racine, on envoie "Hello World" et le tableau
    if (req.url === '/') {
        const cartItems = await connectDB(); // Récupérer les données de la collection Cart
        let tableRows = '';
        
        if (cartItems && cartItems.length > 0) {
            // Créer le tableau HTML avec les données
            tableRows = cartItems.map(item => {
                return `<tr>
                    <td>${item._id}</td>
                    <td>${item.commerce}</td>
                    <td>${item.quantity}</td>
                    <td>${item.type}</td>
                    <td>${item.end_date}</td>
                    <td>${item.creation_date}</td>
                </tr>`;
            }).join('');
        }

        // Répondre avec la page HTML contenant "Hello World" et le tableau
        res.end(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Liste des Cart Items</title>
                <style>
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>Hello World</h1>
                <h2>Liste des Articles du Panier</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Commerce</th>
                            <th>Quantité</th>
                            <th>Type</th>
                            <th>Date de Fin</th>
                            <th>Date de Création</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </body>
            </html>
        `);
    } else {
        res.statusCode = 404;
        res.end('<h1>Page non trouvée</h1>');
    }
});

// Le serveur écoute sur le port 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Serveur en fonctionnement à l'adresse http://localhost:${port}/`);
});
