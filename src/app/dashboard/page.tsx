"use client";

import React from "react";
import Scorecard from "@/components/dashboard/Scorecard";
import MatchControls from "@/components/dashboard/MatchControls";
import WinProbability from "@/components/dashboard/WinProbability";
import PressureMeter from "@/components/dashboard/PressureMeter";
import AgentFeed from "@/components/dashboard/AgentFeed";
import MatchTimeline from "@/components/dashboard/MatchTimeline";
import MatchCenter from "@/components/dashboard/MatchCenter";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen px-4 pt-8 pb-24 md:pb-8 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Mesh Grid Background */}
      <div className="mesh-grid"></div>

      {/* Page Title & Badging */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Live Match Arena
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            AI-powered second-screen analytics. Play, pause, or inject events to control the simulation.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.1)]">
            Active Simulator Session
          </span>
        </div>
      </div>

      {/* TATA IPL Match Center Scheduler Hub */}
      <MatchCenter />

      {/* Grid Layer 1: Scorecard & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Scorecard />
        </div>
        <div className="lg:col-span-1">
          <MatchControls />
        </div>
      </div>

      {/* Grid Layer 2: Win Probability & Pressure Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WinProbability />
        </div>
        <div className="lg:col-span-1">
          <PressureMeter />
        </div>
      </div>

      {/* Grid Layer 3: Dual Scrolling Panels (AI Feed & Timeline) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AgentFeed />
        <MatchTimeline />
      </div>
    </div>
  );
}
