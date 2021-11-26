const presupuestoCtrl = {};

const Salario = require('../models/salario')

presupuestoCtrl.getDataFull = async (req, res) => {
    const presupuesto = await Salario.find()
    res.json(presupuesto)
};

presupuestoCtrl.insertData = async (req, res) => {
    const newPresupuesto = new Salario(req.body)
    console.log(newPresupuesto);
    await newPresupuesto.save()
    res.send({message: 'Presupuesto guardado'});
}  

presupuestoCtrl.getData = async (req, res) => {
    const salario = await Salario.findById(req.params.id)
    res.send(salario);
}  

presupuestoCtrl.updateData = async (req, res) => {
    await Salario.findByIdAndUpdate(req.params.id, req.body)
    res.send({message: 'Presupuesto actualizado'});
}   

presupuestoCtrl.deleteData = async (req, res) => {
    await Salario.findByIdAndDelete(req.params.id)
    res.send({status: 'Salario eliminado'});
}   

module.exports = presupuestoCtrl;