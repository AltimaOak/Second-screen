import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Fetch live current matches from Cricinfo's public consumer API
    const response = await fetch(
      "https://hs-consumer-api.espncricinfo.com/v1/pages/matches/current?lang=en",
      {
        next: { revalidate: 30 } // Cache for 30s
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Cricinfo matches");
    }

    const data = await response.json();
    const rawMatches = data.matches || [];

    // Map ESPN Cricinfo matches to our standard MatchScheduleItem format
    const realMatches = rawMatches.map((match: any) => {
      const teamA = match.teams?.[0]?.team?.name || "Team A";
      const teamB = match.teams?.[1]?.team?.name || "Team B";
      const teamAScore = match.teams?.[0]?.score || "";
      const teamBScore = match.teams?.[1]?.score || "";
      
      const isLive = match.status === "Live" || match.stage === "Live";
      const isEnded = match.status === "Result" || match.stage === "Finished";
      
      let status: "live" | "upcoming" | "ended" = "upcoming";
      if (isLive) status = "live";
      else if (isEnded) status = "ended";

      let scoreText = "Pre-match drills";
      if (teamAScore || teamBScore) {
        scoreText = `${teamA} ${teamAScore} | ${teamB} ${teamBScore}`;
      }

      return {
        id: `real-${match.id}`,
        teamA,
        teamB,
        venue: match.venue?.name || "Stadium",
        time: match.statusText || match.description || "Live Match",
        status,
        scoreText,
        category: status === "live" ? "today" : status === "upcoming" ? "tomorrow" : "all"
      };
    });

    return NextResponse.json({ matches: realMatches });
  } catch (error) {
    console.warn("Error fetching live matches, returning simulated schedules:", error);
    return NextResponse.json({ matches: [], error: "Could not fetch live matches" });
  }
}
