const express = require('express');
const user_route = express();

const userController = require('../controller/userController');

user_route.post('/insertUser',userController.insertUser);

user_route.get('/getUser/:userId' , userController.getUser);

user_route.put('/updateUser/:userId' ,userController.updateUser );

user_route.post('/userLogin',userController.userLogin);


module.exports = user_route;