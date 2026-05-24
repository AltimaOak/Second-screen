"use client";

import React, { useRef, useEffect } from "react";
import { useMatch } from "@/context/MatchContext";
import { Sparkles, Bot, Clock } from "lucide-react";

export default function AgentFeed() {
  const { messages, isGenerating } = useMatch();
  const feedEndRef = useRef<HTMLDivElement | null>(null);

  // We only show agent messages here, filter out QA user messages
  const agentMessages = messages.filter(m => m.agentId !== "qa" || m.agentName.includes("Agent") || m.agentName.includes("Assistant"));

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col h-[550px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-2">
        <div className="flex items-center gap-2">
          <Bot className="h-4.5 w-4.5 text-cyan-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Multi-Agent Intelligence Feed</h3>
        </div>
        <span className="text-[10px] text-cyan-400 font-extrabold uppercase bg-slate-900 border border-slate-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          Active (5 Agents)
        </span>
      </div>

      {/* Message Feed Scroller */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {agentMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-850 rounded-xl bg-slate-950/20">
            <Sparkles className="h-8 w-8 text-slate-600 mb-2 animate-bounce" />
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Awaiting Live Events...</p>
            <p className="text-[10px] text-slate-600 max-w-[200px] mt-1">
              Start the live match stream or concessions above to trigger immediate multi-agent responses!
            </p>
          </div>
        ) : (
          agentMessages.map((msg) => {
            // Pick styling based on agent
            let borderStyle = "border-slate-800 bg-slate-950/30";
            let nameStyle = "text-slate-300";
            let badgeStyle = "bg-slate-900 text-slate-400";
            
            if (msg.agentId === "insight") {
              borderStyle = "border-cyan-500/20 bg-cyan-950/5 shadow-[0_0_15px_rgba(6,182,212,0.02)]";
              nameStyle = "text-cyan-400";
              badgeStyle = "bg-cyan-950/40 text-cyan-400 border border-cyan-500/10";
            } else if (msg.agentId === "prediction") {
              borderStyle = "border-amber-500/20 bg-amber-950/5 shadow-[0_0_15px_rgba(245,158,11,0.02)]";
              nameStyle = "text-amber-400";
              badgeStyle = "bg-amber-950/40 text-amber-400 border border-amber-500/10";
            } else if (msg.agentId === "meme") {
              borderStyle = "border-pink-500/20 bg-pink-950/5 shadow-[0_0_15px_rgba(244,63,94,0.02)]";
              nameStyle = "text-pink-400";
              badgeStyle = "bg-pink-950/40 text-pink-400 border border-pink-500/10";
            } else if (msg.agentId === "fantasy") {
              borderStyle = "border-emerald-500/20 bg-emerald-950/5 shadow-[0_0_15px_rgba(16,185,129,0.02)]";
              nameStyle = "text-emerald-400";
              badgeStyle = "bg-emerald-950/40 text-emerald-400 border border-emerald-500/10";
            }

            return (
              <div
                key={msg.id}
                className={`p-3.5 rounded-xl border transition-all duration-300 transform hover:scale-[1.01] ${borderStyle}`}
              >
                {/* Heading details */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base select-none">{msg.avatar}</span>
                    <span className={`text-xs font-black ${nameStyle}`}>{msg.agentName}</span>
                    <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider ${badgeStyle}`}>
                      {msg.agentId === "insight" ? "Tactics" : msg.agentId === "prediction" ? "Predictor" : msg.agentId === "meme" ? "Meme" : "Fantasy"}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-500 flex items-center gap-1 font-semibold">
                    <Clock className="h-3 w-3" />
                    {msg.timestamp}
                  </span>
                </div>
                
                {/* Prompt content */}
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {msg.content}
                </p>
              </div>
            );
          })
        )}
        
        {/* Loading Indicator */}
        {isGenerating && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-xl border border-slate-900 bg-slate-950/50 justify-center">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest animate-pulse">
              Gemini parsing live stream comments...
            </span>
          </div>
        )}
        <div ref={feedEndRef} />
      </div>
    </div>
  );
}
