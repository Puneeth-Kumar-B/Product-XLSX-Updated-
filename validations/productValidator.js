const Joi = require('joi')


// PRODUCT VALIDATION

const productValidations = Joi.object({
    productName: Joi.string().required().min(3),

    productCode: Joi.string().required(),

    dosageForm: Joi.string().required().min(3),

    packingForm: Joi.string().required(),

    packingDisplay: Joi.string().required(),

    packingSize: Joi.number().required(),

    weight: Joi.string().required(),

    care: Joi.boolean().required(),

    salt: Joi.string().required(),

    saltGroup: Joi.string().required(),

    speciality: Joi.array().items(Joi.string()).required(),

    manufacturer: Joi.string().required(),

    mrp: Joi.number().required(),

    priceToCustomer: Joi.number().required(),

    discount_from_MRP: Joi.number().required(),

    taxPercentage: Joi.number().required(),

    condition: Joi.array().items(Joi.string()).required(),

    homepageCategory: Joi.string().required(),

    hsn: Joi.number().required(),

    countryOfOrigin: Joi.string().required(),

    strength: Joi.string().required(),

    stock: Joi.boolean().required(),

    prescriptionRequired: Joi.boolean().required(),

    visibility: Joi.boolean().required(),

    pap: Joi.boolean().required(),

    papOffer: Joi.string(),

    abcd: Joi.string().required().valid('a', 'A', 'b', 'B', 'c', 'C', 'd', 'D')
})


const Validations = async(req, res, next) => {
    const Product = {
        productName: req.body.productName,
        productCode: req.body.productCode,
        dosageForm: req.body.dosageForm,
        packingForm: req.body.packingForm,
        packingDisplay: req.body.packingDisplay,
        packingSize: req.body.packingSize,
        weight: req.body.weight,
        care: req.body.care,
        salt: req.body.salt,
        saltGroup: req.body.saltGroup,
        speciality: req.body.speciality,
        manufacturer: req.body.manufacturer,
        mrp: req.body.mrp,
        priceToCustomer: req.body.priceToCustomer,
        discount_from_MRP: req.body.discount_from_MRP,
        taxPercentage: req.body.taxPercentage,
        condition: req.body.condition,
        homepageCategory: req.body.homepageCategory,
        hsn: req.body.hsn,
        countryOfOrigin: req.body.countryOfOrigin,
        strength: req.body.strength,
        stock: req.body.stock,
        prescriptionRequired: req.body.prescriptionRequired,
        visibility: req.body.visibility,
        pap: req.body.pap,
        papOffer: req.body.papOffer,
        abcd: req.body.abcd
    }

    let { error } = await productValidations.validate(Product, { abortEarly: false });
    if (error) {
        return res.status(422).json({ statusCode: 422, error: error.message });
    }
    next()
}

module.exports = { Validations }