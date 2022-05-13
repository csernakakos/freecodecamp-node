const Product = require("../models/product");


const GET_AllProductsStatic = async (req, res) => {
    const products = await Product.find({ name: "vase table"});
    
    res.status(200).json({
        status: "success",
        count: products.length,
        products,
    });
}

const GET_AllProducts = async (req, res) => {
    const { featured } = req.query;

    /*
    Create our own query object. To this object, only the query parameters we specify will be added. For example, "featured=..." will be added. "akos=..." will not be added.
    */
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;

    }

    console.log("QUERYOBJECT: ", queryObject)
    const products = await Product.find(queryObject);

    res.status(200).json({
        status: "success",
        count: products.length,
        products,
    })
}

module.exports = {
    GET_AllProductsStatic,
    GET_AllProducts
}