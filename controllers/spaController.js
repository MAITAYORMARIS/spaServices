const Services = require('../model/spaModel')

const ServicesControllers = {
    getAllServices: async (req, res) => {
        let services
        let error = null

        try {
            services = await Services.find()
        }
        catch (err) { error = err }
        
        res.json({
            response: error ? 'ERROR' : { services },
            success: error ? false : true,
            error: error
        })
    },
    getOneService: async (req, res) => {
        const id = req.params.id
        let service
        let error = null

        try {
            service = await Services.find({ _id: id })
        }
        catch (err) { error = err }
        console.log(service)
        res.json({
            response: error ? 'ERROR' : service,
            success: error ? false : true,
            error: error
        })
    },
    modifyService: async (req, res) => {

        const id = req.params.id
        const dataService = req.body.data

        let service
        let error = null
        try {
            service = await Services.findOneAndUpdate({ _id: id }, dataService, { new: true })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : service,
            success: error ? false : true,
            error: error
        })
    },


    addService: async (req, res) => {

        const { precio, nombre, info, duracion, image, alt, servicios, descripcion, condiciones } = req.body.data

        let service
        let error = null

        try {
            let serviceExist = await Services.find({ nombre: { $regex: nombre, $options: "i" } })
            if (serviceExist.length == 0) {
                service = await new Services({
                    precio: precio,
                    nombre: nombre,
                    info: info,
                    duracion: duracion,
                    image: image,
                    alt: alt,
                    servicios: servicios,
                    descripcion: descripcion,
                    condiciones: condiciones
                }).save()
            } else {
                error = "Este servicio ya existe en BD con el id:" + serviceExist[0]._id + "ingreso por ADD ONE SERVICE"
            }

        } catch (err) { error = err }
        res.json({
            response: error ? "ERROR" : service,
            success: error ? false : true,
            error: error
        })
    },
    addMultiplesServices: async (req, res) => {
        const services = []
        let error = []

        for (let service of req.body.data) {
            try {
                let serviceExist = await Services.find({ nombre: { $regex: service.nombre, $options: "i" } })
                if (serviceExist.length == 0) {

                    let dataService = {
                        precio: service.precio,
                        nombre: service.nombre,
                        info: service.info,
                        duracion: service.duracion,
                        image: service.image,
                        alt: service.alt,
                        servicios: service.servicios,
                        descripcion: service.descripcion,
                        condiciones: service.condiciones
                    }

                    await new Services({
                        ...dataService
                    }).save()
                    services.push(dataService)

                } else {
                    error.push({
                        nombre: service.nombre,
                        result: "El servicio" + "ya existe en BD con el id" + serviceExist[0]._id
                    })
                }
            }
            catch (err) { error.push(err) }
        }
        res.json({
            response: error.length > 0 && services.length === 0 ? "ERROR" : services,
            success: error.length > 0 ? (services.length > 0 ? "warning" : false) : true,
            error: error
        })},
        deleteService: async (req, res) => {
            const id = req.params.id
            let service
            let error = null
    
            try {
                service = await Services.findOneAndDelete({ _id: id })
            } catch (err) { error = err }
    
            res.json({
                response: error ? "Error" : service? service : "No se encontro el ID a eliminar",
                success: error ? false : service ? true : false,
                error: error
            })
        },
        deleteManyServices: async (req, res) => {
            const id = req.body.id
            serviceDelete = []
            let error = []
    
            for (let id of data) {
                try {
                    let service
                    service = await Services.findOneAndDelete({ _id: id })
                    if (service) {
                        servicesDelete.push(service)
                    } else {
                        error.push({
                            id: id,
                            error: "no se encontro el ID del servicio a eliminar"
                        })
                    }
                } catch (err) { error.push(err) }
            }
    
    
            res.json({
                response: error.length > 0 && servicesDelete.length === 0 ? "ERROR" : servicesDelete,
                success: error.length > 0 ? (servicesDelete.length > 0 ? "warning" : false) : true,
                error: error
            })
        }
}
module.exports = ServicesControllers;

