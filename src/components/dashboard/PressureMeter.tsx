"use client";

import React from "react";
import { useMatch } from "@/context/MatchContext";
import { Gauge, Activity, Flame } from "lucide-react";

export default function PressureMeter() {
  const { matchState } = useMatch();
  const { pressure, momentum, crowdSentiment } = matchState;

  // SVG Circular Gauge Calculations
  const radius = 35;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pressure / 100) * circumference;

  // Color selection based on pressure levels
  let pressureColor = "stroke-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]";
  let pressureText = "text-emerald-400";
  let pressureLabel = "Stable";

  if (pressure > 70) {
    pressureColor = "stroke-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]";
    pressureText = "text-rose-400 font-extrabold";
    pressureLabel = "CRITICAL";
  } else if (pressure > 40) {
    pressureColor = "stroke-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]";
    pressureText = "text-amber-400";
    pressureLabel = "Tense";
  }

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)] grid grid-cols-2 gap-4 h-[190px]">
      {/* Col 1: Radial Pressure Meter */}
      <div className="flex flex-col items-center justify-center border-r border-slate-800/40 pr-2">
        <div className="flex items-center gap-1.5 mb-2">
          <Gauge className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            Pressure
          </span>
        </div>
        
        <div className="relative flex items-center justify-center h-20 w-20">
          <svg className="absolute transform -rotate-90 w-full h-full">
            {/* Background track circle */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              className="stroke-slate-800"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Active pressure circle */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              className={`transition-all duration-500 ease-out ${pressureColor}`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="flex flex-col items-center justify-center">
            <span className={`text-lg font-black font-mono leading-none ${pressureText}`}>
              {pressure}%
            </span>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
              {pressureLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Col 2: Match Momentum & Crowd Sentiment */}
      <div className="flex flex-col justify-between pl-2">
        {/* Momentum */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Activity className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              Momentum
            </span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="text-slate-500">CSK Defending</span>
              <span className="text-cyan-400 font-mono">{momentum}%</span>
            </div>
            
            {/* Linear momentum indicator bar */}
            <div className="h-2 w-full bg-slate-900 border border-slate-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${100 - momentum}%` }}
                className="h-full bg-slate-800 transition-all duration-500"
              ></div>
              <div
                style={{ width: `${momentum}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]"
              ></div>
            </div>
          </div>
        </div>

        {/* Crowd Sentiment */}
        <div className="border-t border-slate-800/40 pt-2 flex items-center justify-between">
          <div>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">
              Crowd Sentiment
            </span>
            <span className="text-xs font-black text-slate-200 uppercase tracking-tight">
              {crowdSentiment}
            </span>
          </div>
          <div className={`p-1.5 rounded-lg ${
            crowdSentiment === "Ecstatic" || crowdSentiment === "Excited"
              ? "bg-emerald-950/20 text-emerald-400 border border-emerald-500/10"
              : crowdSentiment === "Silent" || crowdSentiment === "Anxious"
              ? "bg-rose-950/20 text-rose-400 border border-rose-500/10"
              : "bg-slate-900 text-slate-400"
          }`}>
            <Flame className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
