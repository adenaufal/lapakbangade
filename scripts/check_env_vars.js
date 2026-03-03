#!/usr/bin/env node
// @ts-check

const fs = require('node:fs');
const path = require('node:path');

/**
 * @typedef {{ description: string, vars: Record<string, string> }} EnvGroup
 * @typedef {{ CRITICAL: EnvGroup, HIGHLY_RECOMMENDED: EnvGroup, OPTIONAL: EnvGroup }} EnvConfig
 * @typedef {{ strict: boolean, envFile: string }} CliOptions
 */

/** @type {EnvConfig} */
const ENV_CONFIG = {
  CRITICAL: {
    description: '[CRITICAL] Required for auth, backend access, and request signing',
    vars: {
      SESSION_SECRET: 'Session signing key for Express + Cloudflare sessions',
      GOOGLE_CLIENT_ID: 'Google OAuth client ID',
      GOOGLE_CLIENT_SECRET: 'Google OAuth client secret',
      GOOGLE_CALLBACK_URL: 'Google OAuth callback URL',
      BACKEND_API_URL: 'Backend admin API base URL',
      BACKEND_API_KEY: 'Shared API key used for backend sync calls',
      API_URL: 'Cloudflare Functions backend API base URL',
    },
  },
  HIGHLY_RECOMMENDED: {
    description: '[HIGHLY RECOMMENDED] Strong production defaults',
    vars: {
      NODE_ENV: 'Runtime mode (production/development)',
      PORT: 'Express server port',
      BOT_BACKEND_URL: 'Express proxy backend URL',
      EXCHANGE_RATE_API_KEY: 'ExchangeRate API key for live USD->IDR rate',
      RATE_LIMIT_PER_MINUTE: 'Max /api/rate requests per client per minute',
      RATE_LIMIT_WINDOW_SECONDS: 'Sliding-window duration in seconds',
      ALLOWED_ORIGINS: 'Comma-separated CORS allowlist',
      LOG_LEVEL: 'Application logging level',
    },
  },
  OPTIONAL: {
    description: '[OPTIONAL] Additional integrations and local flags',
    vars: {
      GEMINI_API_KEY: 'Gemini API key for optional tooling',
      FALLBACK_BASE_RATE: 'Manual fallback USD->IDR base rate',
      ENABLE_DEBUG_ROUTES: 'Enable debug endpoints in non-production',
      COOKIE_SECURE: 'Force secure cookies',
    },
  },
};

/**
 * @param {string[]} argv
 * @returns {CliOptions}
 */
function parseArgs(argv) {
  const options = {
    strict: false,
    envFile: '.env',
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--strict') {
      options.strict = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }

    if (arg.startsWith('--env-file=')) {
      options.envFile = arg.slice('--env-file='.length).trim();
      continue;
    }

    if (arg === '--env-file') {
      const nextArg = argv[index + 1];
      if (!nextArg) {
        throw new Error('--env-file requires a path value');
      }
      options.envFile = nextArg.trim();
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function printHelp() {
  console.log('Usage: node scripts/check_env_vars.js [--strict] [--env-file .env]');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/check_env_vars.js');
  console.log('  node scripts/check_env_vars.js --strict');
  console.log('  node scripts/check_env_vars.js --env-file .env.production');
}

/**
 * Lightweight .env parser (no dependency on dotenv package).
 * @param {string} envPath
 * @returns {Record<string, string>}
 */
function parseDotEnv(envPath) {
  if (!fs.existsSync(envPath)) {
    return {};
  }

  const fileContents = fs.readFileSync(envPath, 'utf8');
  /** @type {Record<string, string>} */
  const parsed = {};

  for (const rawLine of fileContents.split(/\r?\n/u)) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    const cleaned = line.startsWith('export ') ? line.slice('export '.length) : line;
    const separatorIndex = cleaned.indexOf('=');

    if (separatorIndex <= 0) {
      continue;
    }

    const key = cleaned.slice(0, separatorIndex).trim();
    let value = cleaned.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    parsed[key] = value;
  }

  return parsed;
}

/**
 * @param {string | undefined} value
 * @returns {boolean}
 */
function isMissingValue(value) {
  if (typeof value !== 'string') {
    return true;
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return true;
  }

  const placeholderPatterns = [
    'replace_with',
    'your_',
    'example',
    'changeme',
    'set_me',
    'todo',
  ];

  return placeholderPatterns.some((pattern) => normalized.includes(pattern));
}

/**
 * @param {Record<string, string>} envValues
 */
function checkEnv(envValues) {
  /** @type {Record<keyof EnvConfig, string[]>} */
  const setVars = {
    CRITICAL: [],
    HIGHLY_RECOMMENDED: [],
    OPTIONAL: [],
  };

  /** @type {Record<keyof EnvConfig, string[]>} */
  const missingVars = {
    CRITICAL: [],
    HIGHLY_RECOMMENDED: [],
    OPTIONAL: [],
  };

  /** @type {(keyof EnvConfig)[]} */
  const categories = ['CRITICAL', 'HIGHLY_RECOMMENDED', 'OPTIONAL'];
  for (const category of categories) {
    const vars = ENV_CONFIG[category].vars;
    for (const variableName of Object.keys(vars)) {
      const value = envValues[variableName];
      if (isMissingValue(value)) {
        missingVars[category].push(variableName);
      } else {
        setVars[category].push(variableName);
      }
    }
  }

  return { setVars, missingVars };
}

/**
 * @param {Record<keyof EnvConfig, string[]>} setVars
 * @param {Record<keyof EnvConfig, string[]>} missingVars
 * @param {string} envPath
 */
function printReport(setVars, missingVars, envPath) {
  const resolvedPath = path.resolve(envPath);
  const envFileExists = fs.existsSync(resolvedPath);

  console.log('='.repeat(80));
  console.log('ENVIRONMENT VARIABLE CHECK - LAPAKBANGADE LANDING PAGE');
  console.log('='.repeat(80));
  console.log(`Source file: ${resolvedPath} (${envFileExists ? 'found' : 'not found'})`);
  console.log('System env values override .env file values when both are present.');
  console.log('');

  let totalSet = 0;
  let totalMissing = 0;

  /** @type {(keyof EnvConfig)[]} */
  const categories = ['CRITICAL', 'HIGHLY_RECOMMENDED', 'OPTIONAL'];
  for (const category of categories) {
    const config = ENV_CONFIG[category];
    const setInCategory = setVars[category];
    const missingInCategory = missingVars[category];

    totalSet += setInCategory.length;
    totalMissing += missingInCategory.length;

    console.log(config.description);
    console.log('-'.repeat(80));

    if (setInCategory.length > 0) {
      console.log(`SET (${setInCategory.length}):`);
      for (const variableName of setInCategory) {
        console.log(`  - ${variableName}`);
      }
    }

    if (missingInCategory.length > 0) {
      console.log(`MISSING (${missingInCategory.length}):`);
      for (const variableName of missingInCategory) {
        const description = config.vars[variableName];
        console.log(`  - ${variableName.padEnd(28)} # ${description}`);
      }
    }

    if (setInCategory.length === 0 && missingInCategory.length === 0) {
      console.log('No variables configured for this category.');
    }

    console.log('');
  }

  const total = totalSet + totalMissing;
  const coverage = total > 0 ? ((totalSet / total) * 100).toFixed(1) : '100.0';

  console.log('SUMMARY');
  console.log('-'.repeat(80));
  console.log(`SET:     ${totalSet}`);
  console.log(`MISSING: ${totalMissing}`);
  console.log(`TOTAL:   ${total}`);
  console.log(`COVERAGE: ${coverage}%`);
  console.log('='.repeat(80));
}

function main() {
  /** @type {CliOptions} */
  let options;

  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(String(error));
    printHelp();
    process.exit(2);
    return;
  }

  const envFromFile = parseDotEnv(path.resolve(options.envFile));
  const mergedEnv = { ...envFromFile, ...process.env };
  const { setVars, missingVars } = checkEnv(mergedEnv);

  printReport(setVars, missingVars, options.envFile);

  if (options.strict && missingVars.CRITICAL.length > 0) {
    console.error('');
    console.error('Strict check failed: missing one or more [CRITICAL] variables.');
    process.exit(1);
    return;
  }

  process.exit(0);
}

main();
