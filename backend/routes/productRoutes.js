import express from 'express';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

const router = express.Router();

// ---------------------------------------------------------
// MOCK AUTH MIDDLEWARE (For Development Only)
// ---------------------------------------------------------
// In a real app, this would verify a JWT and set req.user
const protectFarmer = (req, res, next) => {
    // Injecting a fake farmer user for Vertical Slice 2 testing
    req.user = {
        _id: new mongoose.Types.ObjectId("60d5ecb8b392d700153ee61a"), // Dummy ID
        role: 'farmer'
    };
    next();
};

// ---------------------------------------------------------
// FARMER DASHBOARD ROUTES (Protected)
// ---------------------------------------------------------

// @route   GET /api/products/my-products
// @desc    Get all products for the logged in farmer
// @access  Private (Farmer only)
router.get('/my-products', protectFarmer, async (req, res) => {
    try {
        const products = await Product.find({ farmerId: req.user._id }).sort('-createdAt');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching products', error: error.message });
    }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Farmer only)
router.post('/', protectFarmer, async (req, res) => {
    try {
        const productData = { 
            ...req.body, 
            farmerId: req.user._id 
        };
        
        const newProduct = new Product(productData);
        await newProduct.save();
        
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create product', error: error.message });
    }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private (Farmer only)
router.put('/:id', protectFarmer, async (req, res) => {
    try {
        // Find product and ensure it belongs to this farmer
        let product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        if (product.farmerId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to edit this product' });
        }

        product = await Product.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.json(product);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update product', error: error.message });
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Farmer only)
router.delete('/:id', protectFarmer, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        if (product.farmerId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this product' });
        }

        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting product', error: error.message });
    }
});

// ---------------------------------------------------------
// PUBLIC ROUTES
// ---------------------------------------------------------

// @route   GET /api/products
// @desc    Get all active products for the public shop
// @access  Public
router.get('/', async (req, res) => {
    try {
        // For public shop, we only want active inventory
        let query = { status: 'active' };
        
        // Optional: Filter by category if provided in query string
        if (req.query.category) {
            query.category = req.query.category;
        }

        const products = await Product.find(query).sort('-createdAt');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching public products', error: error.message });
    }
});

export default router;
