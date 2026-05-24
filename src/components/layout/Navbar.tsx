"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMatch } from "@/context/MatchContext";
import { Flame, Trophy, BarChart2, MessageSquare, Home, RotateCcw, ChevronDown, Zap } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { matchState, resetSimulation, selectedMatchId, setSelectedMatchId } = useMatch();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Live Arena", icon: Flame },
    { href: "/chat", label: "AI Chat", icon: MessageSquare },
    { href: "/fantasy", label: "Fantasy", icon: Trophy },
    { href: "/analytics", label: "Analytics", icon: BarChart2 }
  ];

  return (
    <>
      {/* HEADER NAVBAR (Desktop & Mobile Header) */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Left side: Brand Logo & Live Badge */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2.5 group">
                <img
                  src="/logo.png"
                  alt="SecondScreen AI Logo"
                  className="h-8 w-8 rounded-lg object-cover border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.25)] group-hover:border-cyan-400/50 transition-all duration-300"
                />
                <span className="text-lg font-black bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-500 bg-clip-text text-transparent transition-all duration-300 group-hover:brightness-110 drop-shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                  SecondScreen <span className="font-extrabold text-white">AI</span>
                </span>
              </Link>

              {/* Dynamic Live Scoreboard Indicator (Visible on Desktop/Tablet) */}
              <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                <span className="flex items-center gap-1 text-[10px] text-red-500 font-extrabold tracking-widest uppercase">
                  <span className="h-2 w-2 rounded-full bg-red-500 live-dot-glow"></span>
                  Live
                </span>
                <div className="h-3 w-px bg-slate-800"></div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  MI vs CSK
                </span>
                <div className="h-3 w-px bg-slate-800"></div>
                <span className="text-xs text-cyan-400 font-black font-mono">
                  {matchState.runs}/{matchState.wickets} ({matchState.overs} Ov)
                </span>
              </div>
            </div>

            {/* Middle side: Navigation Menu (Desktop Only) */}
            <nav className="hidden md:flex items-center bg-slate-900/30 border border-white/5 rounded-full p-1 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-950/80 to-slate-900 text-cyan-400 border border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-4 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side: Match Selector & Reset Action */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center">
                <select
                  value={selectedMatchId}
                  onChange={(e) => setSelectedMatchId(e.target.value)}
                  className="appearance-none bg-slate-900 border border-slate-800 hover:border-slate-750 text-[10px] sm:text-xs text-slate-300 font-extrabold rounded-full pl-3.5 pr-8 py-2.5 outline-none focus:border-cyan-500/50 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                >
                  <option value="mi-rr">MI vs RR (Live Today)</option>
                  <option value="mi-csk">MI vs CSK (Thriller Chase)</option>
                  <option value="rcb-kkr">RCB vs KKR (High Target)</option>
                  <option value="srh-dc">SRH vs DC (Powerplay Blitz)</option>
                  <option value="gt-rr">GT vs RR (Full 20-Over Chase)</option>
                  <option value="pbks-lsg">PBKS vs LSG (LSG Won)</option>
                </select>
                <ChevronDown className="absolute right-3 h-3 w-3 text-slate-500 pointer-events-none" />
              </div>

              <button
                onClick={resetSimulation}
                title="Reset Match Simulation"
                className="p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,0,0,0.1)]"
              >
                <RotateCcw className="h-3.5 w-3.5 transition-transform hover:rotate-180 duration-500" />
                <span className="hidden sm:inline text-xs font-bold">Reset</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION (Fixed Cyberpunk Bottom bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-900 bg-slate-950/90 backdrop-blur-lg px-2 pb-safe-bottom shadow-[0_-5px_25px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex flex-col items-center justify-center gap-1 py-1 w-14 rounded-xl transition-all duration-300 ${
                  isActive ? "text-cyan-400" : "text-slate-500"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                <span className="text-[9px] font-extrabold tracking-tight">
                  {link.label.split(" ")[0]}
                </span>
                {isActive && (
                  <span className="absolute -top-1 h-1 w-6 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
