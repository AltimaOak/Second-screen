import { MatchState, BallRecord } from "./matchSimulator";

export interface AgentMessage {
  id: string;
  agentId: "insight" | "prediction" | "meme" | "fantasy" | "qa";
  agentName: string;
  avatar: string;
  color: string;
  content: string;
  timestamp: string;
}

export const AGENT_PROFILES = {
  insight: {
    id: "insight",
    name: "Insight Agent",
    role: "Tactical Analyst",
    avatar: "📊",
    color: "cyan",
    prompt: `You are the Insight Agent, a world-class cricket tactical analyst and coach.
Your job is to analyze the live ball-by-ball IPL match state and generate strategic/tactical insights.
Offer specific advice like bowler matchups, batting adjustments, field placement adjustments, and critical momentum swings.
Keep your response concise, sharp, and highly professional. Limit to 1-2 sentences.`
  },
  prediction: {
    id: "prediction",
    name: "Prediction Agent",
    role: "Win Prob & Analytics",
    avatar: "🔮",
    color: "amber",
    prompt: `You are the Prediction Agent, an advanced cricket forecasting engine.
Analyze the live match metrics (Runs, Wickets, Overs, RRR, Pressure, Momentum) and forecast upcoming events.
Predict what will happen in the next over, which bowler is likely to strike, or how the win probability will shift.
Speak in a data-backed, confident, and statistical tone. Limit to 1-2 sentences.`
  },
  meme: {
    id: "meme",
    name: "Meme Agent",
    role: "Humor & Social Feed",
    avatar: "🤪",
    color: "pink",
    prompt: `You are the Meme Agent, a witty cricket fan and social media content creator.
Generate viral-style humor, memes, and fan reactions based on major occurrences (wickets, sixes, dot balls).
Use a humorous, sarcastic, Gen-Z friendly, or typical passionate fan tone (e.g., Vada Pav/Rohit Sharma jokes, Dhoni finish hype).
Format like a trending tweet or reddit post. Limit to 1-2 sentences.`
  },
  fantasy: {
    id: "fantasy",
    name: "Fantasy Assistant",
    role: "Fantasy Expert",
    avatar: "🏆",
    color: "emerald",
    prompt: `You are the Fantasy Assistant Agent, a seasoned fantasy sports captain.
Provide immediate updates on fantasy points shifts, captain recommendations, high-value differential picks, and player risk index.
Speak like a professional fantasy cricket expert sharing hot-tips with players. Limit to 1-2 sentences.`
  },
  qa: {
    id: "qa",
    name: "Fan Q&A Agent",
    role: "Live Cricket Companion",
    avatar: "🤖",
    color: "violet",
    prompt: `You are the Fan Q&A Agent, an interactive live-chat companion.
You answer user questions about the live match in real-time, pulling in detailed live statistics, momentum shifts, and tactical options.
Be conversational, incredibly knowledgeable, slightly cheeky, and highly engaging. Address the user directly and reference current scores.`
  }
};

// High-fidelity fallback generators for each agent when Gemini is not active
export function generateLocalFallback(
  agentId: "insight" | "prediction" | "meme" | "fantasy",
  state: MatchState,
  lastBall?: BallRecord
): string {
  const runs = state.runs;
  const wickets = state.wickets;
  const balls = state.ballsBowled;
  const target = state.target;
  const runsNeeded = target - runs;
  const ballsRemaining = 120 - balls;
  const reqRate = state.reqRunRate;

  const currentStriker = state.batters.find(b => b.isStriker)?.name || "The batter";
  const currentBowler = state.bowler.name;

  if (agentId === "insight") {
    if (lastBall) {
      if (lastBall.type === "wicket") {
        return `Tactical Shift: With the wicket of ${lastBall.batterName}, ${state.teamA} has seized control. The incoming batter must face at least 3-4 balls defensively before attempting aggressive sweeps against ${currentBowler}'s extra bounce.`;
      }
      if (lastBall.type === "six") {
        return `Tactical Alert: ${currentStriker} is reading ${currentBowler}'s length early! ${state.teamA} should immediately push the mid-wicket fielder back to the boundary and bowl a slower, wide-angled delivery to avoid getting dispatched.`;
      }
      if (lastBall.type === "boundary") {
        return `Matchup Insight: ${currentStriker} excels against pace when pitched up. CSK's captain needs to adjust the length—short of a length outside off stump is the optimal channel to dry up the runs.`;
      }
      if (lastBall.type === "dot") {
        return `Matchup Pressure: ${currentBowler} is executing the defensive plan perfectly. With ${reqRate} RRR climbing, ${currentStriker} is showing vulnerability. A spinner at the other end could amplify this pressure.`;
      }
    }
    
    if (reqRate > 12) {
      return `Coach's Corner: Required rate is ${reqRate}. MI must target Shardul Thakur's upcoming over. Spin will be risky here; pace off and wide yorkers are the standard defense CSK will employ.`;
    }
    return `Strategic Setup: Jadeja's matchups against left-handers are favorable. MI should rotation-strike to ensure ${currentStriker} keeps facing the pace options instead of getting bogged down by spin.`;
  }

  if (agentId === "prediction") {
    if (lastBall?.type === "six") {
      return `Predictive Model: Following that six, win probability for MI rises by 6%. Model predicts ${state.teamA} has a 35% chance to concede another boundary in the next 3 balls due to bowler anxiety.`;
    }
    if (lastBall?.type === "wicket") {
      return `Predictive Model: Wicket drops MI's win probability to ${state.winProbability}%. Next over wicket probability stands at 24%. Predicted next-over scoring: 5-7 runs.`;
    }
    
    const runsPredicted = reqRate > 10 ? "10-12" : "7-9";
    return `Predictive Engine: Win probability is stable at ${state.winProbability}%. Model forecasts ${runsPredicted} runs in the upcoming over, with Pathirana likely to bowl the 18th over.`;
  }

  if (agentId === "meme") {
    if (lastBall) {
      if (lastBall.type === "six") {
        if (lastBall.batterName === "Suryakumar Yadav") {
          return `🔥 SKY is playing golf while CSK bowls. That 360-shot was so clean even the gravity took a holiday! #SKY #IPL2026`;
        }
        return `💥 THAT WENT INTO THE PARKING LOT! Fielder did not even look up, just ordered a search party. 😂 #IPL`;
      }
      if (lastBall.type === "wicket") {
        return `😭 MI fans celebrating a boundary and then immediately losing a wicket. Parkour of emotions! #CSKvsMI`;
      }
      if (lastBall.type === "dot") {
        return `⏱️ Dot balls in the 17th over are more stressful than my college semester exams. Fs in the chat. #IPL`;
      }
    }
    if (reqRate > 14) {
      return `🤡 MI fans calculating if they can win if it rains in an indoor stadium. "Mathematically still possible!" 😂`;
    }
    return `🍿 Dhoni behind the stumps looking like he already knows exactly what batter is thinking. Absolute cheat code.`;
  }

  if (agentId === "fantasy") {
    if (lastBall?.type === "six") {
      return `Fantasy Tracker: ${lastBall.batterName} adds +12 PTS for that maximum! Current projected total points: 82. Ideal captaincy choice if this pace continues.`;
    }
    if (lastBall?.type === "wicket") {
      return `Fantasy Alert: ${lastBall.bowlerName} picks up a crucial wicket (+25 PTS)! Differential pick alert: His ownership is only 18% in elite leagues, massive value!`;
    }

    const striker = state.batters.find(b => b.isStriker);
    if (striker && striker.runs > 40) {
      return `Fantasy Advice: ${striker.name} has crossed 40 runs (+10 Milestone bonus). If you have him as captain, you are cruising. Keep an eye on Romario Shepherd as a high-risk differential.`;
    }
    return `Fantasy Expert: Under pressure, players who bowl death overs like Pathirana accumulate points quickly via wickets (+25 pts each). Lock him in for your squad's vice-captain.`;
  }

  return "";
}

// Interactive custom responses for Q&A based on live queries
export function generateLocalQAResponse(query: string, state: MatchState): string {
  const q = query.toLowerCase();
  const runs = state.runs;
  const wickets = state.wickets;
  const balls = state.ballsBowled;
  const target = state.target;
  const runsNeeded = target - runs;
  const ballsRemaining = 120 - balls;
  const reqRate = state.reqRunRate;

  const striker = state.batters.find(b => b.isStriker)?.name || "Suryakumar Yadav";
  const nonStriker = state.batters.find(b => !b.isStriker)?.name || "Hardik Pandya";
  const bowler = state.bowler.name;

  if (q.includes("win") || q.includes("can mi") || q.includes("who will win")) {
    if (state.winProbability > 65) {
      return `Looking extremely good for Mumbai Indians! With ${striker} on strike and only ${runsNeeded} runs needed off ${ballsRemaining} balls, their win probability is a strong ${state.winProbability}%. As long as they avoid a dramatic batting collapse, MI will walk away with the points.`;
    } else if (state.winProbability < 35) {
      return `It is an uphill battle for Mumbai Indians right now. They need ${runsNeeded} runs in just ${ballsRemaining} balls at an RRR of ${reqRate}. With ${wickets} wickets down, the pressure is sky-high. Only a massive, heroic hitting display from ${striker} can pull off a miracle!`;
    } else {
      return `It is a complete nail-biter! MI need ${runsNeeded} runs in ${ballsRemaining} balls (RRR: ${reqRate}) with a win probability sitting at ${state.winProbability}%. The match is on a knife's edge. The next 6 balls will absolutely dictate the winner!`;
    }
  }

  if (q.includes("bowl") || q.includes("who next") || q.includes("bowling change")) {
    return `CSK should ideally keep ${bowler} running for this over to maintain the pressure. For the next over, Ravindra Jadeja could be a smart tactical play to tie down the scoring rate, or they could hold Matheesha Pathirana back to deliver his deadly yorkers in the 19th over.`;
  }

  if (q.includes("fantasy") || q.includes("captain") || q.includes("pick")) {
    return `Currently, the best fantasy captain option is **${striker}** who is batting on ${state.batters.find(b => b.isStriker)?.runs || 0} and racking up huge boundary points. For a differential pick, look at **${bowler}**—he is bowling crucial death overs and a couple of wickets at the tail end will fetch a massive +50 points!`;
  }

  if (q.includes("roast") || q.includes("joke") || q.includes("meme")) {
    return `CSK bowlers are currently sweating more than a student who didn't study and saw the question paper! Meanwhile, MI fans are checking their heart rate monitors every 2 balls. If ${striker} gets out now, the silence in Mumbai will be louder than a jet engine! 🤫`;
  }

  return `Here is the current live summary: Mumbai Indians are at ${runs}/${wickets} in ${state.overs} overs, chasing ${target}. They need ${runsNeeded} runs off ${ballsRemaining} balls at ${reqRate} runs/over. ${striker} is currently on strike facing ${bowler}. Let me know if you want tactical advice, fantasy recommendations, or prediction metrics!`;
}
