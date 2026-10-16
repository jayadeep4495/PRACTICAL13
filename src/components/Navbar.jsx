import React from 'react'
import { 
  Cpu, 
  Layers, 
  Settings2, 
  BarChart3, 
  FileText, 
  ShieldCheck, 
  Boxes 
} from 'lucide-react'
import { envConfig } from '../config/env'

export default function Navbar({ activeTab, setActiveTab }) {
  const isDev = envConfig.mode === 'development'

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Practical Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-tight">
                  PRACTICAL 13
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                  v{envConfig.appVersion}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Bundle Size Optimization & Environment Management
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('bundle')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'bundle'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Bundle Optimizer
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'analytics'
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Lazy Analytics
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-800 font-mono">
                Chunk
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'reports'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              Lazy Reports
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-800 font-mono">
                Chunk
              </span>
            </button>

            <button
              onClick={() => setActiveTab('env')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'env'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Settings2 className="w-4 h-4" />
              Environment
            </button>

            <button
              onClick={() => setActiveTab('doc')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'doc'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Lab Report
            </button>
          </nav>

          {/* Active Environment Badge */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                isDev
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isDev ? 'bg-emerald-400 animate-pulse' : 'bg-purple-400'
                }`}
              />
              <span className="uppercase tracking-wider">
                {envConfig.badgeText}
              </span>
            </div>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('bundle')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'bundle' ? 'bg-cyan-500 text-white' : 'text-slate-400'
            }`}
          >
            Bundle Optimizer
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'analytics' ? 'bg-purple-500 text-white' : 'text-slate-400'
            }`}
          >
            Lazy Analytics
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'reports' ? 'bg-amber-500 text-white' : 'text-slate-400'
            }`}
          >
            Lazy Reports
          </button>
          <button
            onClick={() => setActiveTab('env')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'env' ? 'bg-emerald-500 text-white' : 'text-slate-400'
            }`}
          >
            Environment
          </button>
          <button
            onClick={() => setActiveTab('doc')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'doc' ? 'bg-blue-500 text-white' : 'text-slate-400'
            }`}
          >
            Lab Report
          </button>
        </div>
      </div>
    </header>
  )
}
