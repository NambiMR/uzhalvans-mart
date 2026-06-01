import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Category from './models/Category.js';
import SiteSettings from './models/SiteSettings.js';
import dns from 'dns';

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const categories = [
    {
        name: 'Organic Grains',
        description: 'Freshly harvested traditional grains like Ponni Rice, Millets, and more.',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80'
    },
    {
        name: 'Fresh Vegetables',
        description: 'Naturally grown vegetables from the fertile lands of Tamil Nadu.',
        image: 'https://images.unsplash.com/photo-1540333671314-da36fd499175?auto=format&fit=crop&q=80'
    },
    {
        name: 'Natural Spices',
        description: 'Authentic spices including Turmeric, Cardamom, and Pepper.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80'
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB for seeding');

        // 1. Create Super Admin if not exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            await User.create({
                name: 'Super Admin',
                email: 'admin@uzhalvans.com',
                password: 'adminpassword123',
                role: 'admin',
                phone: '9876543210'
            });
            console.log('👤 Created Super Admin user (admin@uzhalvans.com / adminpassword123)');
        } else {
            console.log('✨ Admin user already exists');
        }

        // 2. Create Default Categories if empty
        const categoryCount = await Category.countDocuments();
        if (categoryCount === 0) {
            await Category.insertMany(categories);
            console.log(`📦 Seeded ${categories.length} categories`);
        } else {
            console.log('✨ Categories already exist');
        }

        // 3. Initialize Site Settings if empty
        const settingsCount = await SiteSettings.countDocuments();
        if (settingsCount === 0) {
            await SiteSettings.create({});
            console.log('⚙️ Initialized Site Settings');
        }

        console.log('🚀 Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
