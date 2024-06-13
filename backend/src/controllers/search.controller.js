const searchService = require('../services/search.service');


  exports.getDiscountedProducts = async (req, res) => {
        try {
            const userId = req.query.query;
            const products = await searchService.getDiscountedProducts(userId);
            res.status(200).json(products);
        } catch (err){
            res.status(500).json({ message: err.message });
        }
  };


  exports.getDiscountedProducts_search = async (req, res) => {
    try {
        const userId = req.query.query;
        const searchWord = req.query.search;
        const products = await searchService.getDiscountedProducts_search(userId, searchWord);
        res.status(200).json(products);
    } catch (err){
        res.status(500).json({ message: err.message });
    }
};


  exports.getClosestProducts = async (req, res) => {
    try {
        const userId = req.query.query;
        const products = await searchService.getClosestProducts(userId);
        res.status(200).json(products);
    } catch (err){
        res.status(500).json({ message: err.message });
    }
};


exports.getClosestProducts_search = async (req, res) => {
    try {
        const userId = req.query.query;
        const searchWord = req.query.query;
        const products = await searchService.getClosestProducts_search(userId, searchWord);
        res.status(200).json(products);
    } catch (err){
        res.status(500).json({ message: err.message });
    }
};


exports.getDiscountedClosestProducts = async (req, res) => {
    try {
        const userId = req.query.query;
        const products = await searchService.getDiscountedClosestProducts(userId);
        res.status(200).json(products);
    } catch (err){
        res.status(500).json({ message: err.message });
    }
};


exports.getDiscountedClosestProducts_search = async (req, res) => {
    try {
        const userId = req.query.query;
        const searchWord = req.query.query;
        const products = await searchService.getDiscountedClosestProducts_search(userId, searchWord);
        res.status(200).json(products);
    } catch (err){
        res.status(500).json({ message: err.message });
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

