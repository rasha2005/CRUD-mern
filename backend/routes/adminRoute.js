const express = require('express');
const admin_route = express();

const adminController = require('../controller/adminController');

admin_route.post('/insert' , adminController.insertAdmin);

admin_route.post('/adminLogin',adminController.adminLogin);

admin_route.get('/getUserList',adminController.getUserList);

admin_route.delete('/deleteUser/:userId' , adminController.deleteUser);

admin_route.put('/editUser/:userId' , adminController.editUser);



module.exports =  admin_route;