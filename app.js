/*************************************** Ajouter les dépendances************************************/
const express = require("express");                 // Je récupère la fonction d'initialisation d'un serveur express

const path = require("path");                       // Je récupère l'opjet path. Il me permet de formater le chemin vers une ressource

const middleware = require("./utils/middlewares");  // J'importe les fonctions middleware depuis le fichier utilitaire
/******************************************** FIN ********************************************** */


// 1. J'initialise le serveur express dans la constante app
const app = express();

// 2. middleware : Affiche l'heure et les infos de chaque requête http reçue. 
app.use(middleware.timeStamp);

// 3. middleware : Je refuse toute requête qui ne serait pas un GET.
app.use(middleware.GETMethodOnly);

/**
 * 4. middleware : Send Ressource
 * 
 *  - Les ressources se trouves dans le dossier /public
 *  - Je précise donc la root du dossier dans laquelle se trouve la ressource, ainsi je cloisonne l'accès des clients dans le dossier /public uniquement.
 */
app.use(function(req,res,next){
    const options = { 
        root : path.join(__dirname,'public')    // Je concatene __dirname et "public" pour former le chemin absolue. J'utilise path.join() pour formater correctement mon chemin
    };
    /**
     * Je récupère la ressources demandé par le client. 
     * Exemple 1 : http://localhost:3000/index.html -> Ressources : index.html
     * Exemple 2 : http://localhost:3000/ress/image.png -> Ressources : ress/image.png
     * La ressource c'est le chemin vers le fichier + le nom du fichier
     */
    const ressource = req.originalUrl;          
    res.status(200).sendFile(ressource,options,function(err){
        if(err){
            /**
             * Si une erreur se produit j'affiche l'erreur dans la console.
             * Puis je passe au middleware suivant, soit la page erreur 404
             */
            console.log(err);
            next();
        }
    });
})

/**
 * 5. middleware : J'envoie au client une page html avec le code de status 404
 * Normalement ce middleware n'est executé que si la ressource demandée dans le middleware précedent n'existe pas
 */
app.use(middleware.Error404)

/**
 * Start server on localhost:3000
 */
app.listen(3000,function(){
    console.log("Server starts");
});

