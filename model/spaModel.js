const mongoose =  require ('mongoose')

const servicesSchema=new mongoose.Schema({
precio:{type:Number, required:true},
nombre:{type:String, required:true},
info:{type:String, required:true},
duracion:{type:String, required:true},
image:{type:String, required:true},
alt:{type:String, required:true},
servicios:{type:Array, required:true},
descripcion:{type:String, required:true},
condiciones:{type:String, required:true},
})
const Services=mongoose.model('services',servicesSchema)
module.exports=Services;