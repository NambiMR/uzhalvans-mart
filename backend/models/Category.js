import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide category name'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Please provide category description']
    },
    image: {
        type: String,
        required: [true, 'Please provide category image URL']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Pre-save hook to generate slug if not provided or if name changed
categorySchema.pre('validate', function(next) {
    if (this.name && !this.slug) {
        this.slug = this.name.toLowerCase().split(' ').join('-');
    }
    next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
