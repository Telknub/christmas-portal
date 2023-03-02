type SeasonName = "Solar Flare" | "Dawn Breaker";

type SeasonDates = { startDate: Date; endDate: Date };

export const SEASONS: Record<SeasonName, SeasonDates> = {
  "Solar Flare": {
    startDate: new Date("2023-01-01T00:00:00.000Z"),
    endDate: new Date("2023-03-31T00:00:00.000Z"),
  },
  "Dawn Breaker": {
    startDate: new Date("2023-04-01T00:00:00.000Z"),
    endDate: new Date("2023-06-30T00:00:00.000Z"),
  },
};

type SeasonalTicket = "Solar Flare Ticket" | "Dawn Breaker Ticket";

export function getCurrentSeason(): SeasonName {
  const now = new Date();

  const seasons = Object.keys(SEASONS) as SeasonName[];

  const currentSeason = seasons.find((season) => {
    const { startDate, endDate } = SEASONS[season];

    return now >= startDate && now <= endDate;
  });

  if (!currentSeason) {
    throw new Error("No Season found");
  }

  return currentSeason;
}

export function getSeasonalTicket(): SeasonalTicket {
  const currentSeason = getCurrentSeason();

  return `${currentSeason} Ticket`;
}
