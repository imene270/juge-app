//relation entre front et back


const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:5000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:5000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

/***********************dossier *********************/
exports.hm = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:5000/api/dossiers')
        .then(function(response){
            res.render('indexD', { dossiers : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}


exports.add_dossier = (req, res) =>{
    res.render('add_dossier');
}

exports.update_dossier = (req, res) =>{
    axios.get('http://localhost:5000/api/dossiers', { params : { id : req.query.id }})
        .then(function(dossierdata){
            res.render("update_dossier", { dossier : dossierdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
