/**
 * Centralized Environment Configuration Manager
 * ===============================================
 * Best Practice: Rather than directly accessing `import.meta.env` in arbitrary
 * components, centralize access, provide default fallbacks, validate required keys,
 * and provide helper methods.
 */

// 1. Raw Environment Access
const rawEnv = import.meta.env

// 2. Parsed & Validated Configuration Object
export const envConfig = {
  // App Identity
  appTitle: rawEnv.VITE_APP_TITLE || 'Practical 13: Bundle & Env Manager',
  appVersion: rawEnv.VITE_APP_VERSION || '1.0.0',
  author: rawEnv.VITE_APP_AUTHOR || 'Student / Developer',

  // Current Mode & Environment Name
  // mode is built-in Vite property ('development', 'production', or custom)
  mode: rawEnv.MODE || 'development',
  envName: rawEnv.VITE_APP_ENV || rawEnv.MODE || 'development',

  // API Configuration
  apiBaseUrl: rawEnv.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  timeoutMs: Number(rawEnv.VITE_TIMEOUT_MS) || 5000,

  // Feature Flags
  debugMode: String(rawEnv.VITE_DEBUG_MODE).toLowerCase() === 'true',
  enableMockData: String(rawEnv.VITE_ENABLE_MOCK_DATA).toLowerCase() === 'true',
  enableAnalytics: String(rawEnv.VITE_ENABLE_ANALYTICS).toLowerCase() === 'true',

  // UI Settings
  itemsPerPage: Number(rawEnv.VITE_ITEMS_PER_PAGE) || 10,
  badgeText: rawEnv.VITE_ENVIRONMENT_BADGE || (rawEnv.MODE === 'production' ? 'PRODUCTION' : 'DEVELOPMENT'),
  badgeColor: rawEnv.VITE_BADGE_COLOR || (rawEnv.MODE === 'production' ? 'purple' : 'emerald'),

  // Vite internal flags
  isDevMode: rawEnv.DEV === true,
  isProdMode: rawEnv.PROD === true,
  baseUrl: rawEnv.BASE_URL || '/',
}

// 3. Helper Functions
export const isDevelopment = () => envConfig.mode === 'development'
export const isProduction = () => envConfig.mode === 'production'

/**
 * Resolves a full API URL given a resource path
 * @param {string} path - e.g. '/users' or 'products'
 * @returns {string} - Full API URL
 */
export const getApiEndpoint = (path = '') => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = envConfig.apiBaseUrl.endsWith('/') 
    ? envConfig.apiBaseUrl.slice(0, -1) 
    : envConfig.apiBaseUrl
  return `${cleanBase}/${cleanPath}`
}

/**
 * Formats all environment variables into a list for inspection
 */
export const getInspectedEnvVariables = () => {
  return [
    {
      key: 'MODE',
      value: envConfig.mode,
      source: 'Vite Built-in',
      description: 'The current running mode (controlled by --mode flag or dev/build command)',
      isSecret: false,
    },
    {
      key: 'VITE_APP_ENV',
      value: envConfig.envName,
      source: '.env file',
      description: 'Logical environment name (development, staging, production)',
      isSecret: false,
    },
    {
      key: 'VITE_API_BASE_URL',
      value: envConfig.apiBaseUrl,
      source: '.env file',
      description: 'Base URL for backend API requests in this environment',
      isSecret: false,
    },
    {
      key: 'VITE_DEBUG_MODE',
      value: String(envConfig.debugMode),
      source: '.env file',
      description: 'Enables in-browser diagnostic banners and verbose console logging',
      isSecret: false,
    },
    {
      key: 'VITE_ENABLE_MOCK_DATA',
      value: String(envConfig.enableMockData),
      source: '.env file',
      description: 'When true, frontend uses mock responses instead of real backend',
      isSecret: false,
    },
    {
      key: 'VITE_ENABLE_ANALYTICS',
      value: String(envConfig.enableAnalytics),
      source: '.env file',
      description: 'Toggles client-side telemetry tracking per environment',
      isSecret: false,
    },
    {
      key: 'VITE_ITEMS_PER_PAGE',
      value: String(envConfig.itemsPerPage),
      source: '.env file',
      description: 'Default pagination limit for listings and tables',
      isSecret: false,
    },
    {
      key: 'VITE_TIMEOUT_MS',
      value: `${envConfig.timeoutMs}ms`,
      source: '.env file',
      description: 'Network request timeout threshold before aborting',
      isSecret: false,
    },
  ]
}

export default envConfig
