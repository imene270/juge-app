
var Dossierdb = require('../model/dossier');
var express = require('express');

var bodyParser = require('body-parser')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var dossierDB = require('../model/dossier');

/************************user*********** */
// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    console.log(req.body)
    // new user  
    const dossier = new dossierDB({
           ref:req.body.ref,
          // nom_juge:req.body.nom_juge,
           dateAudiance:req.body.dateAudiance,
           nom_etat:req.body.nom_etat,
           date_etat:req.body.date_etat,
           date_r:req.body.date_r,
           date_l:req.body.date_l,
           complete:req.body.complete,
           region:req.body.region,
           code_postal:req.body.code_postal,
           maps_code:req.body.maps_code
    
    })

    // save user in the database
    dossier
        .save(dossier)
        .then(data => {
            //res.send(data)
            res.redirect('/add-dossier');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// exports.create = (req,res)=>{
    
//     // validate request
//     if(!req.body){
//         res.status(400).send({ message : "Content can not be emtpy!"});
//         return;
//     }
//     // new folder   
//     console.log(req.body); // the posted data

//     const dossier = new Dossierdb({
        
//         ref: req.body.ref,
//         // name_dossier: req.body.name_dossier,
//         // date_dossier: req.body.date_dossier,
//         // nom_etat: req.body.nom_etat,
//         // date_etat: req.body.date_etat,
//         complete: req.body.complete,
//         region: req.body.region,
//         // code_postal: req.body.code_postal,
//         // maps_code: req.body.maps_code, 
//     })
//     // save dossier in the database
//     dossier
//         .save(dossier)
//         .then(dat => {
//            res.send(dat)
//             // res.redirect('/add-dossier');
  
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message : err.message || "Some error occurred while creating a create operation"
//             });
//         });
// }

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Dossierdb.findById(id)
            .then(dat =>{
                if(!dat){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(dat)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Dossierdb.find()
            .then(dossier => {
                res.send(dossier)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }    
}

// Update a new idetified folder by folder id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Dossierdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}



// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Dossierdb.findByIdAndDelete(id)
        .then(dat => {
            if(!dat){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}


