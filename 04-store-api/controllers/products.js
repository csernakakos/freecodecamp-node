const Product = require("../models/product");


const GET_AllProductsStatic = async (req, res) => {

    /*
    In the "name" field, instead of looking for an exact match such as "facebook", let's look for a string that contains an "f":
    const search = "f";
    */

    const search = "f";
    const products = await Product.find({ 
        name: {$regex: search, $options: "i"}
    });

    /*
    Mongoose: sort alphabetically, A-Z:
        const products = await Product.find({}).sort("name")

    Mongoose: sort alphabetically, Z-A:
        const products = await Product.find({}).sort("-name")

    Mongoose: sort alphabetically, Z-A, and then by price, from smaller to larger value:
        const products = await Product.find({}).sort("-name price")
    */
    
    res.status(200).json({
        status: "success",
        count: products.length,
        products,
    });
}

const GET_AllProducts = async (req, res) => {
    const { featured, company, name, sort } = req.query;

    /*
    Create our own query object. To this object, only the query parameters we specify will be added. For example, "featured=..." will be added. "akos=..." will not be added.
    */
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    let result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("createdAt");
    }

    const products = await result;

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