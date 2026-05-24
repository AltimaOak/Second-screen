import { useState } from "react";
import { MatchState } from "@/utils/matchSimulator";
import { generateLocalFallback, generateLocalQAResponse } from "@/utils/agentPrompts";

export function useGemini() {
  const [loading, setLoading] = useState(false);

  const getAgentResponse = async (
    agentId: "insight" | "prediction" | "meme" | "fantasy",
    state: MatchState
  ): Promise<string> => {
    setLoading(true);
    try {
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          agentId,
          matchState: {
            teamA: state.teamA,
            teamB: state.teamB,
            runs: state.runs,
            wickets: state.wickets,
            overs: state.overs,
            target: state.target,
            ballsBowled: state.ballsBowled,
            reqRunRate: state.reqRunRate,
            pressure: state.pressure,
            momentum: state.momentum,
            winProbability: state.winProbability,
            crowdSentiment: state.crowdSentiment,
            striker: state.batters.find(b => b.isStriker)?.name || "Batter",
            bowler: state.bowler.name
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          setLoading(false);
          return data.text;
        }
      }
    } catch (error) {
      console.warn("Gemini API error, falling back to local simulation engine:", error);
    }

    // Local Fallback
    setLoading(false);
    const lastBall = state.timeline[state.timeline.length - 1];
    return generateLocalFallback(agentId, state, lastBall);
  };

  const getQAResponse = async (query: string, state: MatchState): Promise<string> => {
    setLoading(true);
    try {
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          agentId: "qa",
          query,
          matchState: {
            teamA: state.teamA,
            teamB: state.teamB,
            runs: state.runs,
            wickets: state.wickets,
            overs: state.overs,
            target: state.target,
            ballsBowled: state.ballsBowled,
            reqRunRate: state.reqRunRate,
            pressure: state.pressure,
            momentum: state.momentum,
            winProbability: state.winProbability,
            crowdSentiment: state.crowdSentiment,
            striker: state.batters.find(b => b.isStriker)?.name || "Batter",
            bowler: state.bowler.name
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          setLoading(false);
          return data.text;
        }
      }
    } catch (error) {
      console.warn("Gemini API QA error, falling back to local engine:", error);
    }

    setLoading(false);
    return generateLocalQAResponse(query, state);
  };

  return {
    getAgentResponse,
    getQAResponse,
    loading
  };
}
