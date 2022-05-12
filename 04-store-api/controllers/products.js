const GET_AllProductsStatic = async (req, res) => {
    res.send("GET_ALLProductsStatic");
}

const GET_AllProducts = async (req, res) => {
    res.send("GET_AllProducts");
}

module.exports = {
    GET_AllProductsStatic,
    GET_AllProducts
}