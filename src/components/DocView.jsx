import React, { useState } from 'react'
import { 
  FileText, 
  HelpCircle, 
  BookOpen, 
  CheckCircle, 
  Terminal, 
  Layers, 
  Settings, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react'

export default function DocView() {
  const [openFaq, setOpenFaq] = useState(0)

  const faqs = [
    {
      q: 'What is Bundle Size Optimization and why is it critical?',
      a: 'Bundle Size Optimization is the process of reducing the total bytes of JavaScript and CSS that the browser must download, parse, and execute when a user visits a web application. Large bundles block the main JavaScript thread, degrading Core Web Vitals like First Contentful Paint (FCP) and Interaction to Next Paint (INP). Optimization ensures snappy page loads even on constrained mobile networks.'
    },
    {
      q: 'How does React.lazy and Suspense accomplish Code Splitting?',
      a: '`React.lazy()` allows you to define a component that is loaded dynamically via ES import syntax: `const Analytics = React.lazy(() => import("./Analytics"))`. Vite and Rollup detect dynamic `import()` calls and automatically extract the referenced code into a separate JavaScript chunk. The `<Suspense fallback={<Spinner />}>` component renders a fallback UI while that chunk is being fetched over the network on demand.'
    },
    {
      q: 'What is the role of manualChunks in vite.config.js?',
      a: 'By default, bundlers may combine all third-party dependencies into one large vendor file or leave them scattered. `manualChunks` allows developers to explicitly carve out heavy dependencies (like `react` + `react-dom` or icon sets) into dedicated, long-lived chunks. Because vendor dependencies change infrequently compared to business logic, the browser can cache them for months, achieving a near 100% cache hit ratio across app releases.'
    },
    {
      q: 'Why does Vite require the VITE_ prefix for client environment variables?',
      a: 'Security! Vite prevents accidental leaking of sensitive server-side environment variables (such as database credentials or private API keys) into the public client-side JavaScript bundle. Any environment variable that does not start with `VITE_` is kept hidden from `import.meta.env` in client code.'
    },
    {
      q: 'What is Tree Shaking and how does it reduce bundle weight?',
      a: 'Tree Shaking is dead-code elimination. When using modern ES Modules (`import { Check } from "lucide-react"` instead of `import * as Icons from "lucide-react"`), the bundler constructs an Abstract Syntax Tree (AST) of the dependency graph and safely strips away any exported functions, components, or objects that are not directly referenced anywhere in your code.'
    },
    {
      q: 'What is the difference between .env.development and .env.production?',
      a: '`.env.development` is automatically loaded when running `vite` in dev mode, configuring local mock APIs, high timeouts, and verbose logging. `.env.production` is loaded when running `vite build`, directing requests to live production servers, disabling debug tools, and enforcing strict security parameters.'
    }
  ]

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Title Card */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-850 to-slate-900 border border-slate-700/80 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          Practical Lab Report
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Practical 13: Bundle Optimization & Environment Management
        </h1>
        <p className="mt-3 text-slate-300 text-sm leading-relaxed">
          Course: <strong>Advanced Web Technologies (AWT)</strong> &bull; Framework: <strong>React 19 + Vite 8</strong>
        </p>
      </div>

      {/* Practical Aim */}
      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-cyan-400" />
          Aim & Objectives
        </h2>
        <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
          <li>Implement bundle size optimization using <strong>Code Splitting</strong>, <strong>Dynamic Imports</strong> (<code className="text-cyan-300">React.lazy</code> + <code className="text-cyan-300">&lt;Suspense&gt;</code>), and <strong>Vendor Chunk Splitting</strong> (<code className="text-cyan-300">manualChunks</code> in Rollup).</li>
          <li>Apply <strong>Tree Shaking</strong> principles with modular ES imports to eliminate unused library symbols.</li>
          <li>Implement robust, multi-stage <strong>Environment Management</strong> with <code className="text-emerald-300">.env</code>, <code className="text-emerald-300">.env.development</code>, and <code className="text-emerald-300">.env.production</code>.</li>
          <li>Build a centralized configuration module (<code className="text-emerald-300">src/config/env.js</code>) that validates environment variables, sets fallback defaults, and provides dynamic API URL resolvers.</li>
        </ul>
      </div>

      {/* Architecture Overview */}
      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          Technical Architecture
        </h2>
        
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
{`+---------------------------------------------------------------------------------+
|                                 CLIENT BROWSER                                  |
+---------------------------------------------------------------------------------+
        |                                                 |
  [Initial Request]                               [Tab Change Event]
        |                                                 |
        v                                                 v
+------------------------+                      +------------------------+
|   index-entry.js       |                      | HeavyAnalytics.js      |
|   vendor-react.js      |                      | (Loaded On-Demand via  |
|   vendor-icons.js      |                      |  React.lazy + Suspense)|
|   (~46 KB Initial)     |                      | (~34 KB Chunk)         |
+------------------------+                      +------------------------+
        |                                                 |
        +-----------------------+-------------------------+
                                |
                                v
               +----------------------------------+
               |     src/config/env.js            |
               | (Reads import.meta.env, parses   |
               |  VITE_API_BASE_URL, mode & flags)|
               +----------------------------------+
                                |
             +------------------+------------------+
             |                                     |
    [mode === 'development']             [mode === 'production']
             |                                     |
             v                                     v
   .env.development                       .env.production
   http://localhost:5000                  https://api.cloudservices-production.com`}
        </div>
      </div>

      {/* Step by Step Execution */}
      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          Step-by-Step Practical Demonstration Commands
        </h2>

        <div className="space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80">
            <div className="font-semibold text-slate-200 mb-1">Step 1: Install Dependencies</div>
            <div className="font-mono text-cyan-300 bg-slate-950 p-2 rounded border border-slate-800">
              npm install
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80">
            <div className="font-semibold text-slate-200 mb-1">Step 2: Start Local Development Server (Loads .env.development)</div>
            <div className="font-mono text-emerald-300 bg-slate-950 p-2 rounded border border-slate-800">
              npm run dev
            </div>
            <p className="text-slate-400 mt-1">Runs Vite on <code className="text-slate-300">http://localhost:5173</code> with hot module replacement.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80">
            <div className="font-semibold text-slate-200 mb-1">Step 3: Test Production Build with Bundle Optimization</div>
            <div className="font-mono text-purple-300 bg-slate-950 p-2 rounded border border-slate-800">
              npm run build:prod
            </div>
            <p className="text-slate-400 mt-1">Executes Rollup manualChunks optimization, generates chunked files into <code className="text-slate-300">dist/</code>.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80">
            <div className="font-semibold text-slate-200 mb-1">Step 4: Locally Preview Production Build</div>
            <div className="font-mono text-amber-300 bg-slate-950 p-2 rounded border border-slate-800">
              npm run preview
            </div>
            <p className="text-slate-400 mt-1">Serves the optimized <code className="text-slate-300">dist/</code> bundle to verify production chunk fetching.</p>
          </div>
        </div>
      </div>

      {/* Viva Voce Questions & Answers */}
      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          Viva Voce & Lab Evaluation Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-700/80 bg-slate-900/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                className="w-full p-4 text-left text-sm font-semibold text-slate-200 flex items-center justify-between hover:bg-slate-800/40 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800 bg-slate-950/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
