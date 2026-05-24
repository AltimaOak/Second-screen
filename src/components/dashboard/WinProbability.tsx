"use client";

import React from "react";
import { useMatch } from "@/context/MatchContext";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, BarChart2 } from "lucide-react";

export default function WinProbability() {
  const { matchState } = useMatch();
  const { winProbability, timeline, teamA, teamB } = matchState;

  const miWin = winProbability;
  const cskWin = 100 - winProbability;

  // Build chart history from timeline
  const chartData = [
    { name: "Start", MI: 48, CSK: 52 },
    ...timeline.map((record, index) => ({
      name: `${record.over}.${record.ball}`,
      MI: record.winProb,
      CSK: 100 - record.winProb
    }))
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col justify-between h-[340px]">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Win Probability Engine</h3>
        </div>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          Gemini Algorithmic Model
        </span>
      </div>

      {/* Probability Gauge Bar */}
      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-xs font-black">
          <span className="text-yellow-500 uppercase tracking-tight">{teamA} (CSK) {cskWin}%</span>
          <span className="text-cyan-400 uppercase tracking-tight">{teamB} (MI) {miWin}%</span>
        </div>
        <div className="h-3 w-full bg-slate-900 border border-slate-800 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${cskWin}%` }}
            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]"
          ></div>
          <div
            style={{ width: `${miWin}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
          ></div>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="flex-1 w-full min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorCSK" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#eab308" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#475569"
              fontSize={9}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#475569"
              fontSize={9}
              domain={[0, 100]}
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
            <Area
              type="monotone"
              dataKey="MI"
              stroke="#06b6d4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMI)"
              name="MI Win %"
            />
            <Area
              type="monotone"
              dataKey="CSK"
              stroke="#eab308"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#colorCSK)"
              name="CSK Win %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
