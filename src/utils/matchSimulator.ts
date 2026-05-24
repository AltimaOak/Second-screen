export interface Batter {
  name: string;
  runs: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  isStriker: boolean;
}

export interface Bowler {
  name: string;
  overs: number;
  runs: number;
  wickets: number;
}

export interface BallRecord {
  over: number;
  ball: number;
  runs: number;
  type: "normal" | "wicket" | "boundary" | "six" | "dot" | "extra";
  description: string;
  batterName: string;
  bowlerName: string;
  scoreBefore: string;
  scoreAfter: string;
  winProb: number;
}

export interface MatchState {
  matchId: string;
  teamA: string; // Defending Team
  teamB: string; // Chasing Team
  teamAScore: string; // Defending Team Score
  target: number;
  runs: number; // Chasing Score
  wickets: number;
  overs: number;
  ballsBowled: number;
  batters: Batter[];
  bowler: Bowler;
  recentBowlers: Bowler[];
  runRate: number;
  reqRunRate: number;
  winProbability: number;
  pressure: number;
  momentum: number;
  timeline: BallRecord[];
  currentOverHistory: string[];
  crowdSentiment: "Tense" | "Anxious" | "Excited" | "Ecstatic" | "Nervous" | "Silent";
  status: "live" | "paused" | "won" | "lost" | "completed" | "upcoming";
  highlightSummary: string[];
}

// Global bench and bowlers database for simulated games
export const MULTI_MATCH_DATA = {
  "mi-rr": {
    teamA: "Rajasthan Royals",
    teamB: "Mumbai Indians",
    teamAScore: "205/8 (20.0 overs)",
    target: 206,
    startRuns: 38,
    startWickets: 3,
    startBalls: 36, // Over 6.0 (Powerplay complete)
    batters: [
      { name: "Hardik Pandya", runs: 12, ballsFaced: 8, fours: 2, sixes: 0, isStriker: true },
      { name: "Suryakumar Yadav", runs: 15, ballsFaced: 10, fours: 1, strokeWidth: 0, sixes: 1, isStriker: false }
    ],
    bowlers: [
      { name: "Trent Boult", overs: 2, runs: 12, wickets: 2 },
      { name: "Sandeep Sharma", overs: 2, runs: 16, wickets: 1 },
      { name: "Yuzvendra Chahal", overs: 1, runs: 8, wickets: 0 },
      { name: "Ravichandran Ashwin", overs: 1, runs: 2, wickets: 0 },
      { name: "Avesh Khan", overs: 0, runs: 0, wickets: 0 }
    ],
    bench: ["Tim David", "Romario Shepherd", "Gerald Coetzee", "Jasprit Bumrah"],
    startWinProb: 35,
    statusText: "Live IPL: Mumbai Indians are struggling at 38/3 after the Powerplay, chasing a massive 206. Suryakumar & Hardik need to rebuild."
  },
  "mi-csk": {
    teamA: "Chennai Super Kings",
    teamB: "Mumbai Indians",
    teamAScore: "188/6 (20.0 overs)",
    target: 189,
    startRuns: 126,
    startWickets: 3,
    startBalls: 90, // Over 15.0
    batters: [
      { name: "Suryakumar Yadav", runs: 42, ballsFaced: 24, fours: 4, sixes: 2, isStriker: true },
      { name: "Hardik Pandya", runs: 8, ballsFaced: 6, fours: 1, sixes: 0, isStriker: false }
    ],
    bowlers: [
      { name: "Matheesha Pathirana", overs: 2, runs: 18, wickets: 1 },
      { name: "Ravindra Jadeja", overs: 3, runs: 24, wickets: 1 },
      { name: "Tushar Deshpande", overs: 2.4, runs: 22, wickets: 0 },
      { name: "Shardul Thakur", overs: 3, runs: 32, wickets: 1 },
      { name: "Deepak Chahar", overs: 4, runs: 38, wickets: 0 }
    ],
    bench: ["Tim David", "Romario Shepherd", "Gerald Coetzee", "Jasprit Bumrah"],
    startWinProb: 48,
    statusText: "Mumbai Indians need 63 runs in 30 balls to win."
  },
  "rcb-kkr": {
    teamA: "Kolkata Knight Riders",
    teamB: "Royal Challengers Bengaluru",
    teamAScore: "223/5 (20.0 overs)",
    target: 224,
    startRuns: 135,
    startWickets: 2,
    startBalls: 66, // Over 11.0
    batters: [
      { name: "Virat Kohli", runs: 58, ballsFaced: 32, fours: 6, sixes: 3, isStriker: true },
      { name: "Glenn Maxwell", runs: 12, ballsFaced: 7, fours: 1, sixes: 1, isStriker: false }
    ],
    bowlers: [
      { name: "Sunil Narine", overs: 2, runs: 16, wickets: 1 },
      { name: "Varun Chakaravarthy", overs: 2, runs: 22, wickets: 1 },
      { name: "Mitchell Starc", overs: 3, runs: 38, wickets: 0 },
      { name: "Harshit Rana", overs: 2, runs: 24, wickets: 0 },
      { name: "Andre Russell", overs: 2, runs: 32, wickets: 0 }
    ],
    bench: ["Rajat Patidar", "Dinesh Karthik", "Mahipal Lomror", "Mohammed Siraj"],
    startWinProb: 55,
    statusText: "Royal Challengers Bengaluru need 89 runs in 54 balls to win."
  },
  "srh-dc": {
    teamA: "Delhi Capitals",
    teamB: "Sunrisers Hyderabad",
    teamAScore: "205/7 (20.0 overs)",
    target: 206,
    startRuns: 85,
    startWickets: 1,
    startBalls: 36, // Over 6.0 (End of Powerplay)
    batters: [
      { name: "Travis Head", runs: 64, ballsFaced: 24, fours: 8, sixes: 4, isStriker: true },
      { name: "Abhishek Sharma", runs: 18, ballsFaced: 11, fours: 2, sixes: 1, isStriker: false }
    ],
    bowlers: [
      { name: "Kuldeep Yadav", overs: 1, runs: 14, wickets: 0 },
      { name: "Axar Patel", overs: 1, runs: 10, wickets: 0 },
      { name: "Khaleel Ahmed", overs: 2, runs: 28, wickets: 1 },
      { name: "Anrich Nortje", overs: 1, runs: 18, wickets: 0 },
      { name: "Mukesh Kumar", overs: 1, runs: 15, wickets: 0 }
    ],
    bench: ["Heinrich Klaasen", "Nitish Reddy", "Abdul Samad", "Pat Cummins"],
    startWinProb: 75,
    statusText: "Sunrisers Hyderabad need 121 runs in 84 balls to win. Powerplay ended."
  },
  "gt-rr": {
    teamA: "Rajasthan Royals",
    teamB: "Gujarat Titans",
    teamAScore: "176/5 (20.0 overs)",
    target: 177,
    startRuns: 0,
    startWickets: 0,
    startBalls: 0, // Over 0.0 (Starting Chase)
    batters: [
      { name: "Shubman Gill", runs: 0, ballsFaced: 0, fours: 0, sixes: 0, isStriker: true },
      { name: "Sai Sudharsan", runs: 0, ballsFaced: 0, fours: 0, sixes: 0, isStriker: false }
    ],
    bowlers: [
      { name: "Trent Boult", overs: 0, runs: 0, wickets: 0 },
      { name: "Sandeep Sharma", overs: 0, runs: 0, wickets: 0 },
      { name: "Yuzvendra Chahal", overs: 0, runs: 0, wickets: 0 },
      { name: "Ravichandran Ashwin", overs: 0, runs: 0, wickets: 0 },
      { name: "Avesh Khan", overs: 0, runs: 0, wickets: 0 }
    ],
    bench: ["David Miller", "Rahul Tewatia", "Rashid Khan", "Mohit Sharma"],
    startWinProb: 45,
    statusText: "Gujarat Titans need 177 runs in 120 balls to win. Trent Boult opens the bowling."
  },
  "pbks-lsg": {
    teamA: "Lucknow Super Giants",
    teamB: "Punjab Kings",
    teamAScore: "196/4 (20.0 overs)",
    target: 197,
    startRuns: 188,
    startWickets: 9,
    startBalls: 120, // Over 20.0 complete (Match ended)
    batters: [
      { name: "Harshal Patel", runs: 2, ballsFaced: 2, fours: 0, sixes: 0, isStriker: false },
      { name: "Arshdeep Singh", runs: 1, ballsFaced: 1, fours: 0, sixes: 0, isStriker: true }
    ],
    bowlers: [
      { name: "Mayank Yadav", overs: 4, runs: 24, wickets: 3 },
      { name: "Ravi Bishnoi", overs: 4, runs: 28, wickets: 2 },
      { name: "Naveen-ul-Haq", overs: 4, runs: 36, wickets: 2 },
      { name: "Krunal Pandya", overs: 4, runs: 32, wickets: 1 },
      { name: "Mohsin Khan", overs: 4, runs: 40, wickets: 1 }
    ],
    bench: ["Kagiso Rabada", "Rahul Chahar", "Shashank Singh"],
    startWinProb: 0,
    statusText: "Match Ended: Lucknow Super Giants won by 8 runs."
  }
};

export function ballsToOvers(balls: number): number {
  const overs = Math.floor(balls / 6);
  const remaining = balls % 6;
  return Number(`${overs}.${remaining}`);
}

export function calculateWinProbability(
  runs: number,
  wickets: number,
  ballsBowled: number,
  target: number
): number {
  const ballsRemaining = 120 - ballsBowled;
  const runsNeeded = target - runs;

  if (runsNeeded <= 0) return 100;
  if (wickets >= 10 || ballsRemaining <= 0) return 0;

  const reqRate = (runsNeeded / ballsRemaining) * 6;
  let prob = 50;

  if (reqRate <= 6) {
    prob += (6 - reqRate) * 7;
  } else {
    prob -= (reqRate - 6) * 8;
  }

  const wicketsLeft = 10 - wickets;
  prob += (wicketsLeft - 4) * 4;

  let finalProb = Math.min(98, Math.max(2, prob));
  return Math.round(finalProb);
}

export function generateCommentary(
  batter: string,
  bowler: string,
  runs: number,
  isWicket: boolean,
  customType?: string
): { description: string; type: BallRecord["type"] } {
  if (isWicket) {
    const wicketTypes = [
      `OUT! Bowled! ${bowler} cleans up ${batter} with a deadly accurate yorker! The stumps are in a mess.`,
      `OUT! In the air... and taken! ${batter} tries to clear long-on, but finds the fielder. ${bowler} strikes!`,
      `OUT! Caught behind! An absolute peach of a delivery from ${bowler}, finding the outside edge of ${batter}'s bat.`,
      `OUT! Lbw! ${bowler} hits the pads, massive appeal, and the umpire raises the finger! ${batter} reviews, but it's three reds!`
    ];
    return { description: wicketTypes[Math.floor(Math.random() * wicketTypes.length)], type: "wicket" };
  }

  if (customType === "six" || runs === 6) {
    const sixTypes = [
      `SIX! ${batter} launches this over long-on! That is out of the stadium. What a monstrous hit!`,
      `SIX! Slog sweep from ${batter}! High, handsome, and into the stands. A spectacular shot.`,
      `SIX! Pulled away effortlessly! ${batter} picks the short ball early and deposits it into the crowd!`
    ];
    return { description: sixTypes[Math.floor(Math.random() * sixTypes.length)], type: "six" };
  }

  if (customType === "boundary" || runs === 4) {
    const fourTypes = [
      `FOUR! Superb timing! ${batter} punches this through the covers, splitting the field perfectly.`,
      `FOUR! Edged... and runs away to the third-man boundary. Lucky, but they'll take it!`,
      `FOUR! Pulled away with disdain! ${batter} takes advantage of a short delivery.`
    ];
    return { description: fourTypes[Math.floor(Math.random() * fourTypes.length)], type: "boundary" };
  }

  if (runs === 0) {
    const dotTypes = [
      `No run. Brilliant dot ball from ${bowler}, beating ${batter} with pure pace.`,
      `No run. ${batter} plays a defensive stroke back to the bowler.`,
      `No run. Swing and a miss! ${batter} is completely beaten by the movement.`
    ];
    return { description: dotTypes[Math.floor(Math.random() * dotTypes.length)], type: "dot" };
  }

  const singlesTypes = [
    `1 run. ${batter} pushes it to deep mid-wicket for a single.`,
    `1 run. Guided down to third-man for a quick run.`,
    `1 run. Played with soft hands towards cover, striker calls for a quick single.`
  ];
  const doublesTypes = [
    `2 runs. Great running! ${batter} clips it through mid-wicket and pushes hard for the second run.`,
    `2 runs. Slapped out to deep cover, excellent sweep in the deep keeps it to two.`
  ];

  if (runs === 2) {
    return { description: doublesTypes[Math.floor(Math.random() * doublesTypes.length)], type: "normal" };
  }

  return { description: singlesTypes[Math.floor(Math.random() * singlesTypes.length)], type: "normal" };
}

export function simulateNextBall(state: MatchState, injectedEvent?: "six" | "wicket" | "four" | "dot"): MatchState {
  if (state.status === "won" || state.status === "lost" || state.status === "completed" || state.status === "upcoming") {
    return state;
  }

  const nextState = { ...state };
  nextState.ballsBowled += 1;

  const currentOverBall = nextState.ballsBowled % 6 === 0 ? 6 : nextState.ballsBowled % 6;
  const currentOverNumber = Math.floor((nextState.ballsBowled - 1) / 6) + 1;

  let strikerIndex = nextState.batters.findIndex(b => b.isStriker);
  let nonStrikerIndex = nextState.batters.findIndex(b => !b.isStriker);

  if (strikerIndex === -1) strikerIndex = 0;
  if (nonStrikerIndex === -1) nonStrikerIndex = 1;

  const activeBatter = nextState.batters[strikerIndex];
  const activeBowler = nextState.bowler;

  let runsScored = 0;
  let isWicket = false;
  let eventType: BallRecord["type"] = "normal";
  let description = "";

  if (injectedEvent) {
    if (injectedEvent === "six") {
      runsScored = 6;
      const comm = generateCommentary(activeBatter.name, activeBowler.name, 6, false, "six");
      description = comm.description;
      eventType = "six";
    } else if (injectedEvent === "four") {
      runsScored = 4;
      const comm = generateCommentary(activeBatter.name, activeBowler.name, 4, false, "boundary");
      description = comm.description;
      eventType = "boundary";
    } else if (injectedEvent === "wicket") {
      isWicket = true;
      runsScored = 0;
      const comm = generateCommentary(activeBatter.name, activeBowler.name, 0, true);
      description = comm.description;
      eventType = "wicket";
    } else {
      runsScored = 0;
      const comm = generateCommentary(activeBatter.name, activeBowler.name, 0, false);
      description = comm.description;
      eventType = "dot";
    }
  } else {
    const rand = Math.random();
    if (rand < 0.07) {
      isWicket = true;
      runsScored = 0;
      const comm = generateCommentary(activeBatter.name, activeBowler.name, 0, true);
      description = comm.description;
      eventType = "wicket";
    } else if (rand < 0.28) {
      runsScored = 0;
      const comm = generateCommentary(activeBatter.name, activeBowler.name, 0, false);
      description = comm.description;
      eventType = "dot";
    } else if (rand < 0.65) {
      runsScored = 1;
      const comm = generateCommentary(activeBatter.name, activeBowler.name, 1, false);
      description = comm.description;
      eventType = "normal";
    } else if (rand < 0.76) {
      runsScored = 2;
      const comm = generateCommentary(activeBatter.name, activeBowler.name, 2, false);
      description = comm.description;
      eventType = "normal";
    } else if (rand < 0.88) {
      runsScored = 4;
      const comm = generateCommentary(activeBatter.name, activeBowler.name, 4, false, "boundary");
      description = comm.description;
      eventType = "boundary";
    } else {
      runsScored = 6;
      const comm = generateCommentary(activeBatter.name, activeBowler.name, 6, false, "six");
      description = comm.description;
      eventType = "six";
    }
  }

  const matchTemplate = MULTI_MATCH_DATA[state.matchId as keyof typeof MULTI_MATCH_DATA] || MULTI_MATCH_DATA["mi-csk"];

  if (isWicket) {
    nextState.wickets += 1;
    activeBatter.ballsFaced += 1;
    
    nextState.highlightSummary.push(`WICKET! ${activeBatter.name} falls for ${activeBatter.runs} off ${activeBatter.ballsFaced} balls in Over ${currentOverNumber}.${currentOverBall}.`);
    
    if (nextState.wickets >= 10) {
      nextState.status = "lost";
      nextState.highlightSummary.push(`MATCH ENDED! ${state.teamA} won by ${nextState.target - nextState.runs - 1} runs.`);
    } else {
      const nextBatterName = matchTemplate.bench[nextState.wickets - (matchTemplate.startWickets + 1)] || "Tail-ender";
      nextState.batters[strikerIndex] = {
        name: nextBatterName,
        runs: 0,
        ballsFaced: 0,
        fours: 0,
        sixes: 0,
        isStriker: true
      };
    }
  } else {
    activeBatter.runs += runsScored;
    activeBatter.ballsFaced += 1;
    if (runsScored === 4) activeBatter.fours += 1;
    if (runsScored === 6) activeBatter.sixes += 1;

    nextState.runs += runsScored;

    if (runsScored === 4 || runsScored === 6) {
      nextState.highlightSummary.push(`BOUNDARY! ${activeBatter.name} hits a ${runsScored === 6 ? 'SIX' : 'FOUR'} off ${activeBowler.name} in Over ${currentOverNumber}.${currentOverBall}.`);
    }

    if (nextState.runs >= nextState.target) {
      nextState.status = "won";
      nextState.highlightSummary.push(`MATCH ENDED! ${state.teamB} successfully chased down the target of ${nextState.target} to win!`);
    }
  }

  activeBowler.runs += runsScored;
  if (isWicket) activeBowler.wickets += 1;

  const overHistorySymbol = isWicket ? "W" : runsScored === 6 ? "6" : runsScored === 4 ? "4" : runsScored.toString();
  nextState.currentOverHistory.push(overHistorySymbol);

  const scoreBefore = `${state.runs}/${state.wickets}`;
  const scoreAfter = `${nextState.runs}/${nextState.wickets}`;
  
  nextState.overs = ballsToOvers(nextState.ballsBowled);

  if (nextState.ballsBowled % 6 === 0 && nextState.status === "live") {
    activeBowler.overs = Math.floor(activeBowler.overs) + 1;
    
    const bowIndex = nextState.recentBowlers.findIndex(b => b.name === activeBowler.name);
    if (bowIndex !== -1) {
      nextState.recentBowlers[bowIndex] = { ...activeBowler };
    } else {
      nextState.recentBowlers.push({ ...activeBowler });
    }

    const availableBowlers = matchTemplate.bowlers.filter(b => b.name !== activeBowler.name);
    const selected = availableBowlers[Math.floor(Math.random() * availableBowlers.length)];
    nextState.bowler = { ...selected };

    nextState.batters[strikerIndex].isStriker = !nextState.batters[strikerIndex].isStriker;
    nextState.batters[nonStrikerIndex].isStriker = !nextState.batters[nonStrikerIndex].isStriker;
    
    nextState.currentOverHistory = [];
  } else if (runsScored % 2 !== 0 && !isWicket) {
    nextState.batters[strikerIndex].isStriker = false;
    nextState.batters[nonStrikerIndex].isStriker = true;
  }

  nextState.runRate = Number(((nextState.runs / nextState.ballsBowled) * 6).toFixed(2));
  
  const ballsRemaining = 120 - nextState.ballsBowled;
  const runsNeeded = nextState.target - nextState.runs;
  nextState.reqRunRate = ballsRemaining > 0 ? Number(((runsNeeded / ballsRemaining) * 6).toFixed(2)) : 0;

  nextState.winProbability = calculateWinProbability(
    nextState.runs,
    nextState.wickets,
    nextState.ballsBowled,
    nextState.target
  );

  const rrrPressure = Math.min(60, Math.max(0, (nextState.reqRunRate - 7) * 8));
  const wicketPressure = nextState.wickets * 10;
  const dotPressure = eventType === "dot" ? 15 : 0;
  nextState.pressure = Math.min(100, Math.max(10, Math.round(rrrPressure + wicketPressure + dotPressure)));

  let boundaryCount = 0;
  let dotCount = 0;
  const lastBalls = nextState.timeline.slice(-5);
  [...lastBalls, { type: eventType }].forEach(b => {
    if (b.type === "six" || b.type === "boundary") boundaryCount++;
    if (b.type === "dot" || b.type === "wicket") dotCount++;
  });
  const recentMomentum = (boundaryCount * 25) - (dotCount * 8) + 50;
  nextState.momentum = Math.min(100, Math.max(10, Math.round(recentMomentum)));

  if (eventType === "six" || eventType === "boundary") {
    nextState.crowdSentiment = "Ecstatic";
  } else if (eventType === "wicket") {
    nextState.crowdSentiment = "Silent";
  } else if (nextState.pressure > 75) {
    nextState.crowdSentiment = "Anxious";
  } else if (nextState.pressure > 50) {
    nextState.crowdSentiment = "Tense";
  } else {
    nextState.crowdSentiment = "Excited";
  }

  const ballRecord: BallRecord = {
    over: currentOverNumber - 1,
    ball: currentOverBall,
    runs: runsScored,
    type: eventType,
    description,
    batterName: activeBatter.name,
    bowlerName: activeBowler.name,
    scoreBefore,
    scoreAfter,
    winProb: nextState.winProbability
  };

  nextState.timeline = [...nextState.timeline, ballRecord];

  if (nextState.ballsBowled >= 120 && nextState.runs < nextState.target && nextState.status === "live") {
    nextState.status = "lost";
    nextState.highlightSummary.push(`MATCH ENDED! ${state.teamA} won by ${nextState.target - nextState.runs - 1} runs.`);
  }

  return nextState;
}

export function getInitialMatchState(matchId: string = "mi-csk"): MatchState {
  const match = MULTI_MATCH_DATA[matchId as keyof typeof MULTI_MATCH_DATA] || MULTI_MATCH_DATA["mi-csk"];
  
  const startRuns = match.startRuns;
  const startWickets = match.startWickets;
  const startBalls = match.startBalls;
  
  const activeBowler = match.bowlers[0];

  return {
    matchId,
    teamA: match.teamA,
    teamB: match.teamB,
    teamAScore: match.teamAScore,
    target: match.target,
    runs: startRuns,
    wickets: startWickets,
    overs: ballsToOvers(startBalls),
    ballsBowled: startBalls,
    batters: match.batters.map(b => ({ ...b })),
    bowler: { ...activeBowler },
    recentBowlers: match.bowlers.map(b => ({ ...b })),
    runRate: startBalls > 0 ? Number(((startRuns / startBalls) * 6).toFixed(2)) : 0,
    reqRunRate: (120 - startBalls) > 0 ? Number((((match.target - startRuns) / (120 - startBalls)) * 6).toFixed(2)) : 0,
    winProbability: match.startWinProb,
    pressure: startBalls > 0 ? 55 : 20,
    momentum: 50,
    timeline: [],
    currentOverHistory: [],
    crowdSentiment: startBalls > 0 ? "Tense" : "Excited",
    status: matchId === "pbks-lsg" ? "completed" : matchId === "gt-rr" ? "live" : "live", // let them be playable!
    highlightSummary: [match.statusText]
  };
}
