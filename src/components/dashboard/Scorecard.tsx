"use client";

import React from "react";
import { useMatch } from "@/context/MatchContext";
import { User, ShieldAlert, Award } from "lucide-react";

export default function Scorecard() {
  const { matchState } = useMatch();
  const { teamA, teamB, teamAScore, target, runs, wickets, overs, ballsBowled, batters, bowler, reqRunRate, runRate } = matchState;

  const ballsRemaining = 120 - ballsBowled;
  const runsNeeded = target - runs;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Live IPL Match</span>
        </div>
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
          CSK Score: {teamAScore}
        </span>
      </div>

      {/* Primary Score Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-6">
        {/* Chasing Team Score */}
        <div className="col-span-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            {teamB} (Chasing)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {runs}/{wickets}
            </span>
            <span className="text-sm text-slate-400 font-medium">
              in {overs} / 20 overs
            </span>
          </div>
        </div>

        {/* Target Details */}
        <div className="col-span-1 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-center text-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5">
            Match Equation
          </span>
          {runsNeeded > 0 ? (
            <span className="text-sm sm:text-base font-extrabold text-cyan-400">
              Need {runsNeeded} runs in {ballsRemaining} balls
            </span>
          ) : (
            <span className="text-sm sm:text-base font-extrabold text-emerald-400">
              Mumbai Indians won by {10 - wickets} wickets!
            </span>
          )}
          <span className="text-[10px] text-slate-400 mt-0.5">
            Target: <strong className="text-slate-200">{target}</strong> | RRR: <strong className="text-cyan-400">{reqRunRate}</strong>
          </span>
        </div>

        {/* Current Run Rates */}
        <div className="col-span-1 flex justify-around">
          <div className="text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Current R.R</span>
            <span className="text-xl font-black text-slate-200">{runRate}</span>
          </div>
          <div className="h-8 w-px bg-slate-800 self-center"></div>
          <div className="text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Required R.R</span>
            <span className="text-xl font-black text-cyan-400">{reqRunRate}</span>
          </div>
        </div>
      </div>

      {/* Batting & Bowling Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800/50 pt-5">
        {/* Batters */}
        <div className="space-y-3">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1.5">
            Active Batting Partnership
          </span>
          <div className="space-y-2">
            {batters.map((bat) => (
              <div
                key={bat.name}
                className={`flex items-center justify-between p-2.5 rounded-lg border transition-all duration-300 ${
                  bat.isStriker
                    ? "bg-slate-900/60 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.05)]"
                    : "bg-slate-950/20 border-slate-900/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${bat.isStriker ? "bg-cyan-950 text-cyan-400" : "bg-slate-900 text-slate-500"}`}>
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className={`text-xs font-bold ${bat.isStriker ? "text-cyan-400" : "text-slate-300"}`}>
                    {bat.name} {bat.isStriker && <span className="text-[10px] text-cyan-400/80 animate-pulse ml-1">★</span>}
                  </span>
                </div>
                <div className="flex gap-4 text-xs font-bold">
                  <div className="text-right">
                    <span className="text-slate-100">{bat.runs}</span>
                    <span className="text-slate-500 text-[10px] font-normal font-mono block">({bat.ballsFaced})</span>
                  </div>
                  <div className="text-right text-[10px] font-normal text-slate-500 hidden sm:block">
                    <span>{bat.fours}x4 / {bat.sixes}x6</span>
                    <span className="block font-mono">SR: {bat.ballsFaced > 0 ? ((bat.runs / bat.ballsFaced) * 100).toFixed(0) : "0"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bowler */}
        <div className="space-y-3">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1.5">
            Active Bowler
          </span>
          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-pink-950/20 border border-pink-500/10 text-pink-400">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 block">{bowler.name}</span>
                <span className="text-[10px] text-slate-500">Fast Bowler</span>
              </div>
            </div>
            <div className="flex gap-4 text-right">
              <div>
                <span className="text-xs font-bold text-slate-100 block font-mono">
                  {bowler.wickets} - {bowler.runs}
                </span>
                <span className="text-[10px] text-slate-500 block">W-R</span>
              </div>
              <div className="h-6 w-px bg-slate-800 self-center"></div>
              <div>
                <span className="text-xs font-bold text-slate-100 block font-mono">
                  {bowler.overs}
                </span>
                <span className="text-[10px] text-slate-500 block">Overs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
