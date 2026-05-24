"use client";

import React, { useState, useEffect } from "react";
import { Zap, Bot, ShieldCheck, Flame, Radio } from "lucide-react";

export default function Preloader() {
  const [step, setStep] = useState(0); // 0 = Step 1, 1 = Step 2, 2 = Fade Out, 3 = Hidden
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Stage 1 Progress Simulation
    const progInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    // Transition to Step 2 after 2.2 seconds
    const timer1 = setTimeout(() => {
      setStep(1);
      setProgress(0);
      
      // Stage 2 Progress Simulation
      const prog2Interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(prog2Interval);
            return 100;
          }
          return prev + 6;
        });
      }, 90);

      // Transition to Fade Out after 1.8 seconds
      const timer2 = setTimeout(() => {
        setStep(2);
        
        // Hide preloader completely after fade transition completes
        const timer3 = setTimeout(() => {
          setStep(3);
        }, 700);
        
        return () => clearTimeout(timer3);
      }, 1800);

      return () => {
        clearTimeout(timer2);
        clearInterval(prog2Interval);
      };
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearInterval(progInterval);
    };
  }, []);

  if (step === 3) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#03081a] select-none transition-all duration-700 ease-in-out ${
        step === 2 ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Stadium ambient neon light rings */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl -z-10 animate-pulse delay-700"></div>

      <div className="max-w-md w-full px-6 flex flex-col items-center text-center">
        {/* Step 1 Graphic: Syncing Feeds */}
        {step === 0 && (
          <div className="space-y-6 animate-fade-in">
            {/* Pulsing Logo Emblem */}
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500 rounded-3xl blur-md opacity-40 animate-pulse"></div>
              <img
                src="/logo.png"
                alt="SecondScreen AI Emblem"
                className="relative h-28 w-28 rounded-3xl object-cover border border-white/10 shadow-2xl animate-bounce"
              />
              <span className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-pink-400 shadow-lg">
                <Radio className="h-4 w-4 animate-pulse" />
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-950/20 border border-pink-500/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.1)]">
                Stage 1/2: Core Intelligence Setup
              </span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                ESTABLISHING FRANCHISE STREAM INTEGRATION
              </h2>
              <p className="text-xs text-slate-500 font-bold max-w-xs mx-auto">
                Calibrating live commentary node connections, player batting profiles, and 5 specialized AI agent personas.
              </p>
            </div>
          </div>
        )}

        {/* Step 2 Graphic: Stadium Noise Calibration */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            {/* Calibrating radar emblem */}
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-emerald-400 to-indigo-500 rounded-3xl blur-md opacity-40 animate-pulse"></div>
              <img
                src="/logo.png"
                alt="SecondScreen AI Emblem"
                className="relative h-28 w-28 rounded-3xl object-cover border border-white/10 shadow-2xl scale-105"
              />
              <span className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shadow-lg">
                <Bot className="h-4 w-4 animate-spin-slow" />
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                Stage 2/2: Analytics Calibration
              </span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                SYNCING LIVE PROBABILITY VECTORS
              </h2>
              <p className="text-xs text-slate-500 font-bold max-w-xs mx-auto">
                Setting win metrics, circular pressure algorithms, crowd sentiments, and coordinate fantasy points grids.
              </p>
            </div>
          </div>
        )}

        {/* Loading Progress Bar Container */}
        <div className="w-full max-w-xs mt-10 space-y-2">
          <div className="h-1.5 w-full bg-slate-900/60 border border-slate-850 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${progress}%` }}
              className={`h-full rounded-full transition-all duration-300 ${
                step === 0 
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 shadow-[0_0_10px_rgba(236,72,153,0.3)]"
                  : "bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              }`}
            ></div>
          </div>
          <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">
            <span>{step === 0 ? "STREAM SYNC" : "ALGORITHMS CALIBRATING"}</span>
            <span className="font-mono">{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
