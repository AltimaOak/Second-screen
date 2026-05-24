"use client";

import React from "react";
import Link from "next/link";
import { Flame, Bot, Sparkles, Trophy, Tv, BarChart2, TrendingUp, HelpCircle, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      title: "Tactical Insight Agent",
      description: "Live strategic tips: bowling matchup alerts, pitch deviations, and tactical field placement tweaks in real time.",
      icon: Bot,
      color: "border-cyan-500/30 text-cyan-400 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]",
      badge: "Coach Mode"
    },
    {
      title: "Win Probability Engine",
      description: "Watch live win margins and momentum index respond dynamically to every single boundary, dot ball, or wicket.",
      icon: TrendingUp,
      color: "border-amber-500/30 text-amber-400 bg-amber-950/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]",
      badge: "Statistical AI"
    },
    {
      title: "Meme & Social Agent",
      description: "Generates humorous crowd commentary, live fan memes, and trending cricket banter reactions as the game unfolds.",
      icon: Sparkles,
      color: "border-pink-500/30 text-pink-400 bg-pink-950/20 shadow-[0_0_15px_rgba(244,63,94,0.05)]",
      badge: "Fan Banter"
    },
    {
      title: "Fantasy Pro Assistant",
      description: "Real-time points updates, differential captaincy advice, and risk scatter analysis for ultimate fantasy league domination.",
      icon: Trophy,
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]",
      badge: "Expert Value"
    }
  ];

  return (
    <div className="relative flex flex-col flex-1 items-center justify-center overflow-hidden min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      {/* Decorative Grid Mesh */}
      <div className="mesh-grid"></div>

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto flex flex-col items-center mt-8">
        {/* App Logo */}
        <div className="mb-6 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <img
            src="/logo.png"
            alt="SecondScreen AI Emblem"
            className="relative h-28 w-28 rounded-2xl object-cover border border-white/10 shadow-2xl transition-all duration-300 transform group-hover:scale-[1.04]"
          />
        </div>

        {/* Glow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/20 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan-400">
            Next-Gen Cricket Intelligence
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mb-6">
          The Ultimate Live IPL <br />
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            Second-Screen Experience
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-medium">
          Transform passive match-watching into an interactive, multi-agent tactical arena. Experience real-time scoreboard metrics, dynamic live win graphs, witty fan Q&A chat, and AI-generated memes.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-20 w-full max-w-md">
          <Link
            href="/dashboard"
            className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-base font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 transform hover:scale-[1.02]"
          >
            Enter Live Arena
            <ArrowRight className="h-4 w-4 text-slate-950 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link
            href="/chat"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-base font-extrabold hover:text-white transition-all duration-300"
          >
            <Bot className="h-4.5 w-4.5" />
            Talk to AI Companion
          </Link>
        </div>
      </div>

      {/* Feature Showcase Grid */}
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Meet Your AI Multi-Agent Coaching Staff
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Five specialized AI agents ingest live commentary and match statistics concurrently, generating direct strategic value for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`relative flex flex-col justify-between p-6 rounded-2xl glass-panel border transition-all duration-300 hover:scale-[1.03] group ${feat.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 group-hover:border-cyan-500/20 transition-all duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Mock Stadium Card */}
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6">
        <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800/80 shadow-[0_0_30px_rgba(6,182,212,0.05)] overflow-hidden flex flex-col lg:flex-row items-center gap-8">
          {/* Neon background blobs */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl -z-10"></div>
          
          <div className="flex-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 inline-block">
              Highly Simulated Demo Environment
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Ready for the Hackathon Stage
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              We built an interactive <strong>Match Control Center</strong> inside the dashboard. Judges can immediately pause, speed up, or manually trigger wickets and sixes to watch win probabilities recalculate and agents react in real-time. No flaky external APIs or delays.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                ⚡ React State Stream
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                📊 Dual-Area Win Chart
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                🛡️ Gemini API Smart Fallback
              </span>
            </div>
          </div>
          
          <div className="w-full lg:w-96 rounded-2xl bg-slate-950 p-6 border border-slate-800 shadow-2xl relative">
            {/* Live Scorecard Preview */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <span className="text-xs text-red-500 font-extrabold tracking-widest uppercase flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
                MI vs CSK
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                IPL Final (Simulated)
              </span>
            </div>
            
            <div className="space-y-4 mb-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Mumbai Indians (Chasing)</span>
                <span className="text-2xl font-black text-white">152/4 <span className="text-xs text-slate-400 font-normal">in 17.2 overs</span></span>
              </div>
              <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block">Required Rate</span>
                  <span className="text-cyan-400 font-extrabold">13.88 rpo</span>
                </div>
                <div className="h-6 w-px bg-slate-800"></div>
                <div>
                  <span className="text-slate-400 block">Win Probability</span>
                  <span className="text-emerald-400 font-extrabold">42% (Chasing)</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300"
            >
              <Tv className="h-4 w-4" />
              Launch Live Scoreboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
