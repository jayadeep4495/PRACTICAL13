import React, { useState } from 'react'
import { 
  Settings, 
  Terminal, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  Copy, 
  Check, 
  Info,
  Sliders,
  Layers
} from 'lucide-react'
import { envConfig, getApiEndpoint, getInspectedEnvVariables } from '../config/env'

export default function EnvironmentInspector() {
  const [testEndpoint, setTestEndpoint] = useState('/users/current')
  const [copiedKey, setCopiedKey] = useState(null)

  const envVariables = getInspectedEnvVariables()

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const isDev = envConfig.mode === 'development'

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-850 to-slate-900 border border-slate-700/80 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Settings className="w-3.5 h-3.5" />
          Core Requirement 2: Environment Management
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Multi-Stage Environment Management
        </h1>
        <p className="mt-3 text-slate-300 text-sm leading-relaxed max-w-3xl">
          Applications must switch seamlessly between <strong>Development</strong> (localhost, verbose debugging, mock data)
          and <strong>Production</strong> (cloud API, disabled debuggers, minified payloads). 
          Vite uses multi-file <code className="text-emerald-300">.env</code> loading with the mandatory <code className="text-emerald-300">VITE_</code> prefix for client-side visibility.
        </p>

        {/* Quick summary badges */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-2">
            <span className="text-slate-400 font-sans">Active Mode:</span>
            <span className="text-cyan-400 font-bold">{envConfig.mode}</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-2">
            <span className="text-slate-400 font-sans">App Env:</span>
            <span className="text-emerald-400 font-bold">{envConfig.envName}</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-2">
            <span className="text-slate-400 font-sans">Debug Mode:</span>
            <span className={envConfig.debugMode ? 'text-amber-400 font-bold' : 'text-slate-400 font-bold'}>
              {String(envConfig.debugMode)}
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-2">
            <span className="text-slate-400 font-sans">Mock Data:</span>
            <span className={envConfig.enableMockData ? 'text-cyan-400 font-bold' : 'text-slate-400 font-bold'}>
              {String(envConfig.enableMockData)}
            </span>
          </div>
        </div>
      </div>

      {/* Active Variables Table */}
      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              Runtime Environment Variables Inspector
            </h2>
            <p className="text-xs text-slate-400">
              Resolved in <code className="text-emerald-300">src/config/env.js</code> from <code className="text-slate-300">import.meta.env</code>
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
            {envVariables.length} active parameters
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/60">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-700/80 text-slate-400 uppercase font-semibold bg-slate-800/40">
                <th className="py-3 px-4">Variable Key</th>
                <th className="py-3 px-4">Current Value</th>
                <th className="py-3 px-4">Source Layer</th>
                <th className="py-3 px-4">Purpose / Role</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {envVariables.map((item) => (
                <tr key={item.key} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-cyan-300">{item.key}</td>
                  <td className="py-3 px-4 font-mono text-emerald-300 bg-emerald-950/20 max-w-xs truncate">
                    {item.value}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{item.source}</td>
                  <td className="py-3 px-4 text-slate-300 max-w-sm">{item.description}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleCopy(item.value, item.key)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Copy value"
                    >
                      {copiedKey === item.key ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive API Endpoint Simulator */}
      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-cyan-400" />
          Interactive API Endpoint Resolver
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Type an API path to test how <code className="text-cyan-300">getApiEndpoint(path)</code> dynamically generates full URLs based on the active environment's <code className="text-cyan-300">VITE_API_BASE_URL</code>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase">
              Input Relative Resource Path:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={testEndpoint}
                onChange={(e) => setTestEndpoint(e.target.value)}
                placeholder="/users/profile or /orders"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => setTestEndpoint('/auth/session')}
                className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-medium text-slate-200"
              >
                Sample 1
              </button>
              <button
                onClick={() => setTestEndpoint('/analytics/metrics')}
                className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-medium text-slate-200"
              >
                Sample 2
              </button>
            </div>
            <div className="text-xs text-slate-400">
              Active Base URL: <code className="text-cyan-300">{envConfig.apiBaseUrl}</code>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                Generated Full URL:
              </span>
              <div className="mt-2 text-sm font-mono text-emerald-400 break-all select-all">
                {getApiEndpoint(testEndpoint)}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Environment: <strong className="text-slate-200">{envConfig.envName}</strong></span>
              <span>Method: <strong className="text-slate-200">getApiEndpoint()</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Environment Scripts & Execution Commands */}
      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
          <Terminal className="w-5 h-5 text-purple-400" />
          Environment Commands & Scripts Guide
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          How to run and build for each target environment using the configured <code className="text-slate-300">package.json</code> scripts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Local Development
            </span>
            <div className="mt-2 font-mono text-xs text-white bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              npm run dev
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Loads <code className="text-slate-300">.env.development</code>. Enables hot reload, local mock API, and debug flags.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Dev in Prod Mode
            </span>
            <div className="mt-2 font-mono text-xs text-white bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              npm run dev:prod
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Runs Vite dev server using <code className="text-slate-300">.env.production</code> variables for staging simulation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Production Build
            </span>
            <div className="mt-2 font-mono text-xs text-white bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              npm run build:prod
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Bundles with <code className="text-slate-300">.env.production</code>, minification, tree-shaking, and manual chunks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Preview Build
            </span>
            <div className="mt-2 font-mono text-xs text-white bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              npm run preview
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Locally serves the generated <code className="text-slate-300">dist/</code> bundle to verify production behavior.
            </p>
          </div>

        </div>
      </div>

      {/* Security Principles Checklist */}
      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          Environment Security: Client vs. Server Rules
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase mb-2">
              <ShieldCheck className="w-4 h-4" />
              Safe for Client (.env with VITE_)
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>Public API base endpoints (<code className="text-emerald-300">VITE_API_BASE_URL</code>)</li>
              <li>Public application version and branding (<code className="text-emerald-300">VITE_APP_TITLE</code>)</li>
              <li>Public analytics tracking IDs (e.g., Google Analytics Measurement ID)</li>
              <li>Feature flags and pagination thresholds</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/30">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase mb-2">
              <ShieldAlert className="w-4 h-4" />
              NEVER In Client (Backend Only)
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>Database credentials, MongoDB URIs, SQL passwords</li>
              <li>Payment secret keys (e.g., Stripe secret key, PayPal secret)</li>
              <li>JWT secret signing keys or private OAuth client secrets</li>
              <li>Cloud service master keys (AWS secret access keys)</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}
