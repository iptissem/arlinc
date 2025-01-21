
from flask import Flask, request, jsonify,redirect,url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import os 
from dotenv import load_dotenv


app = Flask(__name__)
mongo_uri = os.getenv("AZURE_COSMOS_DATABASE")

if mongo_uri is None:    
    # Test local
    load_dotenv()
    mongo_uri = os.getenv('MONGO_URI')
    print("La variable d'environnement 'MONGO_URI' n'est pas définie.")
    
    
print("Debug URI Mongo",mongo_uri)

app.config["MONGO_URI"] = mongo_uri
mongo = PyMongo(app)


"""
Connections to all collections 
"""


@app.route('/env',methods =['GET'])
def show_env_variables():
    env_vars = dict(os.environ)
    return jsonify(env_vars),200


Particulierdb = mongo.db.Particulier 
Entreprisedb = mongo.db.Entreprise 
Orderdb = mongo.db.Order 
OrderHistorydb = mongo.db.OrderHistory
Cartdb = mongo.db.Cart

@app.route('/particulier', methods=['GET'])
def get_particuliers():
    utilisateurs = list(Particulierdb.find())
    for utilisateur in utilisateurs:
        utilisateur["_id"] = str(utilisateur["_id"])  # Convertir ObjectId en chaîne
    return jsonify(utilisateurs)

@app.route('/particulier/<id>', methods=['GET'])
def get_particulier(id):
    try:
        utilisateur = Particulierdb.find_one({"_id": ObjectId(id)})  
        if not utilisateur:
            return jsonify({"message": "Utilisateur non trouvé"}), 404  
        utilisateur["_id"] = str(utilisateur["_id"])
        return jsonify(utilisateur), 200

    except Exception as e:
        return jsonify({"message": "Erreur lors de la récupération de l'utilisateur", "error": str(e)}), 400


@app.route('/entreprises', methods=['GET'])
def get_entreprises():
    db = Entreprisedb
    entreprises = list(db.find())
    for entreprise in entreprises:
        entreprise["_id"] = str(entreprise["_id"])  
    return jsonify(entreprises)

@app.route('/entreprise/<id_entreprise>', methods=['GET'])
def get_entreprise(id_entreprise):
    try:
        db = Entreprisedb  
        
        entreprise = db.find_one({"id": id_entreprise}) 
        
        if entreprise is None:
            return jsonify({"message": "Entreprise non trouvée"}), 404  # Si l'entreprise n'existe pas
        
        entreprise["_id"] = str(entreprise["_id"])  
        
        return jsonify(entreprise), 200  

    except Exception as e:
        return jsonify({"message": "Erreur lors de la récupération de l'entreprise", "error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)