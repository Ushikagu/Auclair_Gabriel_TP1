/*Les constantes */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient; // le pilote MongoDB
const ObjectID = require('mongodb').ObjectID;
let util = require("util");


//Le chemin du contenue client 
app.use(express.static('public'));

/*Association de templates*/
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

/*
 * Les routes vers l'application
 *  Accueil, modifier, ajouter, supprimer, trier, page 404
 */

app.get('/membres', function (req, res) {
   let cursor = db.collection('adresse').find().toArray(function(err, resultat){
		 if (err) return console.log(err)
		 console.log('util = util = ' + util.inspect(resultat));
		
		 res.render('adresses.ejs', {membres: resultat})
	})
})


/*Raccourcie pour accueil*/
app.get('/', (req, res) => {
   	res.render('accueil.ejs');
})


/*Raccourcie pour ajouter*/
app.get('/ajouter', function (req, res) {

db.collection('adresse').save(req.query, (err, result) => {
	 if (err) return console.log(err)
	 res.redirect('/membres')
})
})


app.post('/modifier', function (req, res) {
 let laModif = {
 "_id": ObjectID(req.body['_id']),
 nom: req.body.nom,
 prenom:req.body.prenom, 
 telephone:req.body.telephone,
 courriel:req.body.courriel
 }


	db.collection('adresse').save(laModif, (err, result) => {
		if (err) return console.log(err)
		res.redirect('/membres')

	})
})






app.get('/supprimer/:id', (req, res) => {
    let id = req.params.id
    db.collection('adresse').findOneAndDelete({"_id": ObjectID(req.params.id)}, (err, resultat) => {

    if (err) return console.log(err)
        res.redirect('/membres')  // redirige vers la route qui affiche la collection
    })
})


let db // variable qui contiendra le lien sur la BD
MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et port 8081')
 })

})