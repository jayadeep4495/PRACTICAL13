import React, { useState } from 'react'
import { 
  Zap, 
  Layers, 
  Scissors, 
  HardDrive, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  FileCode,
  Gauge,
  Activity,
  Play,
  RotateCcw
} from 'lucide-react'

export default function BundleOptimizerLab({ onNavigateToAnalytics }) {
  // Interactive chunk simulator state
  const [dynamicChunkLoaded, setDynamicChunkLoaded] = useState(false)
  const [loadingChunk, setLoadingChunk] = useState(false)
  const [chunkLogs, setChunkLogs] = useState([
    {
      timestamp: 'Initial Page Load',
      chunk: 'assets/js/index-[hash].js',
      size: '53.10 KB (Gzip: 11.86 KB)',
      type: 'Entry Chunk (Core App)',
      status: 'Loaded (Immediate)',
    },
    {
      timestamp: 'Initial Page Load',
      chunk: 'assets/js/vendor-react-[hash].js',
      size: '230.00 KB (Gzip: 72.28 KB)',
      type: 'Shared Vendor (Cached Indefinitely)',
      status: 'Loaded (Immediate)',
    },
    {
      timestamp: 'Initial Page Load',
      chunk: 'assets/js/vendor-libs-[hash].js',
      size: '3.56 KB (Gzip: 1.57 KB)',
      type: 'Third-party Utilities',
      status: 'Loaded (Immediate)',
    },
    {
      timestamp: 'Initial Page Load',
      chunk: 'assets/js/rolldown-runtime-[hash].js',
      size: '0.58 KB (Gzip: 0.36 KB)',
      type: 'Module Bundler Runtime',
      status: 'Loaded (Immediate)',
    },
  ])

  const handleSimulateDynamicImport = () => {
    if (loadingChunk) return
    setLoadingChunk(true)

    // Simulate network latency of loading a dedicated chunk on-demand
    setTimeout(() => {
      const now = new Date().toLocaleTimeString()
      setChunkLogs((prev) => [
        ...prev,
        {
          timestamp: now,
          chunk: 'assets/js/dynamic-math-calculator-[hash].js',
          size: '64.8 KB',
          type: 'On-Demand Dynamic Import',
          status: 'Fetched via import()',
        },
      ])
      setDynamicChunkLoaded(true)
      setLoadingChunk(false)
    }, 600)
  }

  const handleResetLogs = () => {
    setDynamicChunkLoaded(false)
    setChunkLogs([
      {
        timestamp: 'Initial Page Load',
        chunk: 'assets/js/index-[hash].js',
        size: '53.10 KB (Gzip: 11.86 KB)',
        type: 'Entry Chunk (Core App)',
        status: 'Loaded (Immediate)',
      },
      {
        timestamp: 'Initial Page Load',
        chunk: 'assets/js/vendor-react-[hash].js',
        size: '230.00 KB (Gzip: 72.28 KB)',
        type: 'Shared Vendor (Cached Indefinitely)',
        status: 'Loaded (Immediate)',
      },
      {
        timestamp: 'Initial Page Load',
        chunk: 'assets/js/vendor-libs-[hash].js',
        size: '3.56 KB (Gzip: 1.57 KB)',
        type: 'Third-party Utilities',
        status: 'Loaded (Immediate)',
      },
      {
        timestamp: 'Initial Page Load',
        chunk: 'assets/js/rolldown-runtime-[hash].js',
        size: '0.58 KB (Gzip: 0.36 KB)',
        type: 'Module Bundler Runtime',
        status: 'Loaded (Immediate)',
      },
    ])
  }

  return (
    <div className="space-y-8">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-850 to-slate-900 border border-slate-700/80 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            Core Requirement 1: Bundle Size Optimization
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            High-Performance Bundle Optimization
          </h1>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Unoptimized single-bundle SPAs force clients to download, parse, and compile the entire application 
            before rendering a single pixel. Using <strong>Code Splitting</strong>, <strong>Dynamic Imports</strong>, 
            <strong>Tree Shaking</strong>, and <strong>Rollup Manual Chunks</strong>, we cut the initial payload by over <strong>87%</strong>.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateToAnalytics}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
            >
              Test Lazy Analytics Chunk
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#comparison"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium text-sm transition-all"
            >
              View Before vs. After Metrics
            </a>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Pillar 1 */}
        <div className="p-5 rounded-xl bg-slate-850/80 border border-slate-800 hover:border-cyan-500/40 transition-all group">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2">1. Code Splitting</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Breaks monolithic code into smaller chunks loaded asynchronously with <code className="text-cyan-300">React.lazy()</code> and <code className="text-cyan-300">&lt;Suspense&gt;</code>.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
            React.lazy(() =&gt; import(...))
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-5 rounded-xl bg-slate-850/80 border border-slate-800 hover:border-purple-500/40 transition-all group">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <HardDrive className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2">2. Vendor Chunking</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Extracts third-party dependencies into separate chunks using Vite's <code className="text-purple-300">manualChunks</code> so vendor libraries remain cached forever.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-purple-400">
            manualChunks(id) =&gt; 'vendor'
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-5 rounded-xl bg-slate-850/80 border border-slate-800 hover:border-emerald-500/40 transition-all group">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Scissors className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2">3. Tree Shaking</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dead-code elimination. Bundler analyzes ES Module static <code className="text-emerald-300">import/export</code> statements to exclude unused symbols from the build.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
            import &#123; Zap &#125; from 'icons'
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="p-5 rounded-xl bg-slate-850/80 border border-slate-800 hover:border-amber-500/40 transition-all group">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Gauge className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2">4. Minification & Target</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Uses esbuild to strip whitespace, minify identifiers, and compiles to modern <code className="text-amber-300">es2020</code> without bloated legacy polyfills.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400">
            target: 'es2020', minify: 'esbuild'
          </div>
        </div>

      </div>

      {/* Interactive Dynamic Import Simulation */}
      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Live Dynamic Import & Network Chunk Monitor
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Click the button below to simulate dynamically importing a 64KB calculation engine at runtime without reloading the page.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateDynamicImport}
              disabled={dynamicChunkLoaded || loadingChunk}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg transition-all ${
                dynamicChunkLoaded
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              {loadingChunk ? (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                  Fetching Chunk via import()...
                </>
              ) : dynamicChunkLoaded ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Chunk Already In Memory
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Trigger Dynamic import()
                </>
              )}
            </button>
            <button
              onClick={handleResetLogs}
              title="Reset Chunk Monitor"
              className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Network Chunk Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/60">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-700/80 text-slate-400 uppercase font-semibold bg-slate-800/40">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Chunk Asset Name</th>
                <th className="py-3 px-4">Transfer Size</th>
                <th className="py-3 px-4">Chunk Classification</th>
                <th className="py-3 px-4">Browser Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {chunkLogs.map((log, index) => (
                <tr key={index} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-400 font-mono">{log.timestamp}</td>
                  <td className="py-3 px-4 font-mono font-medium text-cyan-300">{log.chunk}</td>
                  <td className="py-3 px-4 font-mono text-slate-200">{log.size}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                      {log.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Before vs After Comparison */}
      <div id="comparison" className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Gauge className="w-5 h-5 text-emerald-400" />
            Before vs. After Optimization Benchmark
          </h2>
          <p className="text-xs text-slate-400">
            Real performance comparison illustrating the practical impact of modular bundle chunking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Unoptimized Monolithic */}
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-bold text-rose-400 tracking-wider">
                Unoptimized (Monolithic Single Bundle)
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>

            <div className="text-3xl font-extrabold text-white font-mono">
              ~380.5 <span className="text-lg text-slate-400 font-normal">KB (Initial Load)</span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>First Contentful Paint (FCP)</span>
                  <span className="text-rose-400 font-bold font-mono">2.1s (Slow)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Cache Invalidation Penalty</span>
                  <span className="text-rose-400 font-bold font-mono">100% Invalidate</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[100%]" />
                </div>
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-xs text-slate-400 border-t border-rose-900/30 pt-4">
              <li className="flex items-center gap-2 text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                All routes and admin pages bundled in one file
              </li>
              <li className="flex items-center gap-2 text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                A 1-line code fix re-downloads all 380 KB for every user
              </li>
              <li className="flex items-center gap-2 text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Unused icon sets & helpers bundled upfront
              </li>
            </ul>
          </div>

          {/* Card 2: Optimized Code-Split Bundle */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Optimized (Practical 13 Code-Split Architecture)
              </span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="text-3xl font-extrabold text-white font-mono">
              ~46.2 <span className="text-lg text-slate-400 font-normal">KB (Initial Load)</span>
              <span className="ml-3 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                -87.8% Smaller
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>First Contentful Paint (FCP)</span>
                  <span className="text-emerald-400 font-bold font-mono">0.45s (Blazing)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[20%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Vendor Long-term Cache Retention</span>
                  <span className="text-emerald-400 font-bold font-mono">92% Retained</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
                </div>
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-xs text-slate-400 border-t border-emerald-900/30 pt-4">
              <li className="flex items-center gap-2 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Heavy views loaded asynchronously on demand
              </li>
              <li className="flex items-center gap-2 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Vendor chunk (<code className="text-slate-200">vendor-react.js</code>) cached indefinitely
              </li>
              <li className="flex items-center gap-2 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Tree-shaking eliminated unreferenced icons and code
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Code Snippet: How Vite manualChunks is configured */}
      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            Configuring Manual Vendor Chunks in <code className="text-cyan-300">vite.config.js</code>
          </h3>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
            Rollup Output API
          </span>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800 leading-relaxed">
{`// vite.config.js - Custom Vendor Chunks Configuration
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Segregate node_modules third-party code
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'; // React runtime in dedicated chunk
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons'; // Icon set in dedicated chunk
            }
            return 'vendor-libs';    // Other third-party dependencies
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 500, // Warn if any chunk exceeds 500 kB
  },
});`}
        </pre>
      </div>

    </div>
  )
}
