import React, { useState } from 'react'
import { 
  BarChart, 
  TrendingUp, 
  Activity, 
  DownloadCloud, 
  Database, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react'
import { envConfig, getApiEndpoint } from '../../config/env'

export default function HeavyAnalyticsDashboard() {
  const [metricFilter, setMetricFilter] = useState('all')

  // Sample data simulating a complex statistical workload
  const performanceLogs = [
    { id: 'TX-101', endpoint: getApiEndpoint('/analytics/query'), latency: '42ms', status: 200, payloadSize: '18.4 KB' },
    { id: 'TX-102', endpoint: getApiEndpoint('/users/telemetry'), latency: '89ms', status: 200, payloadSize: '4.2 KB' },
    { id: 'TX-103', endpoint: getApiEndpoint('/reports/aggregate'), latency: '145ms', status: 200, payloadSize: '124.6 KB' },
    { id: 'TX-104', endpoint: getApiEndpoint('/metrics/realtime'), latency: '28ms', status: 200, payloadSize: '2.1 KB' },
    { id: 'TX-105', endpoint: getApiEndpoint('/system/health'), latency: '19ms', status: 200, payloadSize: '1.2 KB' },
  ]

  const chartBars = [
    { label: '00:00', height: 40, requests: 120 },
    { label: '04:00', height: 25, requests: 75 },
    { label: '08:00', height: 75, requests: 280 },
    { label: '12:00', height: 95, requests: 430 },
    { label: '16:00', height: 85, requests: 390 },
    { label: '20:00', height: 60, requests: 210 },
  ]

  return (
    <div className="space-y-6">
      
      {/* Code Splitting Education Banner */}
      <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg flex items-start gap-3">
        <div className="p-2 rounded-lg bg-purple-900/60 text-purple-300">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-purple-200">
              ⚡ Code-Splitting in Action (React.lazy + Suspense)
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-800 text-purple-100">
              assets/js/HeavyAnalyticsDashboard-[hash].js
            </span>
          </div>
          <p className="text-xs text-purple-300/80 mt-1">
            Notice that this analytics component and its rich UI were <strong>NOT</strong> loaded in the initial entry bundle!
            The browser downloaded this JavaScript chunk on-demand only when you clicked the <em>"Lazy Analytics"</em> tab.
            This drastically minimizes the initial bundle payload and accelerates First Contentful Paint (FCP).
          </p>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-medium">Throughput</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">1,505 req/s</div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.4% vs last hour</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-medium">Avg Latency</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">38.2 ms</div>
          <div className="text-xs text-slate-400 mt-1">
            p99: 94ms | p95: 52ms
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-medium">Mock Data Status</span>
            <Database className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {envConfig.enableMockData ? 'Mock Mode' : 'Live Mode'}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Configured via <code className="text-cyan-300">VITE_ENABLE_MOCK_DATA</code>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-medium">Active API Host</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm font-semibold text-white truncate" title={envConfig.apiBaseUrl}>
            {envConfig.apiBaseUrl}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Environment: <span className="text-emerald-400 font-semibold">{envConfig.envName}</span>
          </div>
        </div>

      </div>

      {/* Visual Chart Simulation */}
      <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <BarChart className="w-5 h-5 text-cyan-400" />
              Simulated Real-time Traffic Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              Interactive SVG chart embedded directly inside this lazy-loaded module
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMetricFilter('all')}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                metricFilter === 'all'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              All Requests
            </button>
            <button
              onClick={() => setMetricFilter('fast')}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                metricFilter === 'fast'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              &lt;50ms
            </button>
          </div>
        </div>

        {/* CSS/SVG Bar Chart */}
        <div className="h-48 flex items-end justify-between gap-4 pt-6 px-4 border-b border-slate-700">
          {chartBars.map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[11px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                {bar.requests} req
              </span>
              <div
                style={{ height: `${bar.height}%` }}
                className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-cyan-600 to-blue-400 group-hover:from-cyan-400 group-hover:to-blue-300 transition-all shadow-md shadow-cyan-500/10"
              />
              <span className="text-[11px] text-slate-400">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Telemetry Table */}
      <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60">
        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-purple-400" />
          Environment API Telemetry Stream
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-xs uppercase text-slate-400">
                <th className="pb-3 font-semibold">Transaction ID</th>
                <th className="pb-3 font-semibold">Endpoint (Calculated via Env)</th>
                <th className="pb-3 font-semibold">Latency</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Payload Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {performanceLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 font-mono text-xs text-slate-300">{log.id}</td>
                  <td className="py-3 font-mono text-xs text-cyan-300">{log.endpoint}</td>
                  <td className="py-3 text-xs text-slate-300">{log.latency}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {log.status} OK
                    </span>
                  </td>
                  <td className="py-3 text-xs text-slate-400">{log.payloadSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
