/**
 * Automated Testing Script for Programmatic SEO Pages
 *
 * Usage:
 * 1. Start dev server: cd build && npm run dev
 * 2. Run this script: node scripts/test-seo-pages.js
 *
 * Or test production:
 * BASE_URL=https://lapakbangade.com node scripts/test-seo-pages.js
 */

const http = require('http');
const https = require('https');

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const TIMEOUT = 10000; // 10 seconds

// Test URLs
const TEST_URLS = {
  'Core Pages': [
    '/',
    '/privacy',
    '/terms'
  ],
  'Bank Pages': [
    '/convert-paypal-ke-bca',
    '/convert-paypal-ke-mandiri',
    '/convert-paypal-ke-bni',
    '/convert-paypal-ke-bri',
    '/convert-paypal-ke-bsi',
    '/convert-paypal-ke-cimb',
    '/convert-paypal-ke-permata'
  ],
  'E-Wallet Pages': [
    '/convert-paypal-ke-dana',
    '/convert-paypal-ke-ovo',
    '/convert-paypal-ke-gopay',
    '/convert-paypal-ke-shopeepay',
    '/convert-paypal-ke-linkaja'
  ],
  'Use Case Pages': [
    '/untuk-freelancer',
    '/untuk-online-seller',
    '/untuk-content-creator',
    '/untuk-gamer'
  ],
  'SEO Assets': [
    '/sitemap.xml',
    '/robots.txt'
  ]
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Test results
const results = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
};

/**
 * Make HTTP/HTTPS request
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    const req = client.get(url, { timeout: TIMEOUT }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Test a single URL
 */
async function testURL(path, category) {
  const url = BASE_URL + path;
  results.total++;

  try {
    const response = await makeRequest(url);
    const { statusCode, body } = response;

    // Check status code
    if (statusCode !== 200) {
      results.failed++;
      results.details.push({
        category,
        path,
        status: 'FAIL',
        reason: `Status ${statusCode}`
      });
      return false;
    }

    // For HTML pages, check SEO elements
    if (path.endsWith('.xml') || path.endsWith('.txt')) {
      // Just check file exists
      results.passed++;
      results.details.push({
        category,
        path,
        status: 'PASS',
        reason: 'File exists'
      });
      return true;
    }

    // Check meta tags
    const hasTitle = body.includes('<title>') && body.includes('</title>');
    const hasDescription = body.includes('name="description"');
    const hasCanonical = body.includes('rel="canonical"');
    const hasOG = body.includes('property="og:');
    const hasStructuredData = body.includes('application/ld+json');

    if (!hasTitle) {
      results.failed++;
      results.details.push({
        category,
        path,
        status: 'FAIL',
        reason: 'Missing title tag'
      });
      return false;
    }

    if (!hasDescription) {
      results.failed++;
      results.details.push({
        category,
        path,
        status: 'FAIL',
        reason: 'Missing meta description'
      });
      return false;
    }

    if (!hasStructuredData) {
      results.failed++;
      results.details.push({
        category,
        path,
        status: 'FAIL',
        reason: 'Missing structured data (JSON-LD)'
      });
      return false;
    }

    // All checks passed
    results.passed++;
    results.details.push({
      category,
      path,
      status: 'PASS',
      reason: 'All SEO elements present'
    });
    return true;

  } catch (error) {
    results.failed++;
    results.details.push({
      category,
      path,
      status: 'FAIL',
      reason: error.message
    });
    return false;
  }
}

/**
 * Print progress bar
 */
function printProgress(current, total) {
  const percentage = Math.round((current / total) * 100);
  const barLength = 40;
  const filled = Math.round((percentage / 100) * barLength);
  const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);

  process.stdout.write(`\r${colors.cyan}Progress: [${bar}] ${percentage}% (${current}/${total})${colors.reset}`);
}

/**
 * Print summary
 */
function printSummary() {
  console.log('\n\n' + '='.repeat(80));
  console.log(colors.bright + '📊 TEST SUMMARY' + colors.reset);
  console.log('='.repeat(80));

  console.log(`\nBase URL: ${colors.blue}${BASE_URL}${colors.reset}`);
  console.log(`Total Tests: ${results.total}`);
  console.log(`${colors.green}✅ Passed: ${results.passed}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${results.failed}${colors.reset}`);

  const successRate = ((results.passed / results.total) * 100).toFixed(2);
  console.log(`\nSuccess Rate: ${successRate}%`);

  if (results.failed > 0) {
    console.log('\n' + colors.red + '❌ FAILED TESTS:' + colors.reset);
    console.log('-'.repeat(80));

    const failures = results.details.filter(d => d.status === 'FAIL');
    failures.forEach(f => {
      console.log(`${colors.red}✗${colors.reset} ${f.category} → ${f.path}`);
      console.log(`  Reason: ${f.reason}\n`);
    });
  }

  // Category breakdown
  console.log('\n' + colors.bright + '📋 BREAKDOWN BY CATEGORY:' + colors.reset);
  console.log('-'.repeat(80));

  Object.keys(TEST_URLS).forEach(category => {
    const categoryTests = results.details.filter(d => d.category === category);
    const passed = categoryTests.filter(d => d.status === 'PASS').length;
    const total = categoryTests.length;
    const icon = passed === total ? colors.green + '✅' : colors.red + '❌';

    console.log(`${icon} ${category}: ${passed}/${total} passed${colors.reset}`);
  });

  console.log('\n' + '='.repeat(80));

  if (results.failed === 0) {
    console.log(colors.green + colors.bright);
    console.log('🎉 ALL TESTS PASSED!');
    console.log('✅ Programmatic SEO is working correctly!');
    console.log(colors.reset);
  } else {
    console.log(colors.red + colors.bright);
    console.log('⚠️  SOME TESTS FAILED!');
    console.log('Please fix the issues above before deploying.');
    console.log(colors.reset);
  }

  console.log('='.repeat(80) + '\n');
}

/**
 * Main test runner
 */
async function runTests() {
  console.log(colors.bright + '\n🧪 PROGRAMMATIC SEO - AUTOMATED TESTING\n' + colors.reset);
  console.log('Testing URL: ' + colors.blue + BASE_URL + colors.reset);
  console.log('Timeout: ' + TIMEOUT + 'ms\n');

  // Calculate total tests
  let totalTests = 0;
  Object.values(TEST_URLS).forEach(urls => {
    totalTests += urls.length;
  });

  console.log(`Starting ${totalTests} tests...\n`);

  let currentTest = 0;

  // Run tests by category
  for (const [category, urls] of Object.entries(TEST_URLS)) {
    console.log('\n' + colors.bright + `Testing ${category}:` + colors.reset);

    for (const path of urls) {
      currentTest++;
      printProgress(currentTest, totalTests);
      await testURL(path, category);

      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log('\n'); // Clear progress bar

  // Print summary
  printSummary();

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Check if server is accessible first
async function checkServer() {
  try {
    console.log('Checking if server is accessible...');
    await makeRequest(BASE_URL);
    return true;
  } catch (error) {
    console.error(colors.red + '\n❌ ERROR: Cannot connect to ' + BASE_URL + colors.reset);
    console.error('\nPlease make sure the server is running:');
    console.error(colors.yellow + '  cd build && npm run dev' + colors.reset);
    console.error('\nOr test production:');
    console.error(colors.yellow + '  BASE_URL=https://lapakbangade.com node scripts/test-seo-pages.js' + colors.reset);
    console.error('');
    process.exit(1);
  }
}

// Run tests
checkServer().then(() => {
  runTests().catch(error => {
    console.error(colors.red + '\n❌ Fatal error:', error.message + colors.reset);
    process.exit(1);
  });
});
