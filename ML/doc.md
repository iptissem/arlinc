# Contexte
## Data modeling
<img src="data_modeling.png" alt="data modeling" width="500"/><br>
Afin de remplir notre base de données, nous avons créer un [script](./create_dataset.py) pour générer des données. Dans le dossier [data](./data), il y a un fichier csv correspondant à chaque table.

## Principe
Un 'Entreprise' peut publier un 'Cart'. Un Particulier peut réserver un 'Cart' en précisant 'quantity' en fonction de 'Cart.quantity' qui diminue. Cette opération crée un ligne dans 'Order'. Lorsque 'Particulier' récupère son 'Order', on ajoute une ligne dans OrderHistory en précisant recuperation_date

# Objectif
* Entrainer un model de machine learning qui permettra à un 'Entreprise' de savoir quelles sont les chances pour que 75% de 'Cart.quantity' d'un 'Cart' soient récupérés : [Model](./predict_taken_at_75_proba.ipynb)
* Entrainer un model de machine learning qui permettra à un 'Entreprise' de savoir combien de 'Cart.quantity' d'un 'Cart' seront récupérés : [Model](./predict_how_many_taken.ipynb)

# Utilisation
Les résultats de ces modèles permettront aux 'Entreprise' d'optimiser le 'Cart.quantity' de 'Cart' qu'ils publient en fontion des autres champs de 'Cart'

# Récupération des données
Pour ces modeles, nous auront besoin des champs suivant:
* cart_type: le type de panier
* entreprise_email: email de l'entreprise
* entreprise_name: le nom (franchise) de l'entreprise
* entreprise_city: la ville de l'entreprise
* day_publication: le jour (jour de la semaine: Lundi au Dimanche) de publication du panier
* month_publication: le mois de publication du panier
* hour_publication: l'heure de publication du panier
* quantity_published: la quantité lors de la première publication du panier
* quantity_reserved: la quantité total réservée sur un panier
* quantity_take: la quantité total récupérée sur un panier

Un [dataset](./data/Prediction.csv) a été crée sur cette base à partir des fichiers csv corresdants aux tables (dans le dossier data). Le script de création de ce dataset se trouve [ici](./create_prediction_dataset.ipynb)


---

### Modèle de Prédiction de la Prise d'un Panier

#### 1. **Contexte**
Le modèle de prédiction a pour objectif de déterminer la probabilité qu'un panier de produits soit pris par les consommateurs, en fonction de diverses informations sur le panier et l'entreprise qui le propose. Ce modèle peut être utilisé pour optimiser les stocks, ajuster les quantités réservées et mieux comprendre les comportements des consommateurs.

#### 2. **Données d'Entrée**

Le modèle prend en entrée un dictionnaire de caractéristiques décrivant le panier, contenant les informations suivantes :

- **cart_type** : Le type de panier (ex : "frais").
- **entreprise_name** : Le nom de l'entreprise qui propose le panier.
- **entreprise_city** : La ville où se situe l'entreprise.
- **entreprise_email** : L'email de l'entreprise.
- **day_publication** : Le jour de la publication de l'offre (de 1 à 31).
- **month_publication** : Le mois de la publication (de 1 à 12).
- **hour_publication** : L'heure de la publication de l'offre (de 0 à 23).
- **quantity_published** : La quantité totale du panier publiée.
- **quantity_reserved** : La quantité réservée jusqu'à présent.

#### 3. **Prétraitement des Données**

Avant d'être envoyées au modèle, les données catégorielles sont prétraitées. Ce prétraitement utilise un encodage par **LabelEncoder** de scikit-learn. Les colonnes catégorielles suivantes sont encodées :

- **cart_type** : Le type du panier.
- **entreprise_name** : Le nom de l'entreprise.
- **entreprise_city** : La ville de l'entreprise.
- **entreprise_email** : L'email de l'entreprise.

Le prétraitement garantit que les variables catégorielles sont transformées en valeurs numériques compatibles avec le modèle d'apprentissage automatique.

#### 4. **Modèle de Prédiction**

Une fois les données traitées, elles sont envoyées à un modèle d'apprentissage supervisé pour effectuer la prédiction. Le modèle est configuré pour prédire la probabilité qu'au moins 75% de la quantité disponible d'un panier soit prise par les consommateurs.

Le modèle utilise **predict_proba()** pour calculer la probabilité que l'événement se produise. Cette probabilité est renvoyée en pourcentage.

#### 5. **Fonction de Prédiction**

Voici un exemple de fonction pour effectuer la prédiction sur un panier :

```python
def predict_if_will_be_take(cart):
    # Encodage des colonnes catégorielles
    for col in ['cart_type', 'entreprise_email', 'entreprise_name', 'entreprise_city']:
        if cart[col] not in label_encoders[col].classes_:
            raise ValueError(f"La valeur '{cart[col]}' pour la colonne '{col}' n'existe pas dans l'encodage.")
        cart[col] = label_encoders[col].transform([cart[col]])[0]
    
    # Préparer les données pour le modèle
    test_input = np.array([[cart['cart_type'], 
                            cart['entreprise_name'], 
                            cart['entreprise_city'], 
                            cart['entreprise_email'], 
                            cart['day_publication'], 
                            cart['month_publication'], 
                            cart['hour_publication'], 
                            cart['quantity_published'],
                            cart['quantity_reserved']]])
    
    # Prédire la probabilité que la cart soit prise
    probability = model.predict_proba(test_input)[0][1]
    print(f"Probabilité que 75% de la quantité disponible soit prise : {probability:.2%}")
```

#### 6. **Description de la Fonction**

- **Encodage des variables catégorielles** : La fonction commence par transformer les valeurs de colonnes catégorielles en valeurs numériques via le `LabelEncoder` pour garantir leur compatibilité avec le modèle.
  
- **Préparation des données** : Ensuite, elle prépare les données sous forme de tableau (array) pour être envoyées au modèle.

- **Prédiction de la probabilité** : Le modèle prédit la probabilité que 75% ou plus de la quantité d'un panier soit prise par les consommateurs. Cette probabilité est ensuite affichée sous forme de pourcentage.

#### 7. **Exemple d'Entrée**

Voici un exemple d'entrée pour la fonction `predict_if_will_be_take` :

```python
new_cart = {
    "cart_type": "frais",
    "entreprise_name": "Carrefour",
    "entreprise_city": "Nice",
    "entreprise_email": "entreprise14@example.com",
    "day_publication": 2,
    "month_publication": 7,
    "hour_publication": 10,
    "quantity_published": 70,
    "quantity_reserved": 23
}
```

Dans cet exemple, le panier est un panier de type "frais", publié le 2 juillet à 10 heures, avec 70 articles publiés et 23 réservés jusqu'à présent.

#### 8. **Sortie de la Prédiction**

La fonction retourne la probabilité que 75% ou plus de la quantité disponible soit prise. Par exemple, une sortie pourrait ressembler à :

```
Probabilité que 75% de la quantité disponible soit prise : 68.45%
```

#### 9. **Prérequis**

- **LabelEncoder** de scikit-learn pour l'encodage des variables catégorielles.
- **Modèle d'apprentissage supervisé entraîné** : Le modèle doit avoir été préalablement entraîné pour effectuer la prédiction.
- **NumPy** pour la gestion des données d'entrée sous forme de tableau.

#### 10. **Améliorations Possibles**

- **Optimisation des paramètres du modèle** : Expérimenter avec différents algorithmes et techniques d'entraînement (comme la validation croisée) pour améliorer les performances du modèle.
- **Ajout de nouvelles variables** : Incorporer des variables supplémentaires, comme des facteurs saisonniers ou des promotions, pour mieux prédire la demande.

