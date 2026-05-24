import { NextRequest, NextResponse } from "next/server";
import { AGENT_PROFILES } from "@/utils/agentPrompts";

export async function POST(req: NextRequest) {
  try {
    const { agentId, matchState, query } = await req.json();
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { text: null, warning: "GEMINI_API_KEY is not defined in the environment. Using high-fidelity local engine." },
        { status: 200 }
      );
    }

    const profile = AGENT_PROFILES[agentId as keyof typeof AGENT_PROFILES];
    if (!profile) {
      return NextResponse.json({ error: "Invalid agent type" }, { status: 400 });
    }

    // Build the cricket system context prompt
    const matchStateString = `
Current IPL Match: ${matchState.teamB} chasing a target of ${matchState.target} against ${matchState.teamA}.
- CSK Score: ${matchState.teamAScore || "188/6 (20 overs)"}
- MI Score: ${matchState.runs}/${matchState.wickets}
- Overs Bowled: ${matchState.overs} / 20.0
- Required Runs: ${matchState.target - matchState.runs} runs needed in ${120 - matchState.ballsBowled} balls.
- Required Run Rate: ${matchState.reqRunRate} runs/over.
- Active Batter on Strike: ${matchState.striker}
- Active Bowler: ${matchState.bowler}
- Match Win Probability for Chasing Team: ${matchState.winProbability}%
- Match Pressure Index: ${matchState.pressure}/100
- Match Momentum Index: ${matchState.momentum}/100
- Crowd Sentiment: ${matchState.crowdSentiment}
`;

    let systemInstruction = profile.prompt;
    let userPrompt = `Match State context:\n${matchStateString}\n\n`;

    if (agentId === "qa") {
      userPrompt += `User Question: "${query}"\n\nGenerate an interactive, expert, and engaging response based on this question and the live cricket state. Reference the score, active players, and match indicators. Max 3 sentences. Keep it conversational!`;
    } else {
      userPrompt += `Analyze this new ball event or current state and generate your signature agent commentary. Keep it under 2 sentences. Make it sound live and reactive!`;
    }

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemInstruction}\n\n${userPrompt}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 150
      }
    };

    // Use Gemini 2.5 Flash / Gemini 1.5 Flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API direct call failed:", errText);
      return NextResponse.json({ text: null, error: "API call failed" });
    }

    const result = await response.json();
    const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return NextResponse.json({ text: generatedText || null });
  } catch (error) {
    console.error("Error in API agent route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
