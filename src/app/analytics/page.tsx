"use client";

import React from "react";
import { useMatch } from "@/context/MatchContext";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { BarChart2, MessageSquare, TrendingUp, Clock, ListFilter, Activity } from "lucide-react";

export default function MatchAnalyticsPage() {
  const { matchState } = useMatch();
  const { highlightSummary, crowdSentiment, runs, target, ballsBowled, teamA, teamB } = matchState;

  // Build over-by-over run rate dataset
  // Let's create realistic comparative line nodes
  const chartData = [
    { over: "Start", MI: 8.4, CSK: 9.4 },
    { over: "Over 15", MI: 8.4, CSK: 9.2 },
    { over: "Over 16", MI: ballsBowled >= 96 ? 8.6 : null, CSK: 9.1 },
    { over: "Over 17", MI: ballsBowled >= 102 ? 8.9 : null, CSK: 9.3 },
    { over: "Over 18", MI: ballsBowled >= 108 ? 9.5 : null, CSK: 9.4 },
    { over: "Over 19", MI: ballsBowled >= 114 ? 10.2 : null, CSK: 9.5 },
    { over: "Over 20", MI: ballsBowled >= 120 ? 11.1 : null, CSK: 9.4 }
  ];

  return (
    <div className="relative min-h-screen px-4 pt-8 pb-24 md:pb-8 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Mesh Grid Background */}
      <div className="mesh-grid"></div>

      {/* Page Title & Badging */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-cyan-400" />
            Tactical Match Analytics
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Over-by-over scoring differentials, crowd energy metrics, and automated AI match highlight logs.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.1)]">
            Analytics Engine Syncing
          </span>
        </div>
      </div>

      {/* Row 1: Over-by-Over Chart & Sentiment Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recharts Line Chart */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)] h-[360px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4.5 w-4.5 text-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Run Rate Comparison Timeline</h3>
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Chase pace vs Target pace</span>
          </div>

          <div className="flex-1 w-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis
                  dataKey="over"
                  stroke="#475569"
                  fontSize={9}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#475569"
                  fontSize={9}
                  domain={[6, 14]}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(3, 7, 18, 0.9)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    fontSize: "10px",
                    color: "#cbd5e1"
                  }}
                />
                <Legend verticalAlign="top" height={25} iconSize={8} wrapperStyle={{ fontSize: "10px" }} />
                <Line
                  type="monotone"
                  dataKey="MI"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  name="MI Chase R.R"
                  dot={{ r: 3, strokeWidth: 1 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="CSK"
                  stroke="#eab308"
                  strokeWidth={1.5}
                  name="CSK Target R.R"
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crowd Sentiment Gauge */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-5 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
              <Activity className="h-4.5 w-4.5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Crowd Sentiment Index</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">
                  Current Stadium Mood
                </span>
                <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent block mt-1 select-none">
                  {crowdSentiment}
                </span>
              </div>

              {/* Progress bars classification */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                    <span>Excitement / Celebration</span>
                    <span>{crowdSentiment === "Ecstatic" ? "92%" : crowdSentiment === "Excited" ? "80%" : "45%"}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      style={{ width: crowdSentiment === "Ecstatic" ? "92%" : crowdSentiment === "Excited" ? "80%" : "45%" }}
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                    <span>Tension / Anxiety</span>
                    <span>{crowdSentiment === "Anxious" ? "85%" : crowdSentiment === "Tense" ? "65%" : "20%"}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      style={{ width: crowdSentiment === "Anxious" ? "85%" : crowdSentiment === "Tense" ? "65%" : "20%" }}
                      className="h-full bg-rose-500 rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl text-[10px] text-slate-500 leading-tight">
            Stadium mood is calculated using a rolling window of dot balls, wickets, boundaries, and run rate shifts.
          </div>
        </div>

      </div>

      {/* Row 2: Live Highlight Summary Log */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)] mb-8 flex flex-col min-h-[300px]">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-2">
          <div className="flex items-center gap-2">
            <ListFilter className="h-4.5 w-4.5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Highlight Narratives</h3>
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase">Automated Summary Chronology</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[300px]">
          {highlightSummary.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <Clock className="h-8 w-8 text-slate-700 mb-2 animate-spin-slow" />
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">No Milestones Logged Yet</p>
              <p className="text-[10px] text-slate-600 max-w-[200px] mt-1">
                Once boundaries or wickets are registered, a detailed automated summary will populate here!
              </p>
            </div>
          ) : (
            [...highlightSummary].reverse().map((highlight, index) => {
              const isWicket = highlight.includes("WICKET");
              const isWin = highlight.includes("MATCH ENDED") || highlight.includes("won");

              return (
                <div
                  key={index}
                  className={`p-3 rounded-xl border text-xs leading-relaxed font-semibold transition-all duration-300 flex items-center gap-3 ${
                    isWicket
                      ? "bg-rose-950/20 border-rose-500/20 text-rose-300"
                      : isWin
                      ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
                      : "bg-slate-900 border-slate-850 text-slate-200"
                  }`}
                >
                  <span className="text-base select-none">
                    {isWicket ? "🔴" : isWin ? "🏆" : "⚡"}
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase tracking-wider mb-0.5">
                      {isWicket ? "Wicket Fall" : isWin ? "Match Verdict" : "Chase boundary"}
                    </span>
                    <p className="font-medium">{highlight}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
