const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    "שם קבלן": String,
    "מס' טלפון": String,
    "איזור גאוגרפי": String,
    "פלסטיק": String,
    "קרטון":String,
    "מתכת":String,
    "כתום מוסדי":String
})


const Materials = mongoose.model('Materials', materialSchema);

module.exports = Materials;