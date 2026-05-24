"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMatch } from "@/context/MatchContext";
import { MessageSquare, Send, Bot, Clock, HelpCircle, Sparkles } from "lucide-react";

export default function ChatRoom() {
  const { messages, sendChatMessage, isGenerating, matchState } = useMatch();
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // We filter the global unified inbox to show ONLY Q&A interactions
  const qaMessages = [...messages]
    .filter(m => m.agentId === "qa")
    .reverse(); // Show chronological order for chat (oldest at top, newest at bottom)

  // Preset Questions
  const presetQuestions = [
    "Can MI still win? Analyze their chances.",
    "Who should bowl next to tie down Suryakumar Yadav?",
    "Give me the absolute best fantasy captain pick right now.",
    "Roast Mumbai's current batting performance!"
  ];

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText("");
    await sendChatMessage(text);
  };

  const handlePresetClick = async (q: string) => {
    if (isGenerating) return;
    await sendChatMessage(q);
  };

  return (
    <div className="glass-panel rounded-3xl border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.4)] flex flex-col md:flex-row h-[600px] overflow-hidden">
      
      {/* Sidebar - Presets & Live Match summary */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-850 bg-slate-950/40 p-5 flex flex-col justify-between">
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Bot className="h-4.5 w-4.5 text-cyan-400" />
              Fan Q&A Agent
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              An interactive live companion. Ask tactical questions, seek captain picks, or request roasts.
            </p>
          </div>

          {/* Quick preset questions */}
          <div>
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">
              Instant Tactical Prompts
            </span>
            <div className="flex flex-col gap-2">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(q)}
                  disabled={isGenerating}
                  className="w-full text-left text-[11px] p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-850 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-400 transition-all duration-300 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live score helper inside chat */}
        <div className="mt-4 md:mt-0 p-3 rounded-xl bg-slate-900/40 border border-slate-850/60 text-xs">
          <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-slate-500 uppercase">
            <span>Live Score context</span>
            <span className="text-red-500 animate-pulse">● LIVE</span>
          </div>
          <span className="text-slate-200 font-extrabold block">
            MI: {matchState.runs}/{matchState.wickets} ({matchState.overs} Ov)
          </span>
          <span className="text-[10px] text-slate-400">
            Target: {matchState.target} | Need {matchState.target - matchState.runs} runs in {120 - matchState.ballsBowled} balls.
          </span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col justify-between bg-slate-950/20">
        
        {/* Chat Header */}
        <div className="border-b border-slate-850 px-5 py-3 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              AI Fan Arena Chatroom
            </span>
          </div>
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">
            Direct Context Fed from commentary
          </span>
        </div>

        {/* Scrolling Chat Log */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {qaMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <MessageSquare className="h-10 w-10 text-slate-700 mb-2 animate-pulse" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Start the Conversation!</p>
              <p className="text-[10px] text-slate-600 max-w-[240px] mt-1">
                Select an instant prompt in the sidebar or type a custom question below to consult the Fan Q&A Agent!
              </p>
            </div>
          ) : (
            qaMessages.map((msg) => {
              const isUser = msg.agentName === "You (Fan)";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-2.5`}
                >
                  {!isUser && (
                    <span className="text-lg p-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 select-none">
                      🤖
                    </span>
                  )}
                  <div className="flex flex-col gap-1 max-w-[75%]">
                    {/* Timestamp & Name */}
                    <div className={`flex items-center gap-2 text-[9px] font-bold text-slate-500 ${isUser ? "justify-end" : "justify-start"}`}>
                      <span className={isUser ? "text-cyan-400" : "text-indigo-400"}>{msg.agentName}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Chat Bubble */}
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed font-medium ${
                        isUser
                          ? "bg-cyan-500 text-slate-950 rounded-tr-none font-bold shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                          : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                  {isUser && (
                    <span className="text-lg p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 select-none">
                      👤
                    </span>
                  )}
                </div>
              );
            })
          )}
          
          {/* Typing Indicator */}
          {isGenerating && qaMessages[qaMessages.length - 1]?.agentName === "You (Fan)" && (
            <div className="flex justify-start items-start gap-2.5">
              <span className="text-lg p-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 select-none">
                🤖
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-slate-500 text-indigo-400">Fan Q&A Agent</span>
                <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce delay-150"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce delay-300"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Text Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-850 bg-slate-950/40 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isGenerating ? "Gemini is analyzing..." : "Ask: Can MI still win? Who is bowling next?..."}
            disabled={isGenerating}
            className="flex-1 bg-slate-900 border border-slate-800 hover:border-slate-750 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs outline-none text-slate-200 transition-all duration-300 placeholder-slate-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isGenerating || !inputText.trim()}
            className="px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:scale-[1.02] disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed"
          >
            <Send className="h-3.5 w-3.5 fill-slate-950" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>

      </div>
    </div>
  );
}
