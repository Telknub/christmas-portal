import React from "react";
import suspiciousGoblin from "assets/npcs/suspicious_goblin.gif";
import { Button } from "components/ui/Button";
const SyncClockGuide =
  "https://sunflowerland.freshdesk.com/en/support/solutions/articles/101000397200-how-to-sync-my-windows-clock-";

export const ClockIssue = () => {
  return (
    <div className="flex flex-col items-center text-center p-2">
      <span>Clock not in sync</span>
      <img src={suspiciousGoblin} alt="Warning" className="w-16 m-2" />
      <span className="text-sm mt-2 mb-2">
        Uh oh, it looks like your clock is not in sync with the game. Set date
        and time to automatic to avoid disruptions
      </span>
      <span className="text-sm mt-2 mb-2">
        Need help to sync your clock? Have a look at our guide!
      </span>

      <div className="flex w-full">
        <Button
          onClick={() => {
            window.location.href = SyncClockGuide as string;
          }}
        >
          Open guide
        </Button>
      </div>
    </div>
  );
};
