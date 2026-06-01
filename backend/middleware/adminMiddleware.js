/**
 * Middleware to verify if the user is an admin
 * Use this AFTER the 'protect' middleware
 */
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ 
            message: 'Access Denied: Super Admin privileges required.' 
        });
    }
};
