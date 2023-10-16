const Router = require('express').Router();

const spaConstrollers = require('../controllers/spaController')

const { getAllServices, getOneService, deleteService, modifyService, addService, addMultiplesServices, deleteManyServices} = spaConstrollers;

Router.route('/spa')
.get(getAllServices)
.post((req,res)=>{Array.isArray(req.body.data) ? addMultiplesServices(req,res):addService(req,res)})
.delete(deleteManyServices)

Router.route('/spa/:id')
.get(getOneService)
.delete(deleteService)
.put(modifyService)
module.exports = Router