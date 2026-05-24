"use client";

import React from "react";
import { useMatch } from "@/context/MatchContext";
import { ListFilter, Trophy } from "lucide-react";

export default function MatchTimeline() {
  const { matchState } = useMatch();
  const { timeline, currentOverHistory, bowler } = matchState;

  // Reverse timeline to show latest balls first for scrolling experience
  const reversedTimeline = [...timeline].reverse();

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col h-[550px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-2">
        <div className="flex items-center gap-2">
          <ListFilter className="h-4.5 w-4.5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Live Ball-by-Ball Commentary</h3>
        </div>
      </div>

      {/* Current Over Progress Row */}
      <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-3.5 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
            This Over (by {bowler.name})
          </span>
          <span className="text-[10px] text-slate-400">
            {currentOverHistory.length === 0 ? "Over just starting..." : `Balls bowled: ${currentOverHistory.length}`}
          </span>
        </div>
        
        {/* Ball bubbles list */}
        <div className="flex flex-wrap gap-2">
          {currentOverHistory.length === 0 ? (
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <span
                  key={i}
                  className="h-7 w-7 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-[10px] font-bold text-slate-600 select-none"
                >
                  -
                </span>
              ))}
            </div>
          ) : (
            currentOverHistory.map((outcome, idx) => {
              let circleColor = "bg-slate-900 border-slate-800 text-slate-300";
              if (outcome === "W") {
                circleColor = "bg-rose-950/30 border-rose-500/40 text-rose-400 font-extrabold shadow-[0_0_8px_rgba(244,63,94,0.1)]";
              } else if (outcome === "6") {
                circleColor = "bg-emerald-950/40 border-emerald-500/50 text-emerald-400 font-black shadow-[0_0_8px_rgba(16,185,129,0.15)]";
              } else if (outcome === "4") {
                circleColor = "bg-cyan-950/40 border-cyan-500/50 text-cyan-400 font-black shadow-[0_0_8px_rgba(6,182,212,0.15)]";
              } else if (outcome === "0") {
                circleColor = "bg-slate-950 border-slate-850 text-slate-600 font-semibold";
              }
              return (
                <span
                  key={idx}
                  className={`h-7 w-7 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${circleColor}`}
                >
                  {outcome}
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* Historical Commentary Feed */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
        {reversedTimeline.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-850 rounded-xl bg-slate-950/20">
            <Trophy className="h-8 w-8 text-slate-600 mb-2" />
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Simulation Ready</p>
            <p className="text-[10px] text-slate-600 max-w-[200px] mt-1">
              Start ticking the scorecard to build a live commentary feed!
            </p>
          </div>
        ) : (
          reversedTimeline.map((item, idx) => {
            let outcomeBadge = "bg-slate-900 border-slate-800 text-slate-400";
            let lineGlow = "border-l-2 border-slate-800";
            
            if (item.type === "wicket") {
              outcomeBadge = "bg-rose-950/40 border-rose-500/20 text-rose-400 font-bold";
              lineGlow = "border-l-2 border-rose-500/40 bg-rose-950/[0.02]";
            } else if (item.type === "six") {
              outcomeBadge = "bg-emerald-950/40 border-emerald-500/20 text-emerald-400 font-bold";
              lineGlow = "border-l-2 border-emerald-500/40 bg-emerald-950/[0.02]";
            } else if (item.type === "boundary") {
              outcomeBadge = "bg-cyan-950/40 border-cyan-500/20 text-cyan-400 font-bold";
              lineGlow = "border-l-2 border-cyan-500/40 bg-cyan-950/[0.02]";
            } else if (item.type === "dot") {
              outcomeBadge = "bg-slate-950 border-slate-900 text-slate-500";
            }

            const ballLabel = `${item.over}.${item.ball}`;
            const runsValue = item.type === "wicket" ? "OUT" : `${item.runs} run${item.runs === 1 ? "" : "s"}`;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border border-slate-900/60 flex gap-3 text-xs leading-relaxed transition-all duration-300 ${lineGlow}`}
              >
                {/* Over Index & Outcome Bubble */}
                <div className="flex flex-col items-center gap-1.5 justify-center min-w-[50px]">
                  <span className="text-[10px] text-slate-500 font-extrabold font-mono">{ballLabel}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] uppercase tracking-wider border select-none ${outcomeBadge}`}>
                    {runsValue}
                  </span>
                </div>

                {/* Commentary details */}
                <div className="flex-1 space-y-1">
                  <p className="text-slate-300 font-medium">{item.description}</p>
                  
                  {/* Score after ball tag */}
                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    <span>
                      {item.batterName} vs {item.bowlerName}
                    </span>
                    <span>
                      Score: <strong className="text-slate-400">{item.scoreAfter}</strong>
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
