const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    nombrePresupuesto: {type: String, required: true},
    saldoTotal: {type: Number},
    saldoRestante: {type: Number},
    valorParcial: {type: Number},
    gastoValor: [{gasto: String, valor: Number}],
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('Salario', UserSchema);