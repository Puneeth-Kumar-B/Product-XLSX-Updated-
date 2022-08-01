const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: { type: String, unique: true },

    productCode: { type: String, unique: true },

    dosageForm: { type: String },

    packingForm: { type: String },

    packingDisplay: { type: String },

    packingSize: { type: Number },

    weight: { type: String },

    care: { type: Boolean },

    salt: { type: String },

    saltGroup: { type: String },

    speciality: [String],

    manufacturer: { type: String },

    mrp: { type: Number },

    priceToCustomer: { type: Number },

    discount_from_MRP: { type: Number },

    taxPercentage: { type: Number },

    condition: [String],

    homepageCategory: { type: String },

    hsn: { type: Number },

    countryOfOrigin: { type: String },

    strength: { type: String },

    stock: { type: Boolean },

    prescriptionRequired: { type: Boolean },

    visibility: { type: Boolean },

    pap: { type: Boolean },

    papOffer: { type: String },

    abcd: { type: String },

    uploads: { type: String }
}, { timestamps: true })

productSchema.plugin(softDeletePlugin);
const product = mongoose.model('product', productSchema)
module.exports = product