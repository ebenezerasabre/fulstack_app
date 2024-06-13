const searchModel = require('../models/search.model');

exports.getDiscountedProducts = async (user_id) => {
    try {
        return await searchModel.getDiscountedProducts(user_id);
    } catch (err){
        throw new Error(err);
    }
};

exports.getDiscountedProducts_search = async (user_id, search) => {
    try {
        return await searchModel.getDiscountedProducts_search(user_id, search);
    } catch (err){
        throw new Error(err);
    }
};

exports.getClosestProducts = async (user_id) => {
    try {
        return await searchModel.getClosestProducts(user_id);
    } catch (err){
        throw new Error(err);
    }
};

exports.getClosestProducts_search = async (user_id, search) => {
    try {
        return await searchModel.getClosestProducts_search(user_id, search);
    } catch (err){
        throw new Error(err);
    }
};

exports.getDiscountedClosestProducts = async (user_id) => {
    try {
        return await searchModel.getDiscountedClosestProducts(user_id);
    } catch (err){
        throw new Error(err);
    }
};

exports.getDiscountedClosestProducts_search = async (user_id, search) => {
    try {
        return await searchModel.getDiscountedClosestProducts_search(user_id, search);
    } catch (err){
        throw new Error(err);
    }
};



/*
   getDiscountedProducts,
    getDiscountedProducts_search,
    getClosestProducts,
    getClosestProducts_search,
    getDiscountedClosestProducts,
    getDiscountedClosestProducts_search

*/







