"use client";

import React, { useState, useEffect } from "react";
import { useMatch } from "@/context/MatchContext";
import { Calendar, Clock, Tv, Play, CheckCircle, RefreshCw } from "lucide-react";

interface MatchScheduleItem {
  id: string;
  teamA: string;
  teamB: string;
  venue: string;
  time: string;
  status: "live" | "upcoming" | "ended";
  scoreText: string;
  category: "today" | "tomorrow" | "all";
  isReal?: boolean;
}

export default function MatchCenter() {
  const { selectedMatchId, setSelectedMatchId } = useMatch();
  const [activeDay, setActiveDay] = useState<"today" | "tomorrow" | "all">("today");
  const [matches, setMatches] = useState<MatchScheduleItem[]>([]);
  const [loading, setLoading] = useState(false);

  const simulatedSchedules: MatchScheduleItem[] = [
    {
      id: "mi-rr",
      teamA: "Rajasthan Royals",
      teamB: "Mumbai Indians",
      venue: "Wankhede Stadium, Mumbai",
      time: "Live Today (IPL 2026)",
      status: "live",
      scoreText: "RR 205/8 | MI 38/3 (6.0)",
      category: "today"
    },
    {
      id: "mi-csk",
      teamA: "Chennai Super Kings",
      teamB: "Mumbai Indians",
      venue: "Wankhede Stadium, Mumbai",
      time: "Started at 7:30 PM",
      status: "live",
      scoreText: "CSK 188/6 | MI 126/3 (15.0)",
      category: "today"
    },
    {
      id: "rcb-kkr",
      teamA: "Kolkata Knight Riders",
      teamB: "Royal Challengers Bengaluru",
      venue: "M. Chinnaswamy Stadium, Bengaluru",
      time: "Started at 3:30 PM",
      status: "live",
      scoreText: "KKR 223/5 | RCB 135/2 (11.0)",
      category: "today"
    },
    {
      id: "srh-dc",
      teamA: "Delhi Capitals",
      teamB: "Sunrisers Hyderabad",
      venue: "Arun Jaitley Stadium, Delhi",
      time: "Tomorrow, 7:30 PM",
      status: "upcoming",
      scoreText: "Match starts soon",
      category: "tomorrow"
    },
    {
      id: "gt-rr",
      teamA: "Rajasthan Royals",
      teamB: "Gujarat Titans",
      venue: "Narendra Modi Stadium, Ahmedabad",
      time: "Tomorrow, 3:30 PM",
      status: "upcoming",
      scoreText: "Pre-match drills",
      category: "tomorrow"
    },
    {
      id: "pbks-lsg",
      teamA: "Lucknow Super Giants",
      teamB: "Punjab Kings",
      venue: "PCA Stadium, Mohali",
      time: "Ended yesterday",
      status: "ended",
      scoreText: "LSG 196/4 | PBKS 188/9 (20.0)",
      category: "all"
    }
  ];

  const fetchLiveMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/matches");
      if (res.ok) {
        const data = await res.json();
        if (data.matches && data.matches.length > 0) {
          // Flag real matches so we know they are live-fetched
          const realWithFlag = data.matches.map((m: any) => ({ ...m, isReal: true }));
          
          // Merge real matches with simulated ones, keeping simulated ones at the top for playable matches
          setMatches([...simulatedSchedules, ...realWithFlag]);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch live matches:", e);
    }
    // Fallback to simulated only
    setMatches(simulatedSchedules);
    setLoading(false);
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  // Filter matches based on active tab
  const filteredMatches = matches.filter((match) => {
    if (activeDay === "all") return true;
    return match.category === activeDay;
  });

  return (
    <div className="glass-panel rounded-xl p-5 border border-[#1a2336] bg-[#0d121e] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a2336] pb-4 mb-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="h-4.5 w-4.5 text-cyan-500" />
            TATA IPL Match Center
          </h3>
          <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
            Select a match context to monitor with live AI analytics
          </p>
        </div>

        {/* Day selection tabs & Refresh */}
        <div className="flex items-center gap-3">
          <button
            onClick={fetchLiveMatches}
            disabled={loading}
            className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all disabled:opacity-50"
            title="Refresh Live Scores"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>

          <div className="flex items-center bg-slate-950/60 border border-slate-900 rounded-lg p-1">
            {(["today", "tomorrow", "all"] as const).map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                  activeDay === day
                    ? "bg-[#1a2336] text-cyan-400 border border-[#25324e] shadow-[0_0_8px_rgba(8,145,178,0.1)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Match cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMatches.length === 0 ? (
          <div className="col-span-full py-8 text-center text-xs text-slate-500 font-bold uppercase tracking-wider">
            No matches scheduled for this period.
          </div>
        ) : (
          filteredMatches.map((match) => {
            const isSelected = selectedMatchId === match.id;
            return (
              <div
                key={match.id}
                className={`p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-[180px] ${
                  isSelected
                    ? "bg-[#141b2c] border-cyan-500/40 shadow-[0_4px_16px_rgba(8,145,178,0.1)]"
                    : "bg-[#0d121e]/80 border-[#1a2336] hover:border-slate-700 hover:bg-[#111726]"
                }`}
              >
                <div>
                  {/* Card Header Status */}
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[8px] text-slate-400 font-bold uppercase truncate max-w-[130px]">
                      {match.venue.split(",")[0]}
                    </span>
                    
                    {match.status === "live" ? (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-950/20 border border-red-500/30 text-[8px] text-red-500 font-extrabold uppercase tracking-widest">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 live-dot-glow"></span>
                        {match.isReal ? "Real Match" : "Live"}
                      </span>
                    ) : match.status === "upcoming" ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[8px] text-slate-400 font-extrabold uppercase tracking-wide">
                        <Clock className="h-2 w-2 text-slate-400" />
                        {match.time.split(",")[0]}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-850 text-[8px] text-emerald-500 font-extrabold uppercase tracking-wide">
                        <CheckCircle className="h-2 w-2 text-emerald-400" />
                        Ended
                      </span>
                    )}
                  </div>

                  {/* Team Head-to-Head */}
                  <div className="space-y-1 mt-1">
                    <div className="flex justify-between text-xs font-black">
                      <span className="text-slate-200">{match.teamB.split(" ")[0]}</span>
                      <span className="text-cyan-400 font-mono">
                        {match.isReal 
                          ? `${match.scoreText.split("|")[1]?.trim() || "Batting"}` 
                          : match.status === "live" && isSelected 
                          ? `${simulatedSchedules.find(m => m.id === match.id)?.scoreText.split("|")[1]?.trim().split(" ")[1] || "126/3"}` 
                          : match.status === "ended" ? "188/9" : "0/0"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-black">
                      <span className="text-slate-200">{match.teamA.split(" ")[0]}</span>
                      <span className="text-slate-400 font-mono">
                        {match.isReal 
                          ? `${match.scoreText.split("|")[0]?.trim() || "Defending"}` 
                          : match.status === "live" ? "188/6" : match.status === "ended" ? "196/4" : "176/5"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enter Match Action */}
                <div className="border-t border-[#1a2336] pt-2.5 mt-2 flex items-center justify-between gap-2">
                  <span className="text-[9px] text-slate-500 font-semibold truncate max-w-[130px]">
                    {match.time}
                  </span>
                  
                  {isSelected ? (
                    <span className="text-[10px] font-black text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1">
                      <Tv className="h-3 w-3" />
                      Monitoring
                    </span>
                  ) : (
                    <button
                      onClick={() => !match.isReal && setSelectedMatchId(match.id)}
                      disabled={match.isReal}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[10px] font-extrabold text-slate-350 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play className="h-3 w-3 fill-slate-350" />
                      {match.isReal ? "Monitor Locked" : "Enter Arena"}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
