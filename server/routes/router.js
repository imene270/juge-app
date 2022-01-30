const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const controllerd = require('../controller/controllerd');


// ...

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)



/********************dossier  *******************/

/**
 *  @description Root R
 *  @method GET /dossiers
 */
 route.get('/dossiers', services.hm);

/**
 *  @description add dossiers
 *  @method GET /add-dossier
 */
 route.get('/add-dossier', services.add_dossier)

 /**
  *  @description for update dossier
  *  @method GET /update-dossier
  */
 route.get('/update-dossier', services.update_dossier)



// API user
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
// API dossier
route.post('/api/dossiers', controllerd.create);
route.get('/api/dossiers', controllerd.find);
route.put('/api/dossiers/:id', controllerd.update);
route.delete('/api/dossiers/:id', controllerd.delete);

/************************** */

  
module.exports = route