"use client";

import React from "react";
import { useMatch } from "@/context/MatchContext";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from "recharts";
import { Trophy, Star, TrendingUp, Sparkles, UserCheck, ShieldAlert } from "lucide-react";

export default function FantasyInsightsPage() {
  const { matchState, messages } = useMatch();
  const { batters, bowler, recentBowlers, target, runs } = matchState;

  // Dynamically calculate fantasy points based on current simulation runs/wickets
  const getFantasyPoints = (name: string, type: "bat" | "bowl", runsScored: number, balls: number, wickets: number) => {
    let base = 0;
    if (type === "bat") {
      base += runsScored; // 1 pt per run
      // Simple milestones
      if (runsScored >= 30) base += 4;
      if (runsScored >= 50) base += 8;
      // Strike rate points
      if (balls > 0) {
        const sr = (runsScored / balls) * 100;
        if (sr > 170) base += 6;
        else if (sr > 130) base += 2;
      }
    } else {
      base += wickets * 25; // 25 pts per wicket
      if (wickets >= 3) base += 8; // 3 wicket bonus
      // Economy rate points
      const eco = runsScored / Math.max(0.1, balls);
      if (eco < 6) base += 6;
      else if (eco < 8) base += 2;
    }
    return Math.round(base);
  };

  // Build fantasy players dataset
  const skyRuns = batters.find(b => b.name === "Suryakumar Yadav")?.runs || 42;
  const skyBalls = batters.find(b => b.name === "Suryakumar Yadav")?.ballsFaced || 24;
  const hpRuns = batters.find(b => b.name === "Hardik Pandya")?.runs || 8;
  const hpBalls = batters.find(b => b.name === "Hardik Pandya")?.ballsFaced || 6;
  
  const pathi = recentBowlers.find(b => b.name === "Matheesha Pathirana") || { runs: 18, overs: 2, wickets: 1 };
  const jaddu = recentBowlers.find(b => b.name === "Ravindra Jadeja") || { runs: 24, overs: 3, wickets: 1 };

  const fantasyPlayers = [
    {
      name: "Suryakumar Yadav",
      role: "Batter (MI)",
      points: getFantasyPoints("Suryakumar Yadav", "bat", skyRuns, skyBalls, 0) + 15, // extra starting points
      status: skyRuns > 50 ? "Aggressive (High Form)" : "Aggressive",
      selection: "84%",
      avatar: "🏏",
      isCaptain: true
    },
    {
      name: "Matheesha Pathirana",
      role: "Bowler (CSK)",
      points: getFantasyPoints("Matheesha Pathirana", "bowl", pathi.runs, pathi.overs, pathi.wickets) + 35,
      status: "Death Specialist",
      selection: "62%",
      avatar: "⚡",
      isCaptain: false
    },
    {
      name: "Hardik Pandya",
      role: "All-Rounder (MI)",
      points: getFantasyPoints("Hardik Pandya", "bat", hpRuns, hpBalls, 0) + 20,
      status: "Finisher",
      selection: "71%",
      avatar: "🔥",
      isCaptain: false
    },
    {
      name: "Ravindra Jadeja",
      role: "All-Rounder (CSK)",
      points: getFantasyPoints("Ravindra Jadeja", "bowl", jaddu.runs, jaddu.overs, jaddu.wickets) + 40,
      status: "Spin Matchup",
      selection: "78%",
      avatar: "🛡️",
      isCaptain: false
    }
  ];

  // Get the latest fantasy agent comment from the messages feed
  const fantasyAgentMessage = messages.find(m => m.agentId === "fantasy")?.content ||
    "Fantasy Alert: Suryakumar Yadav is looking explosive! He stands as the premium Captain choice for your elite leagues, while Matheesha Pathirana's death overs present a high-value differential bowling option.";

  // Scatter plot data mapping risk vs reward
  const scatterData = [
    { x: 30, y: 85, name: "Suryakumar Yadav", z: 80, fill: "#06b6d4" },
    { x: 25, y: 70, name: "Matheesha Pathirana", z: 62, fill: "#f43f5e" },
    { x: 50, y: 55, name: "Hardik Pandya", z: 71, fill: "#10b981" },
    { x: 15, y: 65, name: "Ravindra Jadeja", z: 78, fill: "#eab308" }
  ];

  return (
    <div className="relative min-h-screen px-4 pt-8 pb-24 md:pb-8 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Mesh Grid Background */}
      <div className="mesh-grid"></div>

      {/* Page Title & Badging */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500 animate-pulse" />
            Fantasy Insights Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            AI-driven captaincy strategies, live match-point updates, and player risk-vs-reward coordinate systems.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            Fantasy AI Scout Active
          </span>
        </div>
      </div>

      {/* Grid Row 1: Agent Hot Tips & Points Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Points tracker list */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-2">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4.5 w-4.5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Squad Performance Tracker</h3>
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Dynamic Points Calculation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fantasyPlayers.map((player) => (
              <div
                key={player.name}
                className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 flex items-center justify-between hover:border-slate-850 hover:bg-slate-950/80 transition-all duration-300 transform hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-lg bg-slate-900 select-none">{player.avatar}</span>
                  <div>
                    <span className="text-xs font-black text-slate-200 block">{player.name}</span>
                    <span className="text-[10px] text-slate-500 font-medium block">{player.role}</span>
                    <span className="text-[9px] text-slate-400 bg-slate-900 border border-slate-850 px-1.5 py-0.5 rounded inline-block mt-1 font-bold">
                      Own: {player.selection} | {player.status}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-400 font-mono block">
                    {player.points} <span className="text-[10px] text-slate-500">PTS</span>
                  </span>
                  {player.isCaptain && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded inline-block mt-0.5">
                      C (2x Pts)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Scout recommendations */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-5 border border-emerald-500/20 bg-emerald-950/5 shadow-[0_0_20px_rgba(16,185,129,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 border-b border-emerald-500/10 pb-2">
              <Star className="h-4.5 w-4.5 text-emerald-400 animate-spin-slow" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Fantasy Scout Hotline</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              "{fantasyAgentMessage}"
            </p>
          </div>

          <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-900 text-xs">
            <span className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest block mb-1">
              Differential Matchup Pick
            </span>
            <span className="font-extrabold text-slate-200 block">Matheesha Pathirana</span>
            <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
              CSK's primary death bowler. Facing MI's tail is highly conducive for multi-wicket spells, yielding +50 ownership bonuses!
            </span>
          </div>
        </div>

      </div>

      {/* Grid Row 2: Risk-vs-Reward Scatter plot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Risk / Reward Coordinate Grid */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)] h-[360px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4.5 w-4.5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Player Risk-vs-Reward Assessment</h3>
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Coordinate Mapping</span>
          </div>

          <div className="flex-1 w-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Risk Index (0-100)"
                  stroke="#475569"
                  fontSize={9}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "Risk Index", position: "insideBottom", offset: -5, fill: "#475569", fontSize: 9 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Projected Reward (0-100)"
                  stroke="#475569"
                  fontSize={9}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: "Projected Reward", angle: -90, position: "insideLeft", fill: "#475569", fontSize: 9 }}
                />
                <ZAxis type="number" dataKey="z" range={[60, 200]} name="Ownership %" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "rgba(3, 7, 18, 0.9)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    fontSize: "10px",
                    color: "#cbd5e1"
                  }}
                />
                <Scatter name="Players" data={scatterData}>
                  {scatterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scout Legend */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-5 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1 border-b border-slate-800 pb-2">
              <ShieldAlert className="h-4.5 w-4.5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quadrant Classification</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="h-3 w-3 rounded-full bg-cyan-400 mt-1 select-none"></span>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Suryakumar Yadav</span>
                  <span className="text-[10px] text-slate-500 leading-tight block">
                    Low Risk / Extreme Reward. Cruising at 360-strike rate. Must-have captain.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="h-3 w-3 rounded-full bg-rose-500 mt-1 select-none"></span>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Matheesha Pathirana</span>
                  <span className="text-[10px] text-slate-500 leading-tight block">
                    Moderate Risk / High Reward. Death bowler with guaranteed wickets.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="h-3 w-3 rounded-full bg-emerald-400 mt-1 select-none"></span>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Hardik Pandya</span>
                  <span className="text-[10px] text-slate-500 leading-tight block">
                    High Risk / Moderate Reward. Finisher batting position makes boundary points volatile.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl text-[10px] text-slate-500 text-center font-bold font-sans">
            Data updates dynamically ball-by-ball.
          </div>
        </div>

      </div>
    </div>
  );
}
