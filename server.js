const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const FALLBACK_BASE_RATE = 16500;

// Set Cache-Control headers
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.set('Cache-Control', 'public, max-age=300');
  }
  next();
});

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
});
