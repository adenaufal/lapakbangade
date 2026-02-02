const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { configurePassport, passport } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

const FALLBACK_BASE_RATE = 16500;
const BOT_BACKEND_URL = process.env.BOT_BACKEND_URL || 'http://localhost:5000';
const crypto = require('crypto');

// Middleware
app.use(cookieParser());
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'lapakbangade-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
}));

// Initialize Passport
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// Set Cache-Control headers for API
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.set('Cache-Control', 'public, max-age=300');
  }
  next();
});

// ==================== AUTH ROUTES ====================

// Start Google OAuth
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account',
}));

// Google OAuth callback
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login?error=auth_failed',
  }),
  (req, res) => {
    // Successful authentication
    console.log('User logged in:', req.user?.email);
    res.redirect('/dashboard');
  }
);

// Logout
app.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

// Get current user (API)
app.get('/api/auth/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
      },
    });
  } else {
    res.json({ authenticated: false, user: null });
  }
});

// Check auth status
app.get('/api/auth/status', (req, res) => {
  res.json({ authenticated: req.isAuthenticated() });
});

// ==================== EXISTING API ROUTES ====================

// API endpoint untuk rate
app.get('/api/rate', async (req, res) => {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;

  if (!apiKey) {
    return res.json({ baseRate: FALLBACK_BASE_RATE, source: 'fallback_no_key' });
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
    if (!response.ok) {
      throw new Error(`ExchangeRate API error ${response.status}`);
    }
    const data = await response.json();
    const idrRate = data?.conversion_rates?.IDR;

    if (typeof idrRate === 'number' && idrRate > 0) {
      return res.json({ baseRate: idrRate, source: 'api' });
    }
    throw new Error('IDR rate missing');
  } catch (error) {
    console.error('Rate function error, using fallback:', error);
    return res.json({ baseRate: FALLBACK_BASE_RATE, source: 'fallback_error' });
  }
});

// ==================== TRANSACTION API PROXY ====================

// Helper to sign request
const signPayload = (payload, secret) => {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const body = JSON.stringify(payload);
  const message = `${timestamp}.${body}`;
  const signature = crypto.createHmac('sha256', secret).update(message).digest('hex');
  return { signature, timestamp, body };
};

// Proxy create transaction
app.post('/api/transaction/create', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const secret = process.env.SESSION_SECRET || 'lapakbangade-secret-change-in-production';

  try {
    const payload = {
      ...req.body,
      user_id: req.user.id // Enforce user ID from session
    };

    const { signature, timestamp, body } = signPayload(payload, secret);

    const backendRes = await fetch(`${BOT_BACKEND_URL}/api/v1/transaction/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Signature': signature,
        'X-Timestamp': timestamp
      },
      body: body
    });

    const data = await backendRes.json();
    res.status(backendRes.status).json(data);

  } catch (error) {
    console.error('Transaction create error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Proxy get rate
app.post('/api/transaction/rate', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const secret = process.env.SESSION_SECRET || 'lapakbangade-secret-change-in-production';

  try {
    const payload = {
      ...req.body,
      user_id: req.user.id
    };

    const { signature, timestamp, body } = signPayload(payload, secret);

    const backendRes = await fetch(`${BOT_BACKEND_URL}/api/v1/transaction/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Signature': signature,
        'X-Timestamp': timestamp
      },
      body: body
    });

    const data = await backendRes.json();
    res.status(backendRes.status).json(data);

  } catch (error) {
    console.error('Rate fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==================== STATIC FILES ====================

// Serve static files dari build/dist dengan proper caching
const distPath = path.join(__dirname, 'build', 'dist');
app.use(express.static(distPath, {
  maxAge: '1d',
  etag: true
}));

// Handle client-side routing - semua route redirect ke index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`OAuth configured: ${process.env.GOOGLE_CLIENT_ID ? 'Yes' : 'No (missing GOOGLE_CLIENT_ID)'}`);
});
