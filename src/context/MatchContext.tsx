"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  MatchState,
  BallRecord,
  getInitialMatchState,
  simulateNextBall
} from "@/utils/matchSimulator";
import { AgentMessage, AGENT_PROFILES } from "@/utils/agentPrompts";
import { useGemini } from "@/hooks/useGemini";

interface MatchContextType {
  matchState: MatchState;
  messages: AgentMessage[];
  isPlaying: boolean;
  simSpeed: number; // in milliseconds (e.g. 3000ms per ball)
  isGenerating: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  playSimulation: () => void;
  pauseSimulation: () => void;
  setSpeed: (speed: number) => void;
  triggerManualEvent: (type: "six" | "wicket" | "four" | "dot") => void;
  sendChatMessage: (text: string) => Promise<void>;
  resetSimulation: () => void;
  selectedMatchId: string;
  setSelectedMatchId: (id: string) => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({ children }: { children: React.ReactNode }) {
  const [matchState, setMatchState] = useState<MatchState>(getInitialMatchState("mi-rr"));
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simSpeed, setSimSpeed] = useState(3000); // Default 3s per ball
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedMatchId, setSelectedMatchId] = useState("mi-rr");
  
  const { getAgentResponse, getQAResponse } = useGemini();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger agent notifications for a given ball or match state
  const triggerAgents = async (state: MatchState) => {
    setIsGenerating(true);
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const lastBall = state.timeline[state.timeline.length - 1];

    // Helper to format new agent message
    const createAgentMessage = (
      agentId: "insight" | "prediction" | "meme" | "fantasy",
      content: string
    ): AgentMessage => {
      const profile = AGENT_PROFILES[agentId];
      return {
        id: `${agentId}-${Date.now()}-${Math.random()}`,
        agentId,
        agentName: profile.name,
        avatar: profile.avatar,
        color: profile.color,
        content,
        timestamp
      };
    };

    try {
      // Call all 4 agents concurrently!
      const [insightText, predictionText, memeText, fantasyText] = await Promise.all([
        getAgentResponse("insight", state),
        getAgentResponse("prediction", state),
        getAgentResponse("meme", state),
        getAgentResponse("fantasy", state)
      ]);

      const newMessages = [
        createAgentMessage("insight", insightText),
        createAgentMessage("prediction", predictionText),
        createAgentMessage("meme", memeText),
        createAgentMessage("fantasy", fantasyText)
      ];

      // Append new messages to front or back (front so they show latest at the top, or back for chat log)
      setMessages(prev => [...newMessages, ...prev]);
    } catch (e) {
      console.error("Error invoking agents:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Run the tick of the simulation
  const runTick = (injectedEvent?: "six" | "wicket" | "four" | "dot") => {
    setMatchState(prevState => {
      if (prevState.status !== "live") {
        setIsPlaying(false);
        return prevState;
      }
      
      const nextState = simulateNextBall(prevState, injectedEvent);
      
      // Trigger agents with the updated state asynchronously
      triggerAgents(nextState);

      return nextState;
    });
  };

  // Handle Play / Pause logic
  useEffect(() => {
    if (isPlaying && matchState.status === "live") {
      timerRef.current = setInterval(() => {
        runTick();
      }, simSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, simSpeed, matchState.status]);

  const playSimulation = () => {
    if (matchState.status !== "live") return;
    setIsPlaying(true);
  };

  const pauseSimulation = () => {
    setIsPlaying(false);
  };

  const setSpeed = (speedMs: number) => {
    setSimSpeed(speedMs);
  };

  // Inject a manual event
  const triggerManualEvent = (type: "six" | "wicket" | "four" | "dot") => {
    if (matchState.status !== "live") return;
    runTick(type);
  };

  // Chat message interaction
  const sendChatMessage = async (text: string) => {
    if (!text.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    // Add user message
    const userMsg: AgentMessage = {
      id: `user-${Date.now()}`,
      agentId: "qa", // flag as qa for style
      agentName: "You (Fan)",
      avatar: "👤",
      color: "blue",
      content: text,
      timestamp
    };

    setMessages(prev => [userMsg, ...prev]);

    // Let the Fan Q&A Agent reply
    setIsGenerating(true);
    try {
      const reply = await getQAResponse(text, matchState);
      const qaProfile = AGENT_PROFILES.qa;
      const agentMsg: AgentMessage = {
        id: `qa-${Date.now()}`,
        agentId: "qa",
        agentName: qaProfile.name,
        avatar: qaProfile.avatar,
        color: qaProfile.color,
        content: reply,
        timestamp
      };
      setMessages(prev => [agentMsg, ...prev]);
    } catch (e) {
      console.error("QA agent error:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setMatchState(getInitialMatchState(selectedMatchId));
    setMessages([]);
  };

  // Re-initialize state when the user selects a different match
  useEffect(() => {
    setIsPlaying(false);
    setMatchState(getInitialMatchState(selectedMatchId));
    setMessages([]);
  }, [selectedMatchId]);

  return (
    <MatchContext.Provider
      value={{
        matchState,
        messages,
        isPlaying,
        simSpeed,
        isGenerating,
        activeTab,
        setActiveTab,
        playSimulation,
        pauseSimulation,
        setSpeed,
        triggerManualEvent,
        sendChatMessage,
        resetSimulation,
        selectedMatchId,
        setSelectedMatchId
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export function useMatch() {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatch must be used within a MatchProvider");
  }
  return context;
}
