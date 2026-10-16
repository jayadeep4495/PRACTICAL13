import React, { useState } from 'react'
import { 
  FileSpreadsheet, 
  Download, 
  Filter, 
  CheckSquare, 
  FileCheck,
  Search,
  Sparkles
} from 'lucide-react'
import { envConfig } from '../../config/env'

export default function HeavyReportsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [exportedStatus, setExportedStatus] = useState(false)

  const reportRecords = [
    { id: 'REC-001', module: 'Auth Service', chunkGroup: 'vendor-react', status: 'Passed', coverage: '94%', sizeKb: 142.5 },
    { id: 'REC-002', module: 'Icons Bundle', chunkGroup: 'vendor-icons', status: 'Passed', coverage: '99%', sizeKb: 18.2 },
    { id: 'REC-003', module: 'Analytics Module', chunkGroup: 'lazy-analytics', status: 'Passed', coverage: '88%', sizeKb: 34.8 },
    { id: 'REC-004', module: 'Reports Module', chunkGroup: 'lazy-reports', status: 'Passed', coverage: '91%', sizeKb: 29.4 },
    { id: 'REC-005', module: 'Core Main App', chunkGroup: 'index-entry', status: 'Passed', coverage: '96%', sizeKb: 46.1 },
  ]

  const filtered = reportRecords.filter(r => 
    r.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.chunkGroup.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSimulateExport = () => {
    setExportedStatus(true)
    setTimeout(() => setExportedStatus(false), 3000)
  }

  return (
    <div className="space-y-6">
      
      {/* Code Splitting Banner */}
      <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-900/60 text-amber-300">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-amber-200">
              ⚡ Independent Route/Chunk: Heavy Reports Module
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-800 text-amber-100">
              assets/js/HeavyReportsView-[hash].js
            </span>
          </div>
          <p className="text-xs text-amber-300/80 mt-1">
            This module represents another segregated bundle chunk. Vite automatically isolated this code into its own file
            because it is loaded via dynamic <code>import()</code> with <code>React.lazy</code>.
          </p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search report by module or chunk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleSimulateExport}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors shadow-lg shadow-cyan-600/20"
          >
            {exportedStatus ? (
              <>
                <FileCheck className="w-4 h-4 text-emerald-300" />
                <span>Exported (Simulated CSV)!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export Audit CSV</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-400" />
            Bundle & Module Verification Matrix
          </h3>
          <span className="text-xs text-slate-400">
            Page limit: {envConfig.itemsPerPage} (from env)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-xs uppercase text-slate-400">
                <th className="pb-3 font-semibold">Record ID</th>
                <th className="pb-3 font-semibold">Module</th>
                <th className="pb-3 font-semibold">Vite Chunk Partition</th>
                <th className="pb-3 font-semibold">Verification</th>
                <th className="pb-3 font-semibold">Coverage</th>
                <th className="pb-3 font-semibold">Chunk Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 font-mono text-xs text-slate-300">{item.id}</td>
                  <td className="py-3 font-medium text-slate-200">{item.module}</td>
                  <td className="py-3 font-mono text-xs text-amber-300">{item.chunkGroup}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-slate-300">{item.coverage}</td>
                  <td className="py-3 text-xs font-mono text-cyan-400">{item.sizeKb} KB</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
