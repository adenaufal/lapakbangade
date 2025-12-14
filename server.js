const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const FALLBACK_BASE_RATE = 16500;

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

// Serve static files dari build/dist
app.use(express.static(path.join(__dirname, 'build', 'dist')));

// Handle client-side routing - semua route redirect ke index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
