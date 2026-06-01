import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: 'Fresh From the Farm to Your Home' },
        subtitle: { type: String, default: 'Directly from Tamil Nadu\'s Farmers to You' },
        backgroundImage: { type: String, default: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80' },
        ctaText: { type: String, default: 'Shop Fresh Now' }
    },
    seasonalPicks: [{
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        month: { type: String }, // e.g. "June"
        description: { type: String }
    }],
    activePromotions: [{
        title: { type: String },
        code: { type: String },
        discount: { type: String },
        bannerColor: { type: String, default: '#2E7D32' },
        isActive: { type: Boolean, default: true }
    }],
    termsContent: { 
        type: String, 
        default: '1. Acceptance of Terms\nBy using Uzhavan Mart, you agree to these terms.\n\n2. Farmer Policies\nFarmers must ensure product quality and organic certification where applicable.\n\n3. Buyer Policies\nBuyers should inspect products upon delivery.\n\n4. Payments\nAll transactions are secure and direct.' 
    },
    aboutContent: {
        title: { type: String, default: 'Our Roots' },
        subtitle: { type: String, default: 'Revolutionizing the Indian agricultural market by connecting farmers directly with your kitchen.' },
        storyTitle: { type: String, default: 'Giving the "Uzhavan" back his power and dignity.' },
        storyText: { type: String, default: 'In 2023, we saw a gap. While consumers paid premium prices for "farm-fresh" food, the actual farmers (Uzhavas) were struggling to survive under the weight of middlemen.' },
        stats: [{
            label: { type: String },
            value: { type: String }
        }]
    }
}, {
    timestamps: true
});

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;
