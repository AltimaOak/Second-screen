"use client";

import React from "react";
import ChatRoom from "@/components/chat/ChatRoom";

export default function ChatPage() {
  return (
    <div className="relative min-h-screen px-4 pt-8 pb-24 md:pb-8 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Mesh Grid Background */}
      <div className="mesh-grid"></div>

      {/* Page Title & Badging */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            AI Fan Chatroom
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Interact directly with the Fan Q&A Agent in real time based on the active live scorecard.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.1)]">
            Context Sync Active
          </span>
        </div>
      </div>

      {/* Interactive Chat Layout */}
      <div className="w-full mb-8">
        <ChatRoom />
      </div>
    </div>
  );
}
