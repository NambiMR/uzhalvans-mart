import SiteSettings from '../models/SiteSettings.js';

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
    try {
        let settings = await SiteSettings.findOne();
        if (!settings) {
            // Create default settings if none exist
            settings = await SiteSettings.create({});
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res) => {
    try {
        let settings = await SiteSettings.findOne();
        
        if (settings) {
            settings.hero = req.body.hero || settings.hero;
            settings.seasonalPicks = req.body.seasonalPicks || settings.seasonalPicks;
            settings.activePromotions = req.body.activePromotions || settings.activePromotions;
            settings.termsContent = req.body.termsContent || settings.termsContent;
            settings.aboutContent = req.body.aboutContent || settings.aboutContent;

            const updatedSettings = await settings.save();
            res.json(updatedSettings);
        } else {
            const newSettings = await SiteSettings.create(req.body);
            res.status(201).json(newSettings);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
