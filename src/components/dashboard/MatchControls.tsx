"use client";

import React from "react";
import { useMatch } from "@/context/MatchContext";
import { Play, Pause, FastForward, RotateCcw, Zap, Sparkles } from "lucide-react";

export default function MatchControls() {
  const {
    matchState,
    isPlaying,
    simSpeed,
    playSimulation,
    pauseSimulation,
    setSpeed,
    triggerManualEvent,
    resetSimulation
  } = useMatch();

  const isLive = matchState.status === "live";

  const speeds = [
    { label: "Slow (5s)", value: 5000 },
    { label: "Normal (3s)", value: 3000 },
    { label: "Fast (1.5s)", value: 1500 },
    { label: "Super (0.6s)", value: 600 }
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col gap-4">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4.5 w-4.5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Match Control Center</h3>
          </div>
          {!isLive && (
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-500">
              Match Over
            </span>
          )}
        </div>

        {/* Play/Pause & Speed Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-slate-950/40 border border-slate-900 p-3 rounded-xl">
          {/* Play/Pause */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isPlaying ? (
              <button
                onClick={pauseSimulation}
                disabled={!isLive}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs w-full sm:w-auto transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Pause className="h-3.5 w-3.5 fill-slate-950" />
                Pause Live Stream
              </button>
            ) : (
              <button
                onClick={playSimulation}
                disabled={!isLive}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs w-full sm:w-auto transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="h-3.5 w-3.5 fill-slate-950" />
                Start Live Stream
              </button>
            )}
          </div>

          {/* Speed Buttons */}
          <div className="flex flex-wrap items-center gap-1 w-full sm:w-auto">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mr-1 select-none">
              Speed:
            </span>
            {speeds.map((sp) => (
              <button
                key={sp.value}
                onClick={() => setSpeed(sp.value)}
                disabled={!isLive}
                className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-all duration-300 ${
                  simSpeed === sp.value
                    ? "bg-slate-800 text-cyan-400 border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.1)]"
                    : "bg-slate-950/20 text-slate-500 border-slate-900 hover:text-slate-300 hover:border-slate-800"
                }`}
              >
                {sp.label.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Inject Event Buttons */}
        <div>
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">
            Simulate Custom Event (Hackathon Injector)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => triggerManualEvent("six")}
              disabled={!isLive}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 hover:bg-emerald-950/60 text-emerald-400 text-xs font-bold transition-all duration-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Concede SIX!
            </button>
            <button
              onClick={() => triggerManualEvent("four")}
              disabled={!isLive}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 hover:bg-cyan-950/60 text-cyan-400 text-xs font-bold transition-all duration-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(6,182,212,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Concede FOUR
            </button>
            <button
              onClick={() => triggerManualEvent("wicket")}
              disabled={!isLive}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 hover:bg-rose-950/60 text-rose-400 text-xs font-bold transition-all duration-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(244,63,94,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trigger WICKET
            </button>
            <button
              onClick={() => triggerManualEvent("dot")}
              disabled={!isLive}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Concede Dot Ball
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
