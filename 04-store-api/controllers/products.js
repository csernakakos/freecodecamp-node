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

    /*
    Mongoose: select only certain fields:
    const products = await Product.find({}).select("name price")
    */

    /*
    Mongoose: limit number of results to 4. Also, skip the first 4 results:
    const products = await Product.find({}).select("name price").limit(4).skip(2)
    */

    /*
    Mongoose: find items where price > 30
    const products = await Product.find({price: {$gt: 30}});
    */
    
    res.status(200).json({
        status: "success",
        count: products.length,
        products,
    });
}

const GET_AllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;

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

    if (numericFilters) {
        // console.log(numericFilters, "<<<");
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g;

        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

        const options = ["price", "rating"];
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");

            if (options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)};
            }
        });
    }

    let result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("createdAt");
    }

    if (fields) {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }

    // Page to load. Defaults to 1.
    // Limit results. Defaults to 1.
    // Skip a number of results.
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

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