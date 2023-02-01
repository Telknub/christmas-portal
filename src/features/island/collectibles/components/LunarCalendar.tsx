import React from "react";

import lunarCalendar from "src/assets/sfts/lunar_calendar.webp";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const LunarCalendar: React.FC = () => {
  return (
    <>
      <img
        src={lunarCalendar}
        style={{
          width: `${PIXEL_SCALE * 13}px`,
          bottom: `${PIXEL_SCALE * 1}px`,
          left: `${PIXEL_SCALE * 1}px`,
        }}
        className="absolute"
        alt="Lunar Calendar"
      />
    </>
  );
};
