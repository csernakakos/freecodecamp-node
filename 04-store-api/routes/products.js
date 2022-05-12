const express = require("express");
const router = express.Router();
const {GET_AllProductsStatic, GET_AllProducts} = require ("../controllers/products");

router
    .route("/")
    .get(GET_AllProducts)
    
router
    .route("/static")
    .get(GET_AllProductsStatic)


module.exports = router;