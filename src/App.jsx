import React, { useState, Suspense } from 'react'
import Navbar from './components/Navbar'
import BundleOptimizerLab from './components/BundleOptimizerLab'
import EnvironmentInspector from './components/EnvironmentInspector'
import DocView from './components/DocView'
import { envConfig } from './config/env'
import { Loader2, Bug, CheckCircle } from 'lucide-react'

// LAZY LOADING DEMONSTRATION:
// Heavy modules are NOT imported in the main bundle.
// They are loaded on-demand only when rendered inside Suspense!
const HeavyAnalyticsDashboard = React.lazy(() => import('./components/lazy/HeavyAnalyticsDashboard'))
const HeavyReportsView = React.lazy(() => import('./components/lazy/HeavyReportsView'))

// Loading Fallback spinner rendered during chunk fetch
function ChunkLoadingFallback({ moduleName }) {
  return (
    <div className="min-h-[350px] flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-850/60 border border-slate-800 text-center animate-pulse">
      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
      <h3 className="text-sm font-semibold text-white">
        Downloading {moduleName} JavaScript Chunk...
      </h3>
      <p className="text-xs text-slate-400 mt-1 max-w-sm">
        Dynamic <code className="text-cyan-300">import()</code> promise active &bull; Network code-splitting in progress
      </p>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('bundle')

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      
      {/* Optional Debug Mode Banner (controlled by VITE_DEBUG_MODE in .env) */}
      {envConfig.debugMode && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 text-center text-xs text-amber-300 flex items-center justify-center gap-2">
          <Bug className="w-3.5 h-3.5" />
          <span>
            <strong>Debug Mode Active</strong> (VITE_DEBUG_MODE=true &bull; Target API: {envConfig.apiBaseUrl})
          </span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tab 1: Bundle Optimizer Lab (Loaded immediately) */}
        {activeTab === 'bundle' && (
          <BundleOptimizerLab onNavigateToAnalytics={() => setActiveTab('analytics')} />
        )}

        {/* Tab 2: Lazy Analytics (Loaded on-demand via React.lazy) */}
        {activeTab === 'analytics' && (
          <Suspense fallback={<ChunkLoadingFallback moduleName="HeavyAnalyticsDashboard" />}>
            <HeavyAnalyticsDashboard />
          </Suspense>
        )}

        {/* Tab 3: Lazy Reports (Loaded on-demand via React.lazy) */}
        {activeTab === 'reports' && (
          <Suspense fallback={<ChunkLoadingFallback moduleName="HeavyReportsView" />}>
            <HeavyReportsView />
          </Suspense>
        )}

        {/* Tab 4: Environment Inspector (Loaded immediately) */}
        {activeTab === 'env' && (
          <EnvironmentInspector />
        )}

        {/* Tab 5: Practical Documentation (Loaded immediately) */}
        {activeTab === 'doc' && (
          <DocView />
        )}

      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/60 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Practical 13: Bundle Optimization & Environment Management</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Mode: <strong className="text-slate-200">{envConfig.mode}</strong></span>
            <span>&bull;</span>
            <span>API: <strong className="text-slate-200">{envConfig.envName}</strong></span>
            <span>&bull;</span>
            <span>Vite 8 + React 19</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
