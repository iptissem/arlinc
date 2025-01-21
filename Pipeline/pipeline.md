# Contexte
## Data modeling
<img src="data_modeling.png" alt="data modeling" width="500"/><br>

## SGBD
Nous sommes parties sur une base de donnée NoSQL créée avec Azure Cosmos DB for MongoDB. Notre base de donnée principale sera: arlinc_database
<img src="./mongodb_compass.png" alt="base de donnée" width="500"/><br>

# Objectif
Créer une pipeline de donnée pour créer le dataset à utiliser pour l'entrainement des modèles prédictifs

# Développement
## Création d'un Azure Data Factory
Nous l'appellerons SmartEco-DataFactory

## Importation des collections de arlinc_database sur SmartEco-DataFactory
<img src="./dataset_data_factory.png" alt="dataset sur SmartEco-DataFactory" width="500"/><br>
Comme vous pouvez le voir sur l'image ci-dessus, nous avons importer les toutes les collections. Nous avons également créer une collection Recepteur où seront stockées les données récupérées grâce au pipeline.

## Création du pipeline
### Copier la table Cart
<img src="./retrieve_cart_rows.png" alt="retrieve Cart rows" width="500"/><br>
Pour commencer nous copions tous les documents de la collection Cart dans Recepteur. Ci-après le code source:
```yml
{
    "name": "Retrieve_Cart_rows",
    "type": "Copy",
    "dependsOn": [],
    "policy": {
        "timeout": "0.12:00:00",
        "retry": 0,
        "retryIntervalInSeconds": 30,
        "secureOutput": false,
        "secureInput": false
    },
    "userProperties": [],
    "typeProperties": {
        "source": {
            "type": "CosmosDbMongoDbApiSource",
            "batchSize": 100
        },
        "sink": {
            "type": "CosmosDbMongoDbApiSink",
            "writeBatchTimeout": "00:30:00",
            "writeBehavior": "insert"
        },
        "enableStaging": false
    },
    "inputs": [
        {
            "referenceName": "Cart",
            "type": "DatasetReference"
        }
    ],
    "outputs": [
        {
            "referenceName": "Recepteur",
            "type": "DatasetReference"
        }
    ]
}
```
En l'executant nous avons ceci:
<br><img src="./test_pipeline.png" alt="test retrieve Cart rows" width="200"/><br>