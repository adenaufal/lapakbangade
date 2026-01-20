/**
 * Google OAuth configuration module
 * Handles Passport.js setup for Google authentication
 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// User store (in production, this would be a database call to lapakbangade-bot API)
const users = new Map();

/**
 * Configure Passport with Google OAuth strategy
 */
function configurePassport() {
    // Serialize user to session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user from session
    passport.deserializeUser((id, done) => {
        const user = users.get(id);
        done(null, user || null);
    });

    // Google OAuth Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Create or get user
            const user = {
                id: profile.id,
                email: profile.emails?.[0]?.value,
                name: profile.displayName,
                picture: profile.photos?.[0]?.value,
                provider: 'google',
                createdAt: new Date(),
            };

            // Store in memory (later: sync to lapakbangade-bot API)
            users.set(user.id, user);

            // TODO: Sync with lapakbangade-bot backend API
            // await syncUserToBackend(user);

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }));
}

/**
 * Sync user to lapakbangade-bot backend
 * This links the Google account to the unified identity system
 */
async function syncUserToBackend(user) {
    const backendUrl = process.env.BACKEND_API_URL || 'https://admin.lapakbangade.com';

    try {
        const response = await fetch(`${backendUrl}/api/auth/sync-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.BACKEND_API_KEY,
            },
            body: JSON.stringify({
                provider: 'google',
                providerId: user.id,
                email: user.email,
                name: user.name,
                picture: user.picture,
            }),
        });

        if (!response.ok) {
            console.error('Failed to sync user to backend:', response.status);
        }

        return await response.json();
    } catch (error) {
        console.error('Backend sync error:', error);
        return null;
    }
}

/**
 * Get user by ID from store
 */
function getUserById(id) {
    return users.get(id);
}

module.exports = {
    configurePassport,
    syncUserToBackend,
    getUserById,
    passport,
};
