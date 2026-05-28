import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  category: {
    type: String,
    required: true,
    enum: ['vegetables', 'fruits', 'dairy', 'grains', 'spices', 'herbs', 'pulses', 'flowers', 'seeds', 'organic']
  },
  price: {
    type: Number,
    required: [true, 'Current price is required']
  },
  oldPrice: {
    type: Number,
    default: null
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'bunch', 'litre', 'piece', 'box', 'gram', 'packet']
  },
  stock: {
    type: Number,
    required: [true, 'Stock count is required'],
    min: 0,
    default: 0
  },
  images: {
    type: [String],
    default: []
  },
  harvestDate: {
    type: Date,
    required: [true, 'Harvest date is required to ensure freshness transparency']
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'draft', 'out_of_stock'],
    default: 'active'
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

const Product = mongoose.model('Product', productSchema);

export default Product;
